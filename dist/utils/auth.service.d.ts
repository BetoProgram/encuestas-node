import { Usuario } from "@prisma/client";
export declare function generarToken(user: Usuario): string;
export declare function veryfyToken(token: string): any;
