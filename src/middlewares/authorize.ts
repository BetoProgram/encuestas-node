import express, { NextFunction, Request, Response } from 'express';
import { veryfyToken } from '../utils/auth.service';

export const authorize = (roles) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const token = req.headers.authorization.split(' ').pop()

        const tokenData = veryfyToken(token);

        const hasRole = roles.includes(tokenData.rol);

        if(!hasRole){
            return res.status(401).json({ message: 'No tienes permisos para ver este recurso' });
        }

        next();
    }
}