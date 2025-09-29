/*
  Warnings:

  - You are about to drop the column `estrategico` on the `Proceso` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[estrategicoId]` on the table `Proceso` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Proceso" DROP COLUMN "estrategico",
ADD COLUMN     "estrategicoId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Proceso_estrategicoId_key" ON "public"."Proceso"("estrategicoId");

-- AddForeignKey
ALTER TABLE "public"."Proceso" ADD CONSTRAINT "Proceso_estrategicoId_fkey" FOREIGN KEY ("estrategicoId") REFERENCES "public"."Indicador"("id") ON DELETE SET NULL ON UPDATE CASCADE;
