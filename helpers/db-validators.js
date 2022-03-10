
const {Usuario} = require('../models/usuario');



const esRolValido = async(rol = '') => {
    
    const roles = ['ADMIN', 'USER'];

    if(!roles.includes(rol)){
        throw new Error(`El rol ${rol} no es válido`);
    }
}


//Verificar si el correo existe
const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({
        where: {
            correo: correo
        }
    });
    if (existeEmail){
        throw new Error(`El correo: ${correo} ya existe`);
        }
    }

//Verificar si existe usuario utilizando su id
 const existeUsuarioById = async (id) => {
     const existeUsuario = await Usuario.findByPk(id);
    if (!existeUsuario){
          throw new Error(`El id no existe ${id}`);
      }
    }


const existeUser = async (user) => {

    const existeUser = await Usuario.findOne({
        where: {
            user: user
        }
    });
    if(existeUser){
        throw new Error(`El user: ${user} ya existe`);
    }
}

function convertirFecha(texto) {
    let partes = (texto || '').split('/'),
        fechaGenerada = new Date(partes[2], --partes[1], partes[0]);
    
    if (partes.length == 3 && fechaGenerada
     && partes[0] == fechaGenerada.getDate()
     && partes[1] == fechaGenerada.getMonth()
     && partes[2] == fechaGenerada.getFullYear()) {
        return fechaGenerada;
    }
    return false; //Inválida
}

module.exports = {
    emailExiste,
    existeUsuarioById,
    esRolValido,
    existeUser,
    convertirFecha
}
