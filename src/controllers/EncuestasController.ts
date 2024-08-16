import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getEncuestas = async(req:Request, res:Response) => {
    try {
        const encuestas = await prisma.encuesta.findMany({});
        res.json(encuestas)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Ha ocrrido un error' });
    }
}

export const crearEncuesta = async(req:Request, res:Response) => {
    try {
        const body = req.body;
        await prisma.encuesta.create({
            data: body
        });

        res.json({ message: 'Se ha creado correctamente la encuesta' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message:'Ha ocrrido un error' });
    }
}

export const actualizarEncuesta = async(req:Request, res:Response) => {
    try {
        const body = req.body;
        const { id } = req.params;

        const encuestaDb = await prisma.encuesta.findUnique({ where: { id:+id } });

        if(!encuestaDb){
            return res.status(404).json({ message: "No se encuentra la encuesta seleccionada" });
        }

        await prisma.encuesta.update({ 
            where: { id:encuestaDb.id }, 
            data: {  
                titulo: body.titulo,
                fechaInicio: body.fechaInicio,
                fechaFin: body.fechaFin,
                descripcion: body.descripcion,
            }
        });

        res.json({ message: 'Se ha actualizado correctamente la encuesta' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message:'Ha ocrrido un error' });
    }
}