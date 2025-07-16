

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

          console.log("primer socket conectado");

           
            
        
        });
    }


}


module.exports = Sockets;