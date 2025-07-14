require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const socketio = require( 'socket.io' );

const Sockets = require( './sockets' );


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.loginPath = '/api/login';

    // Middelware
    this.middlewares(); //http://localhost:8080/api


    //Rutas de mi aplicación
    this.routes();
    this.io = socketio( this.server, { /* configuraciones */ } );

  }

  routes() {

    this.app.use( this.loginPath, require( '../routes/auth.routes' ) );

  }


  listen() {

    this.app.listen( this.port, () => {
      console.log( `Corriendo en puerto: ${ this.port }` );
    } );
  }

  middlewares() {
    //CORS
    this.app.use( cors() );
    console.log("se ejecuta el cors")

    //Lectura y parseo del body
    this.app.use( express.json() );

    //Directorio público
    this.app.use( express.static( 'public' ) );
  }

  configurarSockets() {
      new Sockets( this.io );
   }

  execute(){
    // Inicializar Middlewares
    //this.listen()
    //this.middlewares();

    //Rutas de mi aplicación
    //this.routes();

    // Inicializar sockets
    //this.configurarSockets();

    // Inicializar Server
    this.configurarSockets()
  }
}

module.exports = Server;