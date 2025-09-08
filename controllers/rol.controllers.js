const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );

const prisma = new PrismaClient();

const getRoles = async ( req = request, res = response ) => {

  try {
    const roles = await prisma.roles.findMany( {
      where: {
        estado: true
      }
    } );

    if ( !roles || roles.length === 0 ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'No se encontraron roles'
      } );
    }

    res.json( {
      ok: true,
      roles
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al obtener los roles'
    } );
  }
}

module.exports = {
  getRoles,
}