/*
  Warnings:

  - Made the column `vigente` on table `Proceso` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Proceso" ALTER COLUMN "vigente" SET NOT NULL;
