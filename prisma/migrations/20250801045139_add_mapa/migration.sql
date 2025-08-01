-- AlterTable
ALTER TABLE "public"."Proceso" ADD COLUMN     "mapaId" INTEGER;

-- CreateTable
CREATE TABLE "public"."Mapa" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "entradas" TEXT,
    "salidas" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mapa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mapa_nombre_key" ON "public"."Mapa"("nombre");

-- AddForeignKey
ALTER TABLE "public"."Proceso" ADD CONSTRAINT "Proceso_mapaId_fkey" FOREIGN KEY ("mapaId") REFERENCES "public"."Mapa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
