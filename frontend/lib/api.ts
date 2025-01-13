import { fetchWrapper } from "@/lib/fetch-wrapper";
import { Internship, InternshipDetail } from "@/lib/definitions";

export const fetchInternships = async (cookie: string) => {
  try {
    const response = await fetchWrapper("/internships", cookie, 7200);
    if (!response.ok) {
      return { data: null, error: "An Error Occurred" };
    }

    const data: Internship[] = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const fetchInternshipById = async (cookie: string, id: string) => {
  try {
    const response = await fetchWrapper(`/internships/${id}`, cookie);
    if (!response.ok) {
      return { data: null, error: "An Error Occurred" };
    }

    const data: InternshipDetail = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};
