const { response } = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');


const { generarJWT } = require('../helpers/generar-jwt');

const { Usuario } = require("../models/usuario");
const { googleVerify } = require('../helpers/google-verify');



const login = async (req, res = response) => {

    const {user, correo, contraseña} = req.body;

    try {

        let usuario = await Usuario.findOne({
            where: {
                user: user
            }
        })

        //Verificar la contraseña
        const validPassword = bcrypt.compareSync(contraseña, usuario.getDataValue('contraseña'));
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Password no es correcto - contraseña'
            });
        }

        usuario = await Usuario.findOne({
            where: {
                [Op.and]: [
                    {user: user},
                    {correo: correo},
                ]
                
            }
        });
        
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Email / password no son correctos - correo'
            });
        }

        console.log(usuario.getDataValue('contraseña'));


        //Genero el JWT
        const token = await generarJWT(usuario.getDataValue('idUsuario'));

        res.json({
            usuario,
            token
         })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Server Error"
        });
    }

}

//Control de 
const googleSignin = async (req, res = response) => {

    //Recibo de token a traves de header
    const {id_token} = req.body;

    console.log(id_token)

    try {
        //Parametros recibidos mediante google
        const {correo, nombre} = await googleVerify(id_token);

        //Busco el correo
        let usuario = await Usuario.findOne({
            where: {
                correo: correo
            }
        });
        
        //Verificar si el usuario existe
        if(!usuario){
            //Tengo que crearlo
            const data = {
                user : correo,
                nombre: nombre,
                apellido: "",
                correo,
                contraseña: '123456',
                telefono: "",
                google: true
            }

            usuario = await Usuario.create(data);
        }

        //Generar el JWT
        const token = await generarJWT(usuario.getDataValue('idUsuario')); 

        //console.log(token);

        res.json({
            usuario,
            token
        });



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Token de Google no válido'
        });
    }

}

module.exports = {
    login,
    googleSignin
}