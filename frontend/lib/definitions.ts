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
