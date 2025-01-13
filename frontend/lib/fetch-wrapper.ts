const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchWrapper = (endpoint: string, cookie: string, revalidate?: number | false) => {
  return fetch(`${baseURL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    next: { revalidate },
  });
};
