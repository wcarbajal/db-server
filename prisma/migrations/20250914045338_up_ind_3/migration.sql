/*
  Warnings:

  - Changed the type of `tipoNivel` on the `Indicador` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."TipoIndicadorNivel" AS ENUM ('OEI', 'AEI', 'IO');

-- AlterTable
ALTER TABLE "public"."Indicador" DROP COLUMN "tipoNivel",
ADD COLUMN     "tipoNivel" "public"."TipoIndicadorNivel" NOT NULL;

-- DropEnum
DROP TYPE "public"."TipoIndicadorEstrategico";
