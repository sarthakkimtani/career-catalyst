import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "./prisma.js";

const origins = ["https://accounts.google.com", process.env.ORIGIN_URL as string];

export const auth = betterAuth({
  appName: "CareerCatalyst",
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: "/auth",
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: origins,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
