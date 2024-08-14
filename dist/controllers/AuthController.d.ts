import { Request, Response } from 'express';
export declare const getUsuarios: (req: Request, res: Response) => Promise<void>;
export declare const registrar: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
