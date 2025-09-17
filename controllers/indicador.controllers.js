const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );
const path = require( 'path' );

const prisma = new PrismaClient();

const getIndicadores = async ( req = request, res = response ) => {
  const { mapaId } = req.params;

  try {

    
    // Trae todos los indicadores del mapa, incluyendo resultados
    const indicadores = await prisma.indicador.findMany( {
      where: { mapaId: Number( mapaId ) },
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
  const { codigo, nombre, tipoNivel, parentId } = req.body;
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
        codigo,
        nombre,
        tipoNivel,
        parentId: parentId ? Number( parentId ) : null
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