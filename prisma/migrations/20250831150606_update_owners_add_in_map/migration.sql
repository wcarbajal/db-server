/*
  Warnings:

  - Added the required column `mapaId` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Made the column `mapaId` on table `Proceso` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Proceso" DROP CONSTRAINT "Proceso_mapaId_fkey";

-- AlterTable
ALTER TABLE "public"."Owner" ADD COLUMN     "mapaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Proceso" ALTER COLUMN "mapaId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Owner" ADD CONSTRAINT "Owner_mapaId_fkey" FOREIGN KEY ("mapaId") REFERENCES "public"."Mapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proceso" ADD CONSTRAINT "Proceso_mapaId_fkey" FOREIGN KEY ("mapaId") REFERENCES "public"."Mapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
