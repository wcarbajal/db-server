/*
  Warnings:

  - The values [ascendente,descendente] on the enum `SentidoEsperado` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."SentidoEsperado_new" AS ENUM ('Ascendente', 'Descendente');
ALTER TABLE "public"."Indicador" ALTER COLUMN "sentidoEsperado" DROP DEFAULT;
ALTER TABLE "public"."Indicador" ALTER COLUMN "sentidoEsperado" TYPE "public"."SentidoEsperado_new" USING ("sentidoEsperado"::text::"public"."SentidoEsperado_new");
ALTER TYPE "public"."SentidoEsperado" RENAME TO "SentidoEsperado_old";
ALTER TYPE "public"."SentidoEsperado_new" RENAME TO "SentidoEsperado";
DROP TYPE "public"."SentidoEsperado_old";
ALTER TABLE "public"."Indicador" ALTER COLUMN "sentidoEsperado" SET DEFAULT 'Ascendente';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Indicador" ALTER COLUMN "sentidoEsperado" SET DEFAULT 'Ascendente';
