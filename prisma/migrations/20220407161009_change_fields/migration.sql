/*
  Warnings:

  - You are about to drop the column `address` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `birthdate` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `birthdate` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `rg` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `schoolGrade` on the `teachers` table. All the data in the column will be lost.
  - Added the required column `authorization` to the `registers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `registers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rg` to the `registers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registers" ADD COLUMN     "authorization" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "rg" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "address",
DROP COLUMN "birthdate",
DROP COLUMN "city",
DROP COLUMN "neighborhood",
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "schoolGrade" DROP NOT NULL,
ALTER COLUMN "schoolName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "address",
DROP COLUMN "birthdate",
DROP COLUMN "city",
DROP COLUMN "cpf",
DROP COLUMN "neighborhood",
DROP COLUMN "rg",
DROP COLUMN "schoolGrade",
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "course" DROP NOT NULL,
ALTER COLUMN "schoolName" DROP NOT NULL;
