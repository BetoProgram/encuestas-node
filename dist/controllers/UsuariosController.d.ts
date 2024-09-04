import { Request, Response } from 'express';
export declare const actualizaUsuarios: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const eliminarUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
