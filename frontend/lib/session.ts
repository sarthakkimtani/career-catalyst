import { authClient } from "@/lib/auth-client";

export const getSession = async (headers: Headers) => {
  return await authClient.getSession({
    fetchOptions: {
      headers,
    },
  });
};
