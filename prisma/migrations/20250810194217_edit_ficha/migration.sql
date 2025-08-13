/*
  Warnings:

  - You are about to drop the column `clientes` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `entradas` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `proveedores` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `registros` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `riesgos` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `salidas` on the `Ficha` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."TipoRegistro" AS ENUM ('físico', 'digital');

-- AlterTable
ALTER TABLE "public"."Ficha" DROP COLUMN "clientes",
DROP COLUMN "entradas",
DROP COLUMN "proveedores",
DROP COLUMN "registros",
DROP COLUMN "riesgos",
DROP COLUMN "salidas";

-- CreateTable
CREATE TABLE "public"."InputOutput" (
    "id" SERIAL NOT NULL,
    "entradas" TEXT NOT NULL,
    "salidas" TEXT NOT NULL,
    "proveedores" TEXT NOT NULL,
    "clientes" TEXT NOT NULL,
    "fichaId" INTEGER,

    CONSTRAINT "InputOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Riesgo" (
    "id" SERIAL NOT NULL,
    "denominacion" TEXT NOT NULL,
    "probabilidad" TEXT,
    "impacto" TEXT,
    "planAccion" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fichaId" INTEGER,

    CONSTRAINT "Riesgo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Registro" (
    "id" SERIAL NOT NULL,
    "denominacion" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipoRegistro" "public"."TipoRegistro",
    "fichaId" INTEGER,

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."InputOutput" ADD CONSTRAINT "InputOutput_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "public"."Ficha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Riesgo" ADD CONSTRAINT "Riesgo_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "public"."Ficha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Registro" ADD CONSTRAINT "Registro_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "public"."Ficha"("id") ON DELETE SET NULL ON UPDATE CASCADE;
