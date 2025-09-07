/*
  Warnings:

  - You are about to drop the column `oficina` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `siglas` on the `Owner` table. All the data in the column will be lost.
  - Added the required column `unidadOperativaId` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Owner" DROP COLUMN "oficina",
DROP COLUMN "siglas",
ADD COLUMN     "unidadOperativaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."UnidadOperativa" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "siglas" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UnidadOperativa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Owner" ADD CONSTRAINT "Owner_unidadOperativaId_fkey" FOREIGN KEY ("unidadOperativaId") REFERENCES "public"."UnidadOperativa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
