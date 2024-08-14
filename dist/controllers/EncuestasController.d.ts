import { Request, Response } from 'express';
export declare const getEncuestas: (req: Request, res: Response) => Promise<void>;
export declare const crearEncuesta: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const actualizarEncuesta: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
