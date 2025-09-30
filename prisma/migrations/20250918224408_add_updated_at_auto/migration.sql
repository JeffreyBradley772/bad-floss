/*
  Warnings:

  - You are about to drop the column `cons` on the `FlossReview` table. All the data in the column will be lost.
  - You are about to drop the column `pros` on the `FlossReview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FlossReview" DROP COLUMN "cons",
DROP COLUMN "pros";
