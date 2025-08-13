/*
  Warnings:

  - You are about to drop the column `clientes` on the `InputOutput` table. All the data in the column will be lost.
  - You are about to drop the column `entradas` on the `InputOutput` table. All the data in the column will be lost.
  - You are about to drop the column `proveedores` on the `InputOutput` table. All the data in the column will be lost.
  - You are about to drop the column `salidas` on the `InputOutput` table. All the data in the column will be lost.
  - Added the required column `cliente` to the `InputOutput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entrada` to the `InputOutput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proveedor` to the `InputOutput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salida` to the `InputOutput` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."InputOutput" DROP COLUMN "clientes",
DROP COLUMN "entradas",
DROP COLUMN "proveedores",
DROP COLUMN "salidas",
ADD COLUMN     "cliente" TEXT NOT NULL,
ADD COLUMN     "entrada" TEXT NOT NULL,
ADD COLUMN     "proveedor" TEXT NOT NULL,
ADD COLUMN     "salida" TEXT NOT NULL;
