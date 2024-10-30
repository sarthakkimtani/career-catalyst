import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient({
  log: ["error", "info"],
});

export default prisma;
