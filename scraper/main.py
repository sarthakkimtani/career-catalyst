#!/usr/bin/env python3
import os
import asyncio
from dataclasses import dataclass
from dotenv import load_dotenv

from scraper.database import Database
from scraper.logger import setup_logger
from scraper.providers.internshala import InternshalaScraper
from scraper.scraper_config import create_scraper_config


@dataclass
class AppConfig:
    scraper_url: str
    max_retries: int
    retry_delay: int
    database_url: str

    @classmethod
    def from_env(cls) -> "AppConfig":
        load_dotenv()

        scraper_url = os.getenv("SCRAPER_URL")
        database_url = os.getenv("DATABASE_URL")

        if not scraper_url or not database_url:
            raise ValueError("Required environment variables SCRAPER_URL and DATABASE_URL must be set")

        return cls(
            scraper_url=scraper_url,
            max_retries=int(os.getenv("MAX_RETRIES", "3")),
            retry_delay=int(os.getenv("RETRY_DELAY", "5")),
            database_url=database_url,
        )


class ScraperApp:
    def __init__(self, config: AppConfig):
        self.config = config
        self.logger = setup_logger()

        internshala_config = create_scraper_config(base_url=config.scraper_url, max_pages=2)
        self.db = Database(self.logger, config.database_url)
        self.scraper = InternshalaScraper(
            url=config.scraper_url,
            logger=self.logger,
            db=self.db,
            config=internshala_config,
        )

    async def run(self) -> None:
        try:
            self.logger.info("Starting Internship scraping process")

            internship_skill_dict, companies = self.scraper.scrape()
            self.db.upsert_companies(companies)
            self.db.upsert_internships(internship_skill_dict)

            self.logger.info(
                f"Scraping completed successfully. "
                f"Found {len(internship_skill_dict.keys())} internships from {len(companies)} companies "
            )

        except Exception as e:
            self.logger.error(f"An error occurred during execution: {e}")
            raise
        finally:
            self.db.disconnect()


async def main() -> None:
    try:
        config = AppConfig.from_env()
        app = ScraperApp(config)
        await app.run()

    except Exception as e:
        logger = setup_logger()
        logger.error(f"Application failed to start: {e}")
        raise


if __name__ == "__main__":
    asyncio.run(main())
