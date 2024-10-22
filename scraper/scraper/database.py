from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from typing import List, Dict

from .models import Company, Internship, Skill, InternshipSkill

class Database:
    def __init__(self, logger, db_url):
        self.engine = create_engine(db_url)
        self.Session = sessionmaker(bind=self.engine)
        self.logger = logger

    def disconnect(self):
        self.engine.dispose()

    def upsert_companies(self, companies: List[Company]):
        session = self.Session()
        try:
            for company in companies:
                existing_company = session.query(Company).filter_by(name=company.name).first()
                if existing_company:
                    existing_company.hiringSince = company.hiringSince
                    existing_company.candidatesHired = company.candidatesHired
                    existing_company.logoUrl = company.logoUrl
                else:
                    session.add(company)
            session.commit()
            self.logger.info(f"Upserted {len(companies)} companies")
        except IntegrityError as e:
            session.rollback()
            self.logger.error(f"Error upserting companies: {e}")
            raise
        finally:
            session.close()

    def upsert_internships(self, internship_skill_map: Dict[Internship, List[str]]):
        session = self.Session()
        try:
            all_skills = {skill for skills in internship_skill_map.values() for skill in skills}
            skills = self.upsert_skills(list(all_skills), session)

            for internship, skill_names in internship_skill_map.items():
                merged_internship = session.merge(internship)
                session.refresh(merged_internship)

                matched_skills = [skill for skill in skills if skill.name in skill_names]
                self.associate_skills_with_internship(session, merged_internship, matched_skills)

                company_name = merged_internship.company.name if merged_internship.company else "Unknown"
                self.logger.info(f"Upserted internship: {merged_internship.title} at {company_name}")

            session.commit()

        except Exception as e:
            session.rollback()
            self.logger.error(f"Error committing internships to database: {str(e)}")
        finally:
            session.close()    

    def internship_exists(self, internship_id: int) -> bool:
        session = self.Session()
        try:
            exists = session.query(Internship.id).filter_by(id=internship_id).scalar() is not None
            return exists
        finally:
            session.close()

    def upsert_skills(self, skills: List[str], session) -> List[Skill]:
        skill_list = []
        try:
            for skill_name in skills:
                skill = session.query(Skill).filter_by(name=skill_name).first()
                if not skill:
                    skill = Skill(name=skill_name)
                    session.add(skill)
                skill_list.append(skill)

            session.commit()
            self.logger.info(f"Upserted {len(skills)} skills")
            return skill_list
        except Exception as e:
            session.rollback()
            self.logger.error(f"Error upserting skills: {str(e)}")
            return []

    def associate_skills_with_internship(self, session, internship: Internship, skills: List[Skill]):
        try:
            existing_skills = session.query(InternshipSkill).filter_by(A=internship.id).all()
            existing_skill_ids = {skill.B for skill in existing_skills}

            for skill in skills:
                if skill.id not in existing_skill_ids:
                    internship_skill = InternshipSkill(A=internship.id, B=skill.id)
                    session.add(internship_skill)
                    self.logger.info(f"Added InternshipSkill for internship_id: {internship.id}, skill_id: {skill.id}")
                else:
                    self.logger.info(f"Skill '{skill.name}' is already associated with internship_id: {internship.id}")

            session.commit()

        except IntegrityError as e:
            session.rollback()
            self.logger.error(f"Integrity error while associating skills: {str(e)}")
        except Exception as e:
            session.rollback()
            self.logger.error(f"Error associating skills with internship: {str(e)}")