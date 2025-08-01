/*
  Warnings:

  - You are about to drop the column `procedimientoId` on the `Actividad` table. All the data in the column will be lost.
  - You are about to drop the column `detalleProcesoId` on the `Proceso` table. All the data in the column will be lost.
  - You are about to drop the column `detalleProcesoId` on the `indicador` table. All the data in the column will be lost.
  - You are about to drop the `DetalleProceso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Procedimiento` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[procesoId]` on the table `Diagrama` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fichaId]` on the table `Ficha` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `procesoId` to the `Actividad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `procesoId` to the `Diagrama` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fichaId` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `procesoId` to the `indicador` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Actividad" DROP CONSTRAINT "Actividad_procedimientoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DetalleProceso" DROP CONSTRAINT "DetalleProceso_diagramaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DetalleProceso" DROP CONSTRAINT "DetalleProceso_fichaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DetalleProceso" DROP CONSTRAINT "DetalleProceso_procedimientoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Proceso" DROP CONSTRAINT "Proceso_detalleProcesoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."indicador" DROP CONSTRAINT "indicador_detalleProcesoId_fkey";

-- DropIndex
DROP INDEX "public"."Proceso_detalleProcesoId_key";

-- AlterTable
ALTER TABLE "public"."Actividad" DROP COLUMN "procedimientoId",
ADD COLUMN     "procesoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Diagrama" ADD COLUMN     "procesoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Ficha" ADD COLUMN     "fichaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Proceso" DROP COLUMN "detalleProcesoId";

-- AlterTable
ALTER TABLE "public"."indicador" DROP COLUMN "detalleProcesoId",
ADD COLUMN     "procesoId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."DetalleProceso";

-- DropTable
DROP TABLE "public"."Procedimiento";

-- CreateIndex
CREATE UNIQUE INDEX "Diagrama_procesoId_key" ON "public"."Diagrama"("procesoId");

-- CreateIndex
CREATE UNIQUE INDEX "Ficha_fichaId_key" ON "public"."Ficha"("fichaId");

-- AddForeignKey
ALTER TABLE "public"."Diagrama" ADD CONSTRAINT "Diagrama_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "public"."Proceso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ficha" ADD CONSTRAINT "Ficha_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "public"."Proceso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Actividad" ADD CONSTRAINT "Actividad_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "public"."Proceso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."indicador" ADD CONSTRAINT "indicador_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "public"."Proceso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
