-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "apellidoMaterno" TEXT,
ADD COLUMN     "apellidoPaterno" TEXT,
ALTER COLUMN "nombre" SET DEFAULT 'John';
