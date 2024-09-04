"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.actualizaUsuarios = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../config/db");
const actualizaUsuarios = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        let passwordHash = '';
        const usuario = await db_1.prisma.usuario.findUnique({ where: { id: +id } });
        if (!usuario) {
            return res.status(404).json({ message: 'El usuario seleccionado no existe' });
        }
        if (body.password) {
            passwordHash = await bcrypt_1.default.hashSync(body.password, 10);
        }
        else {
            passwordHash = usuario.password;
        }
        await db_1.prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                nombre: body.nombre,
                correo: usuario.correo,
                telefono: body.telefono,
                direccion: body.direccion,
                password: passwordHash
            }
        });
        res.json({ message: 'El usuario fue actualizado correctamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ha ocrrido un error en la actualizacion' });
    }
};
exports.actualizaUsuarios = actualizaUsuarios;
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        let passwordHash = '';
        const usuario = await db_1.prisma.usuario.findUnique({ where: { id: +id } });
        if (!usuario) {
            return res.status(404).json({ message: 'El usuario seleccionado no existe' });
        }
        await db_1.prisma.usuario.delete({ where: { id: usuario.id } });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ha ocrrido un error en la eliminacion' });
    }
};
exports.eliminarUsuario = eliminarUsuario;
//# sourceMappingURL=UsuariosController.js.map