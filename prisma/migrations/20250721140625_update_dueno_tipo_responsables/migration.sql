/*
  Warnings:

  - Added the required column `nivel` to the `Proceso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Proceso` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoProceso" AS ENUM ('Misional', 'Soporte', 'Estratégico');

-- AlterTable
ALTER TABLE "Proceso" ADD COLUMN     "nivel" INTEGER NOT NULL,
ADD COLUMN     "tipo" "TipoProceso" NOT NULL;

-- CreateTable
CREATE TABLE "Dueño" (
    "id" SERIAL NOT NULL,
    "oficina" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "procesoId" INTEGER,

    CONSTRAINT "Dueño_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProcesoResponsables" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProcesoResponsables_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProcesoResponsables_B_index" ON "_ProcesoResponsables"("B");

-- AddForeignKey
ALTER TABLE "Dueño" ADD CONSTRAINT "Dueño_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "Proceso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcesoResponsables" ADD CONSTRAINT "_ProcesoResponsables_A_fkey" FOREIGN KEY ("A") REFERENCES "Proceso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcesoResponsables" ADD CONSTRAINT "_ProcesoResponsables_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
