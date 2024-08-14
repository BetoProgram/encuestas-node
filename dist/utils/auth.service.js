"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarToken = generarToken;
exports.veryfyToken = veryfyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generarToken(user) {
    const JWT_SECRET = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.correo, rol: user.rol }, JWT_SECRET, { expiresIn: '2h' });
}
function veryfyToken(token) {
    const JWT_SECRET = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
//# sourceMappingURL=auth.service.js.map