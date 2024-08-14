"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("./middlewares");
const AuthController_1 = require("./controllers/AuthController");
const EncuestasController_1 = require("./controllers/EncuestasController");
const PreguntasController_1 = require("./controllers/PreguntasController");
const router = (0, express_1.Router)();
///////////////////////Encustas///////////////////////////
router.get('/encuesta', middlewares_1.authenticate, (0, middlewares_1.authorize)(['STAFF', 'ADMIN']), EncuestasController_1.getEncuestas);
router.post('/encuesta', (0, express_validator_1.body)('titulo').notEmpty().withMessage('El titulo es obligatorio'), (0, express_validator_1.body)('fechaInicio').notEmpty().withMessage('La fecha de Inicio es obligatoria')
    .isDate().withMessage('La fecha de inicio no es valida'), (0, express_validator_1.body)('fechaFin').notEmpty().withMessage('La fecha de Final es obligatoria')
    .isDate().withMessage('La fecha final no es valida'), middlewares_1.handleInputErrors, middlewares_1.authenticate, (0, middlewares_1.authorize)(['STAFF', 'ADMIN']), EncuestasController_1.crearEncuesta);
router.put('/encuesta/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), (0, express_validator_1.body)('titulo').notEmpty().withMessage('El titulo es obligatorio'), (0, express_validator_1.body)('fechaInicio').notEmpty().withMessage('La fecha de Inicio es obligatoria')
    .isDate().withMessage('La fecha de inicio no es valida'), (0, express_validator_1.body)('fechaFin').notEmpty().withMessage('La fecha de Final es obligatoria')
    .isDate().withMessage('La fecha final no es valida'), middlewares_1.handleInputErrors, middlewares_1.authenticate, (0, middlewares_1.authorize)(['STAFF', 'ADMIN']), EncuestasController_1.crearEncuesta);
///////////////////////Preguntas///////////////////////////
router.get('/preguntas', middlewares_1.authenticate, PreguntasController_1.getPreguntas);
router.post('/preguntas', (0, express_validator_1.body)('descripcion').notEmpty().withMessage('La pregunta es obligatoria'), (0, express_validator_1.body)('idEncuesta').notEmpty().withMessage('La encuesta es obligatoria'), (0, express_validator_1.body)('tipoRespuesta').notEmpty().withMessage('El tipo de pregunta es obligatoria')
    .isIn(['SENCILLA', 'MULTIPLE', 'LIBRE']).withMessage('El tipo de respuesta no contiene un tipo valido'), middlewares_1.handleInputErrors, middlewares_1.authenticate, (0, middlewares_1.authorize)(['STAFF', 'ADMIN']), PreguntasController_1.crearPregunta);
router.post('/responderpregunta', (0, express_validator_1.body)('idEncuesta').notEmpty().withMessage('La encuesta es obligatoria'), (0, express_validator_1.body)('idUsuario').notEmpty().withMessage('El usuario es obligatorio'), middlewares_1.handleInputErrors, middlewares_1.authenticate, (0, middlewares_1.authorize)(['ADMIN', 'SUSCRIPTOR']), PreguntasController_1.responderEncuesta);
///////////////////////Usuarios///////////////////////////
router.get('/usuarios', middlewares_1.authenticate, (0, middlewares_1.authorize)(['ADMIN']), AuthController_1.getUsuarios);
router.post('/login', (0, express_validator_1.body)('correo').notEmpty().withMessage('El correo electronico no puede ir vacio')
    .isEmail().withMessage('El correo no es valido'), (0, express_validator_1.body)('password').notEmpty().withMessage('El password no puede ser vacio'), middlewares_1.handleInputErrors, AuthController_1.login);
router.post('/registrar', (0, express_validator_1.body)('nombre').notEmpty().withMessage('El nombre de usuario no puede ir vacio'), (0, express_validator_1.body)('correo').notEmpty().withMessage('El correo electronico no puede ir vacio')
    .isEmail().withMessage('El correo no es valido'), (0, express_validator_1.body)('password').notEmpty().withMessage('El password no puede ser vacio')
    .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false
}).withMessage('El password debe de ser minimo 8 caractares, almenos una Mayuscula y caracterer especial'), (0, express_validator_1.body)('telefono').notEmpty().withMessage('El telefono no puede ser vacio'), (0, express_validator_1.body)('direccion').notEmpty().withMessage('La direccion no puede ser vacia'), middlewares_1.handleInputErrors, AuthController_1.registrar);
exports.default = router;
//# sourceMappingURL=router.js.map