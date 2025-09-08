-- CreateTable
CREATE TABLE "public"."_UsuarioMapas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UsuarioMapas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UsuarioMapas_B_index" ON "public"."_UsuarioMapas"("B");

-- AddForeignKey
ALTER TABLE "public"."_UsuarioMapas" ADD CONSTRAINT "_UsuarioMapas_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Mapa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UsuarioMapas" ADD CONSTRAINT "_UsuarioMapas_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
