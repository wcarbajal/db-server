const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );
const path = require( 'path' );

const prisma = new PrismaClient();

const getIndicadores = async ( req = request, res = response ) => {
  const { mapaId } = req.params;

  try {


    // Trae todos los indicadores del mapa, incluyendo resultados
    const indicadores = await prisma.indicador.findMany( {
      where: { mapaId: Number( mapaId ), estado: true },
      include: { resultado: true }
    } );

    if ( indicadores.length === 0 ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'No se encontraron indicadores para este mapa'
      } );
    }

    // Construye el árbol
    const indicadorMap = {};
    indicadores.forEach( ind => {
      indicadorMap[ ind.id ] = { ...ind, hijos: [] };
    } );

    const raiz = [];
    indicadores.forEach( ind => {
      if ( ind.parentId ) {
        if ( indicadorMap[ ind.parentId ] ) {
          indicadorMap[ ind.parentId ].hijos.push( indicadorMap[ ind.id ] );
        }
      } else {
        raiz.push( indicadorMap[ ind.id ] );
      }
    } );

    if ( raiz.length === 0 ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'No se encontraron indicadores para este mapa'
      } );
    }

    res.json( {
      ok: true,
      indicadores,
      indicadoresJSON: raiz
    } );
  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al obtener los indicadores'
    } );
  }
};

const crearIndicador = async ( req = request, res = response ) => {

  const { mapaId } = req.params;
  const { codigo, nombre, tipoNivel, parentId } = req.body;

  try {

    const indicadorExistente = await prisma.indicador.findFirst( {
      where: {
        codigo,
        mapaId: Number( mapaId )
      }
    } );
    if ( indicadorExistente ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'Ya existe un indicador con este código en el mapa'
      } );
    }

    const nuevoIndicador = await prisma.indicador.create( {
      data: {
        codigo,
        nombre,
        tipoNivel,
        mapa: {
          connect: { id: Number( mapaId ) }
        }
      }
    } );

    if ( parentId ) {
      await prisma.indicador.update( {
        where: { id: nuevoIndicador.id },
        data: { parentId: Number( parentId ) }
      } );
    }

    res.status( 201 ).json( {
      ok: true,
      nuevoIndicador
    } );
  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al crear el indicador'
    } );
  }
};

const modificarIndicador = async ( req = request, res = response ) => {

  //TODO: Revisar

  const { id } = req.params;

  const { codigo, nombre, tipoNivel, parentId, formula, frecuencia, fuenteDatos, justificacion, lineaBase, logrosEsperados, sentidoEsperado, unidadMedida } = req.body;

  try {
    const indicador = await prisma.indicador.findUnique( {
      where: { id: Number( id ) }
    } );
    if ( !indicador ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'No se encontró el indicador'
      } );
    }
    const indicadorActualizado = await prisma.indicador.update( {
      where: { id: Number( id ) },
      data: {
        codigo: codigo || indicador.codigo,
        nombre: nombre || indicador.nombre,
        tipoNivel: tipoNivel || indicador.tipoNivel,
        parentId: parentId ? Number( parentId ) : indicador.parentId,
        formula: formula || indicador.formula,
        frecuencia: frecuencia || indicador.frecuencia,
        fuenteDatos: fuenteDatos || indicador.fuenteDatos,
        justificacion: justificacion || indicador.justificacion,
        lineaBase: lineaBase || indicador.lineaBase,
        logrosEsperados: logrosEsperados || indicador.logrosEsperados,
        sentidoEsperado: sentidoEsperado || indicador.sentidoEsperado,
        unidadMedida: unidadMedida || indicador.unidadMedida,
      }
    } );
    res.json( {
      ok: true,
      indicador: indicadorActualizado
    } );
  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al modificar el indicador'
    } );
  }
};

const getIndicador = async ( req = request, res = response ) => {

  const { Id } = req.params;

  try {
    const indicador = await prisma.indicador.findUnique( {
      where: { id: Number( Id ) }
    } );
    if ( !indicador ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'No se encontró el indicador'
      } );
    }
    res.json( {
      ok: true,
      indicador
    } );
  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al obtener el indicador'
    } );
  }
};


const eliminarIndicador = async ( req, res ) => {
  const { id } = req.params;

  try {
    const indicador = await prisma.indicador.findUnique( {
      where: { id: Number( id ) }
    } );

    if ( !indicador ) {
      return res.status( 404 ).json( { ok: false, msg: 'Indicador no encontrado' } );
    }

    // Reasignar los hijos al padre del nodo eliminado
    await prisma.indicador.updateMany( {
      where: { parentId: Number( id ) },
      data: { parentId: indicador.parentId }
    } );

    // Eliminar el nodo
    await prisma.indicador.update( {
      where: { id: Number( id ) },
      data: { estado: false }
    } );

    res.json( { ok: true, msg: 'Indicador eliminado correctamente' } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { msg: 'Error al eliminar el indicador' } );
  }
};

module.exports = {
  getIndicadores,
  crearIndicador,
  modificarIndicador,
  getIndicador,
  eliminarIndicador
};