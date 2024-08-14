/*
  Warnings:

  - Added the required column `descripcion` to the `Preguntas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Preguntas" ADD COLUMN     "descripcion" TEXT NOT NULL;
