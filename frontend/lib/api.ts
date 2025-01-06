import axios from "axios";

import { Internship } from "@/lib/definitions";

export const createApiClient = (cookie: string | null) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
  });
};

export const fetchInternships = async (cookie: string | null) => {
  const client = createApiClient(cookie);
  const response = await client.get<Internship[]>("/internships");
  return response.data;
};
