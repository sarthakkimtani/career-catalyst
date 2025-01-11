import { Internship } from "@/lib/definitions";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchInternships = async (cookie: string) => {
  try {
    const response = await fetch(`${baseURL}/internships`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      next: {
        revalidate: 7200,
      },
    });

    if (!response.ok) {
      return { data: null, error: "An Error Occurred" };
    }

    const data: Internship[] = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};
