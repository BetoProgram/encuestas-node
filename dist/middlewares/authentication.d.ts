import express, { NextFunction, Request, Response } from 'express';
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => express.Response<any, Record<string, any>>;
