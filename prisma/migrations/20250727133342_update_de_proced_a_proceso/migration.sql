/*
  Warnings:

  - You are about to drop the column `alcance` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `objetivo` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `objetivoEstratégico` on the `Ficha` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ficha" DROP COLUMN "alcance",
DROP COLUMN "objetivo",
DROP COLUMN "objetivoEstratégico";

-- AlterTable
ALTER TABLE "Proceso" ADD COLUMN     "alcance" TEXT,
ADD COLUMN     "objetivo" TEXT,
ADD COLUMN     "objetivoEstratégico" TEXT;
