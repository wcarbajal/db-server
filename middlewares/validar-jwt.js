const jwt = require( 'jsonwebtoken' );

const validarJWT = ( req, res, next ) => {

  try {

    const token = req.header( 'x-token' );

    if ( !token ) {
      return res.status( 401 ).json( {
        ok: false,
        msg: "No hay token en la peticion"
      } );
    }
    const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
    req.id = id;
    
    next();


  } catch ( error ) {
    return res.status( 401 ).json( {
      ok: false,
      msg: "Token no valido"
    } );

  }
};

module.exports = {
  validarJWT
};