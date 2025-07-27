/*
  Warnings:

  - Added the required column `siglas` to the `Dueño` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dueño" ADD COLUMN     "siglas" TEXT NOT NULL;
