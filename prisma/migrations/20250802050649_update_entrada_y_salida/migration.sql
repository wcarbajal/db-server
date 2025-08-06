/*
  Warnings:

  - You are about to drop the column `entradas` on the `Mapa` table. All the data in the column will be lost.
  - You are about to drop the column `salidas` on the `Mapa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Mapa" DROP COLUMN "entradas",
DROP COLUMN "salidas",
ADD COLUMN     "entrada" TEXT,
ADD COLUMN     "salida" TEXT;
