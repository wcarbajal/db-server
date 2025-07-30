/*
  Warnings:

  - You are about to drop the column `objetivoEstratégico` on the `Proceso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Proceso" DROP COLUMN "objetivoEstratégico",
ADD COLUMN     "estrategico" TEXT;
