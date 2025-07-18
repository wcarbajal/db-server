const { use } = require( 'react' );
const { usuarioConectado } = require( '../controllers/socket.controllers' );
const { comprobarJWT } = require( '../helpers/jwt' );


class Sockets {

  constructor( io ) {

    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on( 'connection', async ( socket ) => {

      const [ valido, id ] = comprobarJWT( socket.handshake.query[ 'x-token' ] );

      console.log( {valido}, {id} );
      
      if ( !valido ) {
        console.log( 'socket no identificado' );
        return socket.disconnect();
      }

     const userConect = await usuarioConectado( id );

     console.log(userConect);


    } );
  }


}


module.exports = Sockets;