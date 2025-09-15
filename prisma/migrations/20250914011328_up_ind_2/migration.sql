-- CreateTable
CREATE TABLE "public"."Resultado" (
    "id" SERIAL NOT NULL,
    "denominacion" TEXT,
    "descripcion" TEXT,
    "valor" DOUBLE PRECISION NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL,
    "indicadorId" INTEGER NOT NULL,

    CONSTRAINT "Resultado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Resultado" ADD CONSTRAINT "Resultado_indicadorId_fkey" FOREIGN KEY ("indicadorId") REFERENCES "public"."Indicador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
