/*
  Warnings:

  - A unique constraint covering the columns `[detalleProcesoId]` on the table `Proceso` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Proceso" ADD COLUMN     "detalleProcesoId" INTEGER;

-- CreateTable
CREATE TABLE "DetalleProceso" (
    "id" SERIAL NOT NULL,
    "procedimiento" TEXT,
    "indicadores" TEXT,
    "diagramaId" INTEGER,
    "fichaId" INTEGER,
    "procedimientoId" INTEGER,

    CONSTRAINT "DetalleProceso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagrama" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diagrama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ficha" (
    "id" SERIAL NOT NULL,
    "objetivo" TEXT,
    "objetivoEstratégico" TEXT,
    "alcance" TEXT,
    "entradas" TEXT,
    "salidas" TEXT,
    "proveedores" TEXT,
    "clientes" TEXT,
    "riesgos" TEXT,
    "registros" TEXT,

    CONSTRAINT "Ficha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Procedimiento" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Procedimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actividad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "responsable" TEXT NOT NULL,
    "procedimientoId" INTEGER,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indicador" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "justificacion" TEXT,
    "formula" TEXT,
    "sentidoEsperado" TEXT,
    "unidadMedida" TEXT,
    "frecuencia" TEXT,
    "fuenteDatos" TEXT,
    "logrosEsperados" TEXT,
    "lineaBase" TEXT,
    "detalleProcesoId" INTEGER,

    CONSTRAINT "indicador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DetalleProceso_diagramaId_key" ON "DetalleProceso"("diagramaId");

-- CreateIndex
CREATE UNIQUE INDEX "DetalleProceso_fichaId_key" ON "DetalleProceso"("fichaId");

-- CreateIndex
CREATE UNIQUE INDEX "DetalleProceso_procedimientoId_key" ON "DetalleProceso"("procedimientoId");

-- CreateIndex
CREATE UNIQUE INDEX "Proceso_detalleProcesoId_key" ON "Proceso"("detalleProcesoId");

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_detalleProcesoId_fkey" FOREIGN KEY ("detalleProcesoId") REFERENCES "DetalleProceso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleProceso" ADD CONSTRAINT "DetalleProceso_diagramaId_fkey" FOREIGN KEY ("diagramaId") REFERENCES "Diagrama"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleProceso" ADD CONSTRAINT "DetalleProceso_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "Ficha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleProceso" ADD CONSTRAINT "DetalleProceso_procedimientoId_fkey" FOREIGN KEY ("procedimientoId") REFERENCES "Procedimiento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_procedimientoId_fkey" FOREIGN KEY ("procedimientoId") REFERENCES "Procedimiento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicador" ADD CONSTRAINT "indicador_detalleProcesoId_fkey" FOREIGN KEY ("detalleProcesoId") REFERENCES "DetalleProceso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
