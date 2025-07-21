-- CreateTable
CREATE TABLE "Proceso" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "parentId" INTEGER,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proceso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Proceso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
