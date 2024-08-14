import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticate, authorize, handleInputErrors } from './middlewares';
import { getUsuarios, login, registrar } from './controllers/AuthController';
import { crearEncuesta, getEncuestas } from './controllers/EncuestasController';
import { crearPregunta, getPreguntas, responderEncuesta } from './controllers/PreguntasController';

const router = Router();

///////////////////////Encustas///////////////////////////
router.get('/encuesta',authenticate,authorize(['STAFF','ADMIN']),getEncuestas);

router.post('/encuesta',
body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
body('fechaInicio').notEmpty().withMessage('La fecha de Inicio es obligatoria')
.isDate().withMessage('La fecha de inicio no es valida'),
body('fechaFin').notEmpty().withMessage('La fecha de Final es obligatoria')
.isDate().withMessage('La fecha final no es valida'),
handleInputErrors,
authenticate,authorize(['STAFF','ADMIN']),crearEncuesta);

router.put('/encuesta/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
    body('fechaInicio').notEmpty().withMessage('La fecha de Inicio es obligatoria')
    .isDate().withMessage('La fecha de inicio no es valida'),
    body('fechaFin').notEmpty().withMessage('La fecha de Final es obligatoria')
    .isDate().withMessage('La fecha final no es valida'),
    handleInputErrors,
    authenticate,authorize(['STAFF','ADMIN']) ,crearEncuesta);
///////////////////////Preguntas///////////////////////////
router.get('/preguntas',authenticate, getPreguntas);

router.post('/preguntas',
body('descripcion').notEmpty().withMessage('La pregunta es obligatoria'),
body('idEncuesta').notEmpty().withMessage('La encuesta es obligatoria'),
body('tipoRespuesta').notEmpty().withMessage('El tipo de pregunta es obligatoria')
.isIn(['SENCILLA','MULTIPLE','LIBRE']).withMessage('El tipo de respuesta no contiene un tipo valido'),
handleInputErrors
,authenticate,authorize(['STAFF','ADMIN']) ,crearPregunta);


router.post('/responderpregunta',
body('idEncuesta').notEmpty().withMessage('La encuesta es obligatoria'),
body('idUsuario').notEmpty().withMessage('El usuario es obligatorio'),
handleInputErrors,
authenticate,authorize(['ADMIN','SUSCRIPTOR']) ,responderEncuesta);

///////////////////////Usuarios///////////////////////////
router.get('/usuarios',authenticate,authorize(['ADMIN']),getUsuarios);

router.post('/login',
body('correo').notEmpty().withMessage('El correo electronico no puede ir vacio')
.isEmail().withMessage('El correo no es valido'),
body('password').notEmpty().withMessage('El password no puede ser vacio'),
handleInputErrors,
login);

router.post('/registrar',
body('nombre').notEmpty().withMessage('El nombre de usuario no puede ir vacio'),
body('correo').notEmpty().withMessage('El correo electronico no puede ir vacio')
.isEmail().withMessage('El correo no es valido'),
body('password').notEmpty().withMessage('El password no puede ser vacio')
.isStrongPassword({
    minLength:8,
    minLowercase:1,
    minUppercase:1,
    minNumbers:1,
    minSymbols:1,
    returnScore: false
}).withMessage('El password debe de ser minimo 8 caractares, almenos una Mayuscula y caracterer especial'),
body('telefono').notEmpty().withMessage('El telefono no puede ser vacio'),
body('direccion').notEmpty().withMessage('La direccion no puede ser vacia'),
handleInputErrors,
registrar);

export default router;