export interface Internship {
  id: number;
  title: string;
  companyId: number;
  location: string;
  duration: number;
  stipend: number;
  scrapedAt: string;
  company: {
    name: string;
    logoUrl: string;
  };
}

export interface InternshipDetail {
  id: number;
  title: string;
  description: string;
  companyId: number;
  location: string;
  duration: number;
  stipend: number;
  scrapedAt: string;
  skills: {
    id: number;
    name: string;
  }[];
  company: {
    id: number;
    name: string;
    hiringSince: number;
    candidatesHired: number;
    logoUrl: string;
  };
}
