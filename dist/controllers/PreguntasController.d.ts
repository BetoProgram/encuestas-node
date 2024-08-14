import { Request, Response } from 'express';
export declare const getPreguntas: (req: Request, res: Response) => Promise<void>;
export declare const crearPregunta: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const responderEncuesta: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
