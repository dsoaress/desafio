/*
  Warnings:

  - You are about to drop the column `authorization` on the `registers` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `registers` table. All the data in the column will be lost.
  - You are about to drop the column `rg` on the `registers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "registers" DROP COLUMN "authorization",
DROP COLUMN "cpf",
DROP COLUMN "rg";
