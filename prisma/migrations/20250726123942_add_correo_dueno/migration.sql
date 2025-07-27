/*
  Warnings:

  - Added the required column `correo` to the `Dueño` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dueño" ADD COLUMN     "correo" TEXT NOT NULL;
