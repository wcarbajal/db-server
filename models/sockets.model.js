

class Sockets {

  constructor( io ) {

    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on( 'connection', async ( socket ) => {

      const [ valido, id ] = comprobarJWT( socket.handshake.query[ 'x-token' ] );

      console.log( valido, id );
      
      if ( !valido ) {
        console.log( 'socket no identificado' );
        return socket.disconnect();
      }

      await usuarioConectado( id );


    } );
  }


}


module.exports = Sockets;