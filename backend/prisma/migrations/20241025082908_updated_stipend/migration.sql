/*
  Warnings:

  - You are about to alter the column `stipend` on the `Internship` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Internship" ALTER COLUMN "stipend" SET DATA TYPE INTEGER;
