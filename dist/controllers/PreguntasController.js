"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responderEncuesta = exports.crearPregunta = exports.getPreguntas = void 0;
const db_1 = require("../config/db");
const getPreguntas = async (req, res) => {
    try {
        const preguntas = await db_1.prisma.preguntas.findMany({});
        res.json(preguntas);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ha ocrrido un error' });
    }
};
exports.getPreguntas = getPreguntas;
const crearPregunta = async (req, res) => {
    try {
        const body = req.body;
        const encuesta = await db_1.prisma.encuesta.findUnique({ where: { id: body.idEncuesta } });
        if (!encuesta) {
            return res.status(404).json({ message: 'No se encuentra la encuenta a que crear primero una' });
        }
        await db_1.prisma.preguntas.create({
            data: body
        });
        res.json({ message: 'Se ha creado correctamente la pregunta' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ha ocrrido un error' });
    }
};
exports.crearPregunta = crearPregunta;
const responderEncuesta = async (req, res) => {
    try {
        const body = req.body;
        const usuario = await db_1.prisma.usuario.findUnique({ where: { id: body.idUsuario } });
        if (!usuario) {
            return res.status(401).json({ message: 'El usuario no existe no se encuetra registrado' });
        }
        const encuesta = await db_1.prisma.encuesta.aggregate({
            where: { id: body.idEncuesta },
            _max: { encuestasTomadas: true }
        });
        await db_1.prisma.$transaction(async (prisma) => {
            const encuestaUpdate = await prisma.encuesta.update({
                where: { id: body.idEncuesta },
                data: {
                    encuestasTomadas: encuesta._max.encuestasTomadas,
                    estatus: 'ACTIVA'
                }
            });
            const responderEncuesta = await prisma.encuestasOnUsuarios.create({
                data: body
            });
        });
        res.json({ message: 'Se ha respondido correctamente la pregunta' });
    }
    catch (error) {
    }
};
exports.responderEncuesta = responderEncuesta;
//# sourceMappingURL=PreguntasController.js.map