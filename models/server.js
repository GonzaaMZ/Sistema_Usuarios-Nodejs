
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../DB/config');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        //paths
        this.usersPath = '/api/users'
        this.authPath = '/api/auth'

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middleware();
        //Rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json())
        
        //Directorio público
        this.app.use(express.static('public'));

    }

    routes(){ 
        this.app.use(this.authPath, require('../routes/auth.routes'));
       this.app.use(this.usersPath, require('../routes/usuarios.routes'));

    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;