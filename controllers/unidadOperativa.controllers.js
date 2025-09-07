const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );

const prisma = new PrismaClient();
/**
 * Lista todos los dueños (owners) registrados en la base de datos.
 * @param {request} req - La solicitud HTTP.
 * @param {response} res - La respuesta HTTP.
 * @returns {Promise<void>} Respuesta JSON con la lista de dueños o un error.
 
  **/

const getUnidadesOperativas = async ( req = request, res = response ) => {
  
  const { mapaId } = req.params;

  try {
    const unidades = await prisma.unidadOperativa.findMany( {
      where: {
        mapaId: Number( mapaId ),
        estado: true,
      }
    } );

    //verificar si existen unidades operativas
    if ( unidades.length === 0 ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'No se encontraron unidades operativas'
      } );
    }

    res.json( {
      ok: true,
      unidades
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al obtener las unidades operativas'
    } );
  }
};


const updateUnidadesOperativas = async ( req = request, res = response ) => {

  const { id } = req.params;

  const { siglas, nombre, correo } = req.body;

  try {

    // verificar si la unidad operativa existe
    const unidadExistente = await prisma.unidadOperativa.findUnique( {
      where: {
        AND: [
          { mapaId: Number( mapaId ) },
          { estado: true },

        ],

      }
    } );

    if ( !unidadExistente ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Unidad operativa no encontrada'
      } );
    }

    const unidadOperativa = await prisma.unidadOperativa.update( {
      where: { id: Number( id ) },
      data: { siglas, nombre, correo }
    } );

    res.json( {
      ok: true,
      unidadOperativa
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al actualizar la unidad operativa'
    } );
  }
};

const registerUnidadesOperativas = async ( req = request, res = response ) => {

  const { mapaId, siglas, nombre } = req.body;
  try {
    // vrtificar si el mapa existe
    const mapaExistente = await prisma.mapa.findUnique( {
      where: { id: Number( mapaId ) }
    } );

    if ( !mapaExistente ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Mapa no encontrado'
      } );
    }
    // verificar si la unidad operativa ya existe en el mismo mapa
    const unidadExistente = await prisma.unidadOperativa.findFirst( {
      where: {
        mapaId: Number( mapaId ),
        siglas,
        nombre
      }
    } );

    if ( unidadExistente ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'La unidad operativa ya existe en este mapa'
      } );
    }

    const nuevaUnidad = await prisma.unidadOperativa.create( {
      data: { mapaId, siglas, nombre }
    } );

    res.json( {
      ok: true,
      unidad: nuevaUnidad
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar la unidad operativa'
    } );
  }
};


const eliminarUnidadesOperativas = async ( req = request, res = response ) => {

  const { id } = req.params;
  const fechaEliminacion = new Date();

  

  try {
    //verificar si la unidad operativa existe
    const unidadExistente = await prisma.unidadOperativa.findUnique( {
      where: {
        id: Number( id ),
        estado: true,
      }
    } );

    if ( !unidadExistente ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Unidad operativa no encontrada'
      } );
    }

    const unidadEliminada = await prisma.unidadOperativa.update( {
      where: { id: Number( id ) },
      data: {
        estado: false,
        nombre: `${ unidadExistente.nombre } - ${ fechaEliminacion.toISOString() }`,
      }
    } );
    const unidadesRestantes = await prisma.unidadOperativa.findMany( {
      where: {
        mapaId: unidadExistente.mapaId,
        estado: true,
      }
    } );

    res.json( {
      ok: true,      
      unidadesFuncionales: unidadesRestantes
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al eliminar la unidad operativa'
    } );
  }
};

module.exports = {
  getUnidadesOperativas,
  updateUnidadesOperativas,
  registerUnidadesOperativas,
  eliminarUnidadesOperativas
};