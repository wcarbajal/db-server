/*
  Warnings:

  - You are about to drop the column `procesoId` on the `Owner` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_procesoId_fkey";

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "procesoId";

-- CreateTable
CREATE TABLE "_ProcesoOwners" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProcesoOwners_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProcesoOwners_B_index" ON "_ProcesoOwners"("B");

-- AddForeignKey
ALTER TABLE "_ProcesoOwners" ADD CONSTRAINT "_ProcesoOwners_A_fkey" FOREIGN KEY ("A") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcesoOwners" ADD CONSTRAINT "_ProcesoOwners_B_fkey" FOREIGN KEY ("B") REFERENCES "Proceso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
