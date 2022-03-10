const {Router} = require('express');
const { check } = require('express-validator');

const { crearUsuario, obtenerUsuarios, obtenerUsuariobyID, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios.controller');

const { existeUsuarioById, esRolValido, emailExiste, existeUser, convertirFecha } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRol } = require('../middlewares/validar-roles');

const router = Router();


//Obtener lista de todos los usuarios y el conteo del total || Solo ADMIN || Requiere JWT valido
router.get('/',[
    validarJWT,
    esAdminRol,
    validarCampos
], obtenerUsuarios);

// Obtiene todos los detalles de un usuario utilizando su ID ||  ADMIN y USER || Requiere JWT valido
router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isUUID(),
    check('id').custom( existeUsuarioById ),
    validarCampos
], obtenerUsuariobyID);

// Crear usuarios || Solo ADMIN || Requiere JWT valido
router.post('/',[
    validarJWT,
    esAdminRol,
    check(['user', 'nombre', 'apellido', 'correo', 'telefono', 'contraseña'], 'Los campos son obligatorios').not().isEmpty(),
    check('correo').custom( emailExiste).isEmail(),
    check('user').custom( existeUser ),
    check('fechaNacimiento', 'Formato de fecha incorrecto').custom( convertirFecha ),
    check('contraseña', 'El password es obligatorio y debe contar con mas de 6 caracteres').isLength({min: 6}),
    check('rol').custom( esRolValido ),
    validarCampos
], crearUsuario);

// Actualiza los registros de un usuario utilizando su ID ||  ADMIN y USER || Requiere JWT valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isUUID(), //Validacion si es un ID mongo
    check('id').custom( existeUsuarioById ),//Validacion si existe el usuario por el id
    check('rol').custom( esRolValido ),
    validarCampos
], actualizarUsuario);

// Elimina un usuario utilizando su ID || Solo ADMIN  || Requiere JWT valido
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un ID válido').isUUID(), //Validacion si es un ID mongo
    check('id').custom( existeUsuarioById ),//Validacion si existe el usuario por el id
    validarCampos
], eliminarUsuario);


module.exports = router;