const jwt = require( 'jsonwebtoken' );


const generarjwt = ( id ) => {


  return new Promise( ( resolve, reject ) => {

    const payload = { id };
    //TODO: cambiar la palabra secreta
    jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '24h'
    }, ( err, token ) => {
      if ( err ) {
        console.log( err );
        reject( 'No se pudo generar el JWT' );
      } else {
        resolve( token );
      }
    } );
  } );
};


const comprobarJWT = (token = '' ) => {
  try {

    const { id } = jwt.verify( token, process.env.JWT_SECRET)
    return [true, id ]
    
  } catch (error) {
    return [ false, null ]    
  }

}

module.exports = {
  generarjwt,
  comprobarJWT
};