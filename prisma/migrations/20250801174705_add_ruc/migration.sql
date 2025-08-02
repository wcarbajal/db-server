/*
  Warnings:

  - A unique constraint covering the columns `[ruc]` on the table `Mapa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ruc` to the `Mapa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Mapa" ADD COLUMN     "ruc" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Mapa_ruc_key" ON "public"."Mapa"("ruc");
