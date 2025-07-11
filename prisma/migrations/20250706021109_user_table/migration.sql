-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN_ROLE', 'USER_ROLE');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL DEFAULT 'John Doe',
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "img" TEXT,
    "rol" "Rol" NOT NULL DEFAULT 'USER_ROLE',
    "estado" BOOLEAN DEFAULT true,
    "google" BOOLEAN DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");
