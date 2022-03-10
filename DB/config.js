
const {Sequelize} = require('sequelize');

const db = new Sequelize('sistema_usuarios', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
});

const dbConnection = async () => {
    try {
        await db.authenticate();
        console.log('Conexion a base de datos exitosa')

    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    db,
    dbConnection
}
