const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );

const prisma = new PrismaClient();
/**
 * Lista todos los dueños (owners) registrados en la base de datos.
 * @param {request} req - La solicitud HTTP.
 * @param {response} res - La respuesta HTTP.
 * @returns {Promise<void>} Respuesta JSON con la lista de dueños o un error.
 */
const listaOwners = async ( req = request, res = response ) => {
  try {
    const owners = await prisma.owner.findMany( {
      where: { estado: true },
      orderBy: {
        id: 'asc'
      }
    } );

    if ( !owners || owners.length === 0 ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'No se encontraron dueños',
        owners: []
      } );
    }

    res.json( {
      ok: true,
      msg: 'Lista de dueños',
      owners
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al obtener la lista de dueños'
    } );
  }
};

const registrarOwner = async ( req = request, res = response ) => {

  const { oficina, siglas, director, correo } = req.body;

  try {

    // verificar si el owner ya existe
    const existingOwner = await prisma.owner.findMany( {
      where: {
        OR: [
          { oficina: oficina },
          { siglas: siglas }
        ]
      }
    } );

    if ( existingOwner.length > 0 ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'Ya existe un Dueño con ese oficina o sigla'
      } );
    }

    const nuevoOwner = await prisma.owner.create( {
      data: {
        oficina,
        siglas,
        director,
        correo
      }
    } );

    res.status( 201 ).json( {
      ok: true,
      msg: 'Owner registrado exitosamente',
      owner: nuevoOwner
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar el owner'
    } );
  }
};

const eliminarOwner = async ( req, res ) => {

  const { id } = req.params;

  try {
    const owner = await prisma.owner.findUnique( {
      where: { id: Number( id ) }
    } );

    if ( !owner ) {
      return res.status( 404 ).json( {
        msg: 'Owner no encontrado'
      } );
    }

    await prisma.owner.update( {
      where: { id: Number( id ) },
      data: { estado: false }
    } );

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json( { msg: 'Error al eliminar owner' } );
  }
};

const actualizarOwner = async ( req, res ) => {

  const { id } = req.params;
  const { oficina, siglas, director, correo } = req.body;

  try {

    const owner = await prisma.owner.findUnique( {
      where: { id: Number( id ) }
    } );

    if ( !owner ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Owner no encontrado'
      } );
    }


    // buscar en el resto de registros si ya existe un owner con la misma oficina o siglas
    const existingOwner = await prisma.owner.findMany( {
      where: {
        OR: [
          { oficina: oficina },
          { siglas: siglas }
        ]
      }
    } );
    if ( existingOwner.length > 0 && existingOwner[ 0 ].id !== Number( id ) ) {
      return res.status( 400 ).json( { ok: false, msg: 'Ya existe un owner con esa oficina o siglas' } );
    }


    const updatedOwner = await prisma.owner.update( {
      where: { id: Number( id ) },
      data: {
        oficina: oficina || owner.oficina,
        siglas: siglas || owner.siglas,
        director: director || owner.director,
        correo: correo || owner.correo
      }
    } );

    res.json( {
      ok: true,
      msg: 'Owner actualizado exitosamente',
      owner: updatedOwner
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al actualizar el owner'
    } );
  }
};

module.exports = {
  listaOwners,
  registrarOwner,
  eliminarOwner,
  actualizarOwner
};