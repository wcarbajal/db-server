/*
  Warnings:

  - You are about to drop the `indicador` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."TipoIndicadorEstrategico" AS ENUM ('OEI', 'AEI', 'IP');

-- DropForeignKey
ALTER TABLE "public"."indicador" DROP CONSTRAINT "indicador_procesoId_fkey";

-- DropTable
DROP TABLE "public"."indicador";

-- CreateTable
CREATE TABLE "public"."Indicador" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipoNivel" "public"."TipoIndicadorEstrategico" NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,
    "justificacion" TEXT,
    "formula" TEXT,
    "sentidoEsperado" TEXT,
    "unidadMedida" TEXT,
    "frecuencia" TEXT,
    "fuenteDatos" TEXT,
    "logrosEsperados" TEXT,
    "lineaBase" TEXT,
    "parentId" INTEGER,
    "procesoId" INTEGER NOT NULL,

    CONSTRAINT "Indicador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Indicador_codigo_key" ON "public"."Indicador"("codigo");

-- AddForeignKey
ALTER TABLE "public"."Indicador" ADD CONSTRAINT "Indicador_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Indicador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Indicador" ADD CONSTRAINT "Indicador_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "public"."Proceso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
