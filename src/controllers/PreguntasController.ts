import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getPreguntas = async(req:Request, res:Response) => {
    try {
        const preguntas = await prisma.preguntas.findMany({});
        res.json(preguntas)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Ha ocrrido un error' });
    }
}

export const crearPregunta = async(req:Request, res:Response) => {
    try {
        const body = req.body;

        const encuesta = await prisma.encuesta.findUnique({ where: { id: body.idEncuesta } });

        if(!encuesta){
            return res.status(404).json({ message: 'No se encuentra la encuenta a que crear primero una' });
        }

        await prisma.preguntas.create({
            data: body
        });

        res.json({ message: 'Se ha creado correctamente la pregunta' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message:'Ha ocrrido un error' });
    }
}

export const responderEncuesta = async (req:Request, res:Response) => {
    try {
        const body = req.body;

        const usuario = await prisma.usuario.findUnique({ where: { id: body.idUsuario } });

        if(!usuario){
            return res.status(401).json({ message: 'El usuario no existe no se encuetra registrado' })
        }

        const encuesta = await prisma.encuesta.aggregate({
            where:{ id: body.idEncuesta },
            _max:{ encuestasTomadas:true }
        });

        await prisma.$transaction(async (prisma) => {
            const encuestaUpdate = await prisma.encuesta.update({ 
                where: { id: body.idEncuesta },
                data: {
                    encuestasTomadas: encuesta._max.encuestasTomadas,
                    estatus: 'ACTIVA'
                }
             })
    
            const responderEncuesta = await prisma.encuestasOnUsuarios.create({
                data: body
            });
    
        });

        res.json({ message: 'Se ha respondido correctamente la pregunta' })

    } catch (error) {
        
    }
}