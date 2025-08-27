/*
  Warnings:

  - A unique constraint covering the columns `[codigo,version]` on the table `Proceso` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `version` to the `Proceso` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Proceso_codigo_key";

-- AlterTable
ALTER TABLE "public"."Proceso" ADD COLUMN     "version" INTEGER NOT NULL,
ADD COLUMN     "vigente" BOOLEAN DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Proceso_codigo_version_key" ON "public"."Proceso"("codigo", "version");
