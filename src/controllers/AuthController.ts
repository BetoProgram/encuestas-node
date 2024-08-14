import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../config/db';
import { UsuarioResponse } from '../model';
import { generarToken } from '../utils/auth.service';

export const getUsuarios = async(req:Request, res:Response) => {
    try {
        const usuarios = await prisma.usuario.findMany({});
        const data = usuarios.map(({ password, ...rest }) => rest);
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Ha ocrrido un error' });
    }
}

export const registrar = async(req:Request, res:Response) => {
    try {
        const { correo, password } = req.body;

        const usuarioDb = await prisma.usuario.findUnique({ where: { correo } });

        if(usuarioDb){
            return res.status(400).json({ message: 'Ya se encuentra registrado ese usuario' })
        }

        const passwordHash = await bcrypt.hashSync(password, 10);
        const data = { ...req.body, password: passwordHash };

        var usuario = await prisma.usuario.create({
            data
        });

        res.json({ message: 'Se ha registrado usuario correctamente' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Ha ocrrido un error' });
    }
}


export const login = async(req:Request, res:Response) => {
    try {
        const { correo, password } = req.body;

        const usuarioDb = await prisma.usuario.findUnique({ where: { correo } });

        if(!usuarioDb){
            return res.status(401).json({ message: 'El usuario no se encuentra registrado' })
        }

        var verifyPassword = await bcrypt.compareSync(password, usuarioDb.password);

        if(!verifyPassword){
            return res.status(401).json({ message: 'El password no es correcto' });
        }

        const usuario:UsuarioResponse = {
            username:usuarioDb.correo,
            token: generarToken(usuarioDb)
        };

        res.json(usuario);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'Ha ocrrido un error' });
    }
}