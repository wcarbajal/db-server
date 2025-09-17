/*
  Warnings:

  - Added the required column `mapaId` to the `Indicador` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Indicador" DROP CONSTRAINT "Indicador_procesoId_fkey";

-- AlterTable
ALTER TABLE "public"."Indicador" ADD COLUMN     "mapaId" INTEGER NOT NULL,
ALTER COLUMN "procesoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Indicador" ADD CONSTRAINT "Indicador_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "public"."Proceso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Indicador" ADD CONSTRAINT "Indicador_mapaId_fkey" FOREIGN KEY ("mapaId") REFERENCES "public"."Mapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
