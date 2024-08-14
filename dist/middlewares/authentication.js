"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error en la autenticación: ', err);
            return res.status(401).json({ message: 'No tienes acceso a este recurso' });
        }
        next();
    });
};
exports.authenticate = authenticate;
//# sourceMappingURL=authentication.js.map