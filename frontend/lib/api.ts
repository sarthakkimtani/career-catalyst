import { Internship } from "@/lib/definitions";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchInternships = async (cookie: string): Promise<Internship[]> => {
  const response = await fetch(`${baseURL}/internships`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    next: {
      revalidate: 10800,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: Internship[] = await response.json();
  return data;
};
