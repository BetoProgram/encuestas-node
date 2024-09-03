import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../config/db';

export const actualizaUsuarios = async(req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const body = req.body;
        let passwordHash ='';

        const usuario = await prisma.usuario.findUnique({ where:{ id:+id } });

        if(!usuario){
            return res.status(404).json({ message: 'El usuario seleccionado no existe' });
        }

        if(body.password){
            passwordHash = await bcrypt.hashSync(body.password, 10);
        }else{
            passwordHash = usuario.password;
        }

        await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                nombre: body.nombre,
                correo: usuario.correo,
                telefono: body.telefono,
                direccion: body.direccion,
                password: passwordHash
            }
        })

        res.json({ message: 'El usuario fue actualizado correctamente' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Ha ocrrido un error en la actualizacion' });
    }
}

export const eliminarUsuario = async(req:Request, res:Response) => {
    try {
        const { id } = req.params;
        let passwordHash ='';

        const usuario = await prisma.usuario.findUnique({ where:{ id:+id } });

        if(!usuario){
            return res.status(404).json({ message: 'El usuario seleccionado no existe' });
        }

        await prisma.usuario.delete({ where: { id:usuario.id } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Ha ocrrido un error en la eliminacion' });
    }
}