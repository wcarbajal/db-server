/*
  Warnings:

  - You are about to drop the `Dueño` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dueño" DROP CONSTRAINT "Dueño_procesoId_fkey";

-- DropTable
DROP TABLE "Dueño";

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "oficina" TEXT NOT NULL,
    "siglas" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "procesoId" INTEGER,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "Proceso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
