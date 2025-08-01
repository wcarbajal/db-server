/*
  Warnings:

  - A unique constraint covering the columns `[rol]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Roles_rol_key" ON "public"."Roles"("rol");
