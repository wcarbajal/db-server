/*
  Warnings:

  - You are about to drop the column `fichaId` on the `Ficha` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[procesoId]` on the table `Ficha` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `procesoId` to the `Ficha` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Ficha" DROP CONSTRAINT "Ficha_fichaId_fkey";

-- DropIndex
DROP INDEX "public"."Ficha_fichaId_key";

-- AlterTable
ALTER TABLE "public"."Ficha" DROP COLUMN "fichaId",
ADD COLUMN     "procesoId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ficha_procesoId_key" ON "public"."Ficha"("procesoId");

-- AddForeignKey
ALTER TABLE "public"."Ficha" ADD CONSTRAINT "Ficha_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "public"."Proceso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
