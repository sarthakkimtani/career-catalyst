from dataclasses import dataclass


@dataclass
class ScraperConfig:
    base_url: str
    max_pages: int = 2
    user_agent: str = (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/91.0.4472.124 Safari/537.36"
    )


def create_scraper_config(base_url: str, max_pages: int = 2, user_agent: str = None) -> ScraperConfig:
    """Function to dynamically create a ScraperConfig for a website."""
    return ScraperConfig(
        base_url=base_url,
        max_pages=max_pages,
        user_agent=user_agent or ScraperConfig.user_agent,
    )
