/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Proceso` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo` to the `Proceso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proceso" ADD COLUMN     "codigo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Proceso_codigo_key" ON "Proceso"("codigo");
