-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUSCRIPTOR', 'ADMIN', 'STAFF');

-- CreateEnum
CREATE TYPE "TipoRespuesta" AS ENUM ('SENCILLA', 'MULTIPLE', 'LIBRE');

-- CreateEnum
CREATE TYPE "Estatus" AS ENUM ('INICIAL', 'ACTIVA', 'DESACTIVADA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'SUSCRIPTOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Encuesta" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estatus" "Estatus" NOT NULL DEFAULT 'INICIAL',
    "encuestasTomadas" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Encuesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preguntas" (
    "id" SERIAL NOT NULL,
    "tipoRespuesta" "TipoRespuesta" NOT NULL,
    "idEncuesta" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Preguntas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncuestasOnUsuarios" (
    "id" SERIAL NOT NULL,
    "idEncuesta" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EncuestasOnUsuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- AddForeignKey
ALTER TABLE "Preguntas" ADD CONSTRAINT "Preguntas_idEncuesta_fkey" FOREIGN KEY ("idEncuesta") REFERENCES "Encuesta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncuestasOnUsuarios" ADD CONSTRAINT "EncuestasOnUsuarios_idEncuesta_fkey" FOREIGN KEY ("idEncuesta") REFERENCES "Encuesta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncuestasOnUsuarios" ADD CONSTRAINT "EncuestasOnUsuarios_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
