
class Sockets {

  constructor( socketio ) {
    this.io = socketio;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on( 'connection', ( socket ) => {
      console.log( 'Cliente conectado', { socket } );
    } );
  }

}