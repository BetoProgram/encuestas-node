import jwt from 'jsonwebtoken';
import { Usuario } from "@prisma/client";

export function generarToken(user:Usuario):string{
    const JWT_SECRET = process.env.JWT_SECRET;
    return jwt.sign({ id: user.id, email:user.correo, rol: user.rol }, JWT_SECRET, { expiresIn: '2h' })
}

export function veryfyToken(token:string){
    const JWT_SECRET = process.env.JWT_SECRET;
    return jwt.verify(token, JWT_SECRET);
}
