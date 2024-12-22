import re
from typing import Tuple, List, Optional, Dict
from dataclasses import dataclass
import logging

import requests
from bs4 import BeautifulSoup
from tenacity import retry, stop_after_attempt, wait_fixed

from .models import Internship, Company
from .database import Database


@dataclass
class ScraperConfig:
    base_url: str = "https://internshala.com"
    max_retries: int = 3
    retry_delay: int = 5
    max_pages: int = 2
    user_agent: str = (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/91.0.4472.124 Safari/537.36"
    )


class InternshipParser:
    @staticmethod
    def parse_duration(duration_text: Optional[str]) -> int:
        if not duration_text or duration_text == "Not specified":
            return 0
        match = re.search(r"(\d+)\s*Month", duration_text)
        return int(match.group(1)) if match else 0

    @staticmethod
    def parse_stipend(stipend_text: Optional[str]) -> int:
        if not stipend_text or stipend_text == "Not specified":
            return 0

        stipend_text = stipend_text.replace(",", "").lower()

        match = re.search(r"₹\s*(\d+)", stipend_text)
        if match:
            return int(match.group(1))

        return 0


class InternshalaScraper:
    def __init__(self, url: str, logger: logging.Logger, db: Database, config: ScraperConfig = ScraperConfig()):
        self.url = url
        self.logger = logger
        self.db = db
        self.config = config
        self.session = self._init_session()
        self.parser = InternshipParser()

    def _init_session(self) -> requests.Session:
        session = requests.Session()
        session.headers.update(
            {
                "User-Agent": self.config.user_agent,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
            }
        )
        return session

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(5))
    def _fetch_page(self, url: str) -> str:
        response = self.session.get(url)
        response.raise_for_status()
        return response.text

    def _fetch_internship_details(self, detail_url: str) -> Tuple[Optional[str], Optional[str], List[str]]:
        try:
            html_content = self._fetch_page(self.config.base_url + detail_url)
            soup = BeautifulSoup(html_content, "html.parser")

            description_meta = soup.find(
                "meta", attrs={"name": "twitter:description", "property": "og:description", "itemprop": "description"}
            )
            description = description_meta["content"] if description_meta else "No description available"

            company_link = soup.find("a", class_="link_display_like_text")
            company_profile_url = company_link["href"] if company_link else None

            skills = []
            skills_container = soup.find("div", class_="round_tabs_container")
            if skills_container:
                skill_spans = skills_container.find_all("span", class_="round_tabs")
                skills = [span.text.strip() for span in skill_spans]

            return description, company_profile_url, skills
        except Exception as e:
            self.logger.error(f"Error fetching internship details from {detail_url}: {e}")
            return None, None, []

    def _extract_company_info(self, company_profile_url: str) -> Optional[Company]:
        try:
            profile_html = self._fetch_page(self.config.base_url + company_profile_url)
            profile_soup = BeautifulSoup(profile_html, "html.parser")

            company_info_container = profile_soup.find("div", class_="company-info-container")
            company_name_elem = (
                company_info_container.find("div", class_="heading-text") if company_info_container else None
            )
            company_name = company_name_elem.text.strip() if company_name_elem else None

            if not company_name:
                self.logger.error("Company name not found")
                return None

            hiring_since = None
            candidates_hired = None

            highlight_divs = profile_soup.find_all("div", class_="highlight")
            for div in highlight_divs:
                name_elem = div.find("div", class_="name")
                value_elem = div.find("div", class_="value")
                if name_elem and value_elem:
                    name = name_elem.text.strip().lower()
                    value = value_elem.text.strip()

                    if "hiring since" in name:
                        hiring_since = int(value) if value.isdigit() else None
                    elif "candidates hired" in name:
                        candidates_hired = int(value) if value.isdigit() else None

            company_logo = None
            logo_div = company_info_container.find("div", class_="logo")
            if logo_div and "style" in logo_div.attrs:
                style = logo_div["style"]
                logo_match = re.search(r"url\('([^']+)'\)", style)
                if logo_match and logo_match.group(1).startswith("http"):
                    company_logo = logo_match.group(1)

            return Company(
                name=company_name,
                logoUrl=company_logo or "",
                hiringSince=hiring_since,
                candidatesHired=candidates_hired,
            )

        except Exception as e:
            self.logger.error(f"Error extracting company info: {str(e)}")
            return None, []

    def _internship_exists(self, internship_id: int) -> bool:
        return self.db.internship_exists(internship_id)

    def _process_listing(
        self, listing: BeautifulSoup, companies: Dict[str, Company]
    ) -> Tuple[Optional[Internship], List[str]]:
        try:
            internship_id = listing.get("internshipid")
            if not internship_id:
                self.logger.warning("Internship ID not found, skipping")
                return None, []

            internship_id = int(internship_id)

            if self._internship_exists(internship_id):
                self.logger.info(f"Internship with ID {internship_id} already exists, skipping")
                return None, []

            title_elem = listing.find("h3", class_="job-internship-name")
            if not title_elem or not title_elem.find("a"):
                return None, []

            title = title_elem.text.strip()
            detail_url = title_elem.find("a")["href"]

            description, company_profile_url, skills = self._fetch_internship_details(detail_url)
            if not description or not company_profile_url:
                return None, []

            if company_profile_url not in companies:
                company = self._extract_company_info(company_profile_url)
                if not company:
                    return None, []
                companies[company_profile_url] = company
            else:
                company = companies[company_profile_url]

            location_elem = listing.find("div", class_="row-1-item locations")
            location = "Not specified"
            if location_elem:
                location_anchor = location_elem.find("a")
                location = location_anchor.text.strip() if location_anchor else location_elem.text.strip()

            detail_elem = listing.find("div", class_="detail-row-1")
            duration_elem = (
                detail_elem.find_all("div", class_="row-1-item")[1]
                if detail_elem and len(detail_elem.find_all("div", class_="row-1-item")) > 1
                else None
            )
            duration_text = duration_elem.find("span").text.strip() if duration_elem else "Not specified"
            duration = self.parser.parse_duration(duration_text)

            stipend_elem = listing.find("span", class_="stipend")
            stipend_text = stipend_elem.text.strip() if stipend_elem else "Not specified"
            stipend = self.parser.parse_stipend(stipend_text)

            internship = Internship(
                id=internship_id,
                title=title,
                description=description,
                company=company,
                location=location,
                duration=duration,
                stipend=stipend,
            )

            return internship, skills

        except Exception as e:
            self.logger.error(f"Error processing listing: {str(e)}")
            return None, []

    def _process_page(self, html_content: str, companies: Dict[str, Company]) -> Dict[Internship, List[str]]:
        soup = BeautifulSoup(html_content, "html.parser")
        internship_skill_map = {}

        listings = soup.find_all("div", class_="individual_internship")
        self.logger.info(f"Found {len(listings)} listings on current page")

        for listing in listings:
            internship, skills = self._process_listing(listing, companies)
            if internship is not None:
                internship_skill_map[internship] = skills
                self.logger.info(f"Processed internship: {internship.title} at {internship.company.name}")
            else:
                self.logger.warning("Skipped processing a listing due to an error or missing data")

        return internship_skill_map

    def scrape(self) -> Tuple[Dict[Internship, List[str]], List[Company]]:
        internship_skill_map = {}
        companies = {}

        try:
            self.logger.info(f"Scraping page 1: {self.url}")
            html_content = self._fetch_page(self.url)
            internship_skill_map.update(self._process_page(html_content, companies))

            for page_num in range(2, self.config.max_pages + 1):
                page_url = f"{self.url}/page-{page_num}"
                self.logger.info(f"Scraping page {page_num}: {page_url}")

                try:
                    html_content = self._fetch_page(page_url)
                    internship_skill_map.update(self._process_page(html_content, companies))
                except Exception as e:
                    self.logger.error(f"Error scraping page {page_num}: {e}")
                    continue

            self.logger.info(f"Successfully scraped {len(internship_skill_map)} internships from multiple pages")

            # all_internships = list(internship_skill_map.keys())
            # all_skills = set(skill for skills in internship_skill_map.values() for skill in skills)

            return (internship_skill_map, list(companies.values()))

        except Exception as e:
            self.logger.error(f"Error in scraping process: {e}")
            raise
