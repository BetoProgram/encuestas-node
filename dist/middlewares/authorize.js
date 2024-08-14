"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const auth_service_1 = require("../utils/auth.service");
const authorize = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = (0, auth_service_1.veryfyToken)(token);
        const hasRole = roles.includes(tokenData.rol);
        if (!hasRole) {
            return res.status(401).json({ message: 'No tienes permisos para ver este recurso' });
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=authorize.js.map