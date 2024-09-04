"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registrar = exports.getUsuarios = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../config/db");
const auth_service_1 = require("../utils/auth.service");
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await db_1.prisma.usuario.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        const data = usuarios.map(({ password, ...rest }) => rest);
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ha ocrrido un error' });
    }
};
exports.getUsuarios = getUsuarios;
const registrar = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuarioDb = await db_1.prisma.usuario.findUnique({ where: { correo } });
        if (usuarioDb) {
            return res.status(400).json({ message: 'Ya se encuentra registrado ese usuario' });
        }
        const passwordHash = await bcrypt_1.default.hashSync(password, 10);
        const data = { ...req.body, password: passwordHash };
        var usuario = await db_1.prisma.usuario.create({
            data
        });
        res.json({ message: 'Se ha registrado usuario correctamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ha ocrrido un error' });
    }
};
exports.registrar = registrar;
const login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuarioDb = await db_1.prisma.usuario.findUnique({ where: { correo } });
        if (!usuarioDb) {
            return res.status(401).json({ message: 'El usuario no se encuentra registrado' });
        }
        var verifyPassword = await bcrypt_1.default.compareSync(password, usuarioDb.password);
        if (!verifyPassword) {
            return res.status(401).json({ message: 'El password no es correcto' });
        }
        const usuario = {
            username: usuarioDb.correo,
            token: (0, auth_service_1.generarToken)(usuarioDb)
        };
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ha ocrrido un error' });
    }
};
exports.login = login;
//# sourceMappingURL=AuthController.js.map