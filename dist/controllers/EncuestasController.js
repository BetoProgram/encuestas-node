"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarEncuesta = exports.crearEncuesta = exports.getEncuestas = void 0;
const db_1 = require("../config/db");
const getEncuestas = async (req, res) => {
    try {
        const encuestas = await db_1.prisma.encuesta.findMany({});
        res.json(encuestas);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ha ocrrido un error' });
    }
};
exports.getEncuestas = getEncuestas;
const crearEncuesta = async (req, res) => {
    try {
        const body = req.body;
        await db_1.prisma.encuesta.create({
            data: body
        });
        res.json({ message: 'Se ha creado correctamente la encuesta' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ha ocrrido un error' });
    }
};
exports.crearEncuesta = crearEncuesta;
const actualizarEncuesta = async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const encuestaDb = await db_1.prisma.encuesta.findUnique({ where: { id: +id } });
        if (!encuestaDb) {
            return res.status(404).json({ message: "No se encuentra la encuesta seleccionada" });
        }
        await db_1.prisma.encuesta.update({
            where: { id: encuestaDb.id },
            data: {
                titulo: body.titulo,
                fechaInicio: body.fechaInicio,
                fechaFin: body.fechaFin,
                descripcion: body.descripcion,
            }
        });
        res.json({ message: 'Se ha actualizado correctamente la encuesta' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ha ocrrido un error' });
    }
};
exports.actualizarEncuesta = actualizarEncuesta;
//# sourceMappingURL=EncuestasController.js.map