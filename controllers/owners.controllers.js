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

  const { mapaId } = req.params;

  console.log("mapaId recibido:", mapaId);

  try {
    const owners = await prisma.owner.findMany( {
      where: { estado: true, mapaId: Number( mapaId ) },
      orderBy: {
        id: 'asc'
      },
      include: {
        unidadOperativa: true
      }
    } );

    console.log("Owners encontrados:", owners);

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

  const { oficina, director, correo, mapaId } = req.body;

  try {

    // verificar si el owner ya existe
    const existingOwner = await prisma.owner.findMany( {
      where: {
        AND:[
          {mapaId: Number( mapaId ) },          
          { unidadOperativaId: Number( oficina ) },
          {estado: true}
        ],
      }
    } );

    if ( existingOwner.length > 0 ) {
      return res.status( 400 ).json( {  
        ok: false,
        msg: 'Ya existe un Dueño con ese oficina para la entidad'
      } );
    }

    const nuevoOwner = await prisma.owner.create( {
      data: {        
        director: director,
        correo: correo,
        mapaId: Number(mapaId),
        unidadOperativaId: Number(oficina)
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
    const owner = await prisma.owner.findMany( {
      where: {
        AND: [
          { id: Number( id ) },
          { estado: true }
        ]
      }
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

    res.json( {
      ok: true,
      msg: 'Owner eliminado exitosamente',      
    } );

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json( { msg: 'Error al eliminar owner' } );
  }
};

const actualizarOwner = async ( req, res ) => {

  const { id } = req.params;
  const { oficina, mapaId, director, correo } = req.body;

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
      AND:[
        {unidadOperativaId: Number(oficina) },
        {estado: true },
        { mapaId: Number(mapaId) }
      ]
       }
    } );
    if ( existingOwner.length > 1 || ( existingOwner.length === 1 && existingOwner[0].id !== owner.id ) ) {
      return res.status( 400 ).json( { ok: false, msg: 'Ya existe un owner con esa oficina o Dirección' } );
    }


    const updatedOwner = await prisma.owner.update( {
      where: { id: Number( id ) },
      data: {
        unidadOperativaId: Number(oficina) || owner.unidadOperativaId,        
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