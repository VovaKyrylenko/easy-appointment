/*
  Warnings:

  - You are about to drop the column `description` on the `Apartment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "description",
ADD COLUMN     "image" TEXT;
