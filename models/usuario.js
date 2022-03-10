const { DataTypes } = require("sequelize");
const { db } = require("../DB/config");

const Usuario = db.define('Usuario', {

    idUsuario: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        get(){
            const rawValue = this.getDataValue('idUsuario');
            return rawValue ? rawValue : null;
        }
    },

    user: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('user');
            return rawValue ? rawValue : null;
        }
    },

    correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('correo');
            return rawValue ? rawValue : null;
        }
    },

    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('contraseña');
            return rawValue ? rawValue : null;
        }
    },

    rol: {
        type: DataTypes.ENUM,
        values: ['ADMIN', 'USER'],
        get(){
            const rawValue = this.getDataValue('rol');
            return rawValue ? rawValue : null;
        }
    },

    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('telefono');
            return rawValue ? rawValue : null;
        }
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('nombre');
            return rawValue ? rawValue : null;
        }
    },

    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('apellido');
            return rawValue ? rawValue : null;
        }
    },

    fechaNacimiento: {
        type: DataTypes.DATEONLY,

    },

    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        get(){
            const rawValue = this.getDataValue('google');
            return rawValue ? rawValue : null;
        }
    }

},

{
    tableName: 'Usuarios',
    updatedAt: false
});


const iniciarTablaUsuario = async () => {
    try {
        await Usuario.sync({alter: true});
        console.log('Tabla creada existosamente')
    } catch (error) {
        console.log(error);
        console.log('No se pudo crear la tabla')
    }
}



module.exports = {
    Usuario,
    iniciarTablaUsuario
}