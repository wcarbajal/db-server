/*
  Warnings:

  - Added the required column `mapaId` to the `UnidadOperativa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."UnidadOperativa" ADD COLUMN     "mapaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."UnidadOperativa" ADD CONSTRAINT "UnidadOperativa_mapaId_fkey" FOREIGN KEY ("mapaId") REFERENCES "public"."Mapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
