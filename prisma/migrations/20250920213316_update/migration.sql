/*
  Warnings:

  - You are about to drop the column `tipoNivel` on the `Indicador` table. All the data in the column will be lost.
  - The `sentidoEsperado` column on the `Indicador` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `nivelIndicador` to the `Indicador` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."SentidoEsperado" AS ENUM ('ascendente', 'descendente');

-- CreateEnum
CREATE TYPE "public"."NivelIndicador" AS ENUM ('OEI', 'AEI', 'PE', 'AO', 'IG');

-- CreateEnum
CREATE TYPE "public"."TipoIndicador" AS ENUM ('IR', 'IP', 'IA');

-- AlterTable
ALTER TABLE "public"."Indicador" DROP COLUMN "tipoNivel",
ADD COLUMN     "nivelIndicador" "public"."NivelIndicador" NOT NULL,
ADD COLUMN     "tipoIndicador" "public"."TipoIndicador",
DROP COLUMN "sentidoEsperado",
ADD COLUMN     "sentidoEsperado" "public"."SentidoEsperado" NOT NULL DEFAULT 'ascendente';

-- DropEnum
DROP TYPE "public"."TipoIndicadorNivel";

-- CreateTable
CREATE TABLE "public"."UnidadMedida" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "siglas" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UnidadMedida_pkey" PRIMARY KEY ("id")
);
