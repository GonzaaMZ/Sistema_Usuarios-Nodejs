const {Router} = require('express');
const { check } = require('express-validator');

const { login, googleSignin } = require('../controllers/auth.controller');
const { crearUsuario } = require('../controllers/usuarios.controller');

const { emailExiste, esRolValido, existeUser, convertirFecha } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Registro de Usuario
router.post('/register',[
    check(['user', 'nombre', 'apellido', 'correo', 'telefono', 'contraseña'], 'Los campos son obligatorios').not().isEmpty(),
    check('correo').custom( emailExiste).isEmail(),
    check('user').custom( existeUser ),
    check('fechaNacimiento', 'Formato de fecha incorrecto').custom( convertirFecha ),
    check('contraseña', 'El password es obligatorio y debe contar con mas de 6 caracteres').isLength({min: 6}),
    check('rol').custom( esRolValido ),
    validarCampos
], crearUsuario);

//Login de usuario || Obtiene su JWT
router.get('/login',[
    check('user', 'EL username es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos 
], login);

//Registro y Login con Google
router.post('/google',[
    check('id_token', 'EL id_token es necesario').not().isEmpty(),
    validarCampos 
], googleSignin)



module.exports = router;