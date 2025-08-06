
require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const path = require( 'path' );
const socketio = require( 'socket.io' );
const http = require( 'http' );
const Sockets = require( './sockets.model' );
const { validarJWT } = require( '../middlewares/jwt' );



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.loginPath = '/api/login';
    this.procesosPath = '/api/procesos';
    this.mapaPath = '/api/mapa';
    this.ownersPath = '/api/owners';


    // Http server
    this.server = http.createServer( this.app );

    // Configuraciones de sockets
    this.io = socketio( this.server, {
      cors: {
        origin: "http://localhost:5173",
        methods: [ "GET", "POST" ]
      }
    } );



  }

  routes() {

    this.app.use( this.loginPath, require( '../routes/auth.routes' ) );
    this.app.use( this.procesosPath, validarJWT, require( '../routes/procesos.routes' ) );
    this.app.use( this.mapaPath, validarJWT, require( '../routes/mapa.routes' ) );
    this.app.use( this.ownersPath, validarJWT, require( '../routes/owners.routes' ) );


  } 


  listen() {

    this.server.listen( this.port, () => {
      console.log( `Corriendo en puerto: ${ this.port }` );
    } );
  }

  middlewares() {

    // Desplegar el directorio público
    this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    //CORS
    this.app.use( cors() );

    console.log( "se ejecuta el cors" );

    //Lectura y parseo del body
    this.app.use( express.json() );

  }

  configurarSockets() {
    new Sockets( this.io );
  }

  execute() {

    // Middelware
    this.middlewares(); //http://localhost:8080/api


    // Configuración de sockets
    this.configurarSockets();

    //Rutas de mi aplicación
    this.routes();

    this.listen();
  }
}

module.exports = Server;