const { response } = require('express');
const bcrypt = require('bcryptjs');

const {Usuario, iniciarTablaUsuario} = require('../models/usuario');
const { Sequelize } = require('sequelize');


const obtenerUsuarios = async (req, res = response) => {

    const usuario = await Usuario.findAll({
        attributes: ['idUsuario', 'user', 'correo'],
       
    });

    const total = await Usuario.findAndCountAll({
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('user')), 'total_usuarios']]
    });

    return res.json({
        usuario,
        total
    });
}

const obtenerUsuariobyID = async (req, res = response) => {

    const {id} = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        return res.json(usuario);
        
    } catch (error) {
        console.log(error);
    }

}


const crearUsuario = async (req, res = response) => {

    iniciarTablaUsuario();

    let {contraseña, ...resto} = req.body;

    //Encriptacion de password
    const salt = bcrypt.genSaltSync();
    contraseña = bcrypt.hashSync(contraseña, salt);

    const data = {
        ...resto,
        contraseña
    }

    try {
        const usuario = await Usuario.create(data);
        
        return res.status(200).json(usuario)
    } catch (error) {
        throw new Error(error);
    }
}


const actualizarUsuario = async (req, res = response) => {

    const {id} = req.params;
    let {contraseña, ...resto} = req.body;

    if(contraseña){
        //Encriptacion de password
    const salt = bcrypt.genSaltSync();
    contraseña = bcrypt.hashSync(contraseña, salt);
    }

    const data = {
        ...resto,
        contraseña
    }

    const usuario = await Usuario.update(data, {
        where: {
            idUsuario: id
        }
    });

    const usuarioMostrar = await Usuario.findByPk(id);

    return res.json({
        msg: `Registros afectados ${usuario}`,
        usuarioMostrar
    });

}


const eliminarUsuario = async (req, res = response) => {

    const {id} = req.params;
    
    const usuarioBorrado = await Usuario.findByPk(id)

    const usuarioBorrar = await Usuario.destroy({
        where: {
            idUsuario: id
        }
    })


    return res.json({
        msg: 'Usuario borrado con exito',
        usuarioBorrado
    });
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuariobyID,
    actualizarUsuario,
    eliminarUsuario
}