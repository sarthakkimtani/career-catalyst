from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, BigInteger, Index, Text, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Internship(Base):
    __tablename__ = 'Internship'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    companyId = Column(Integer, ForeignKey('Company.id', ondelete='RESTRICT', onupdate='CASCADE'), nullable=False)
    location = Column(Text, nullable=False)
    duration = Column(Integer, nullable=False)
    stipend = Column(BigInteger, nullable=False)
    scrapedAt = Column(DateTime, default=datetime.utcnow, nullable=False)

    company = relationship('Company', back_populates='internships')
    skills = relationship('InternshipSkill', back_populates='internship')

    __table_args__ = (
        Index('Internship_companyId_idx', 'companyId'),
    )


class Company(Base):
    __tablename__ = 'Company'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Text, unique=True, nullable=False)
    hiringSince = Column(Integer, nullable=False)
    candidatesHired = Column(Integer, nullable=False)
    logoUrl = Column(String(255), nullable=False)

    internships = relationship('Internship', back_populates='company')

    __table_args__ = (
        Index('Company_name_key', 'name', unique=True),
    )


class Skill(Base):
    __tablename__ = 'Skill'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Text, unique=True, nullable=False)

    internships = relationship('InternshipSkill', back_populates='skill')

    __table_args__ = (
        Index('Skill_name_key', 'name', unique=True),
        Index('Skill_name_idx', 'name'),
    )


class InternshipSkill(Base):
    __tablename__ = '_InternshipToSkill'

    A = Column(Integer, ForeignKey('Internship.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True)
    B = Column(Integer, ForeignKey('Skill.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True)

    internship = relationship('Internship', back_populates='skills')
    skill = relationship('Skill', back_populates='internships')

    __table_args__ = (
        Index('_InternshipToSkill_AB_unique', 'A', 'B', unique=True),
        Index('_InternshipToSkill_B_index', 'B'),
    )
