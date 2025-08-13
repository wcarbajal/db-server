const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );
const path = require( 'path' );

const prisma = new PrismaClient();


const getInputOutputById = async ( req = request, res = response ) => {

  const { id } = req.params;

  try {
    const ioResult = await prisma.inputOutput.findMany( {
      where: { fichaId: Number( id ) },
    } );

    if ( !ioResult ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Ficha no encontrada'
      } );
    }

    res.json( {
      ok: true,
      inputOutput: ioResult
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al obtener Input/Output'
    } );
  }
};


const byIdRegistrarInputOutput = async ( req = request, res = response ) => {

  const { id } = req.params;
  const { inputOutput } = req.body;

  console.log("inicio del registro de Input/Output")

  try {
    // 1. Obtener todos los registros actuales de la ficha
    const existentes = await prisma.inputOutput.findMany( {
      where: { fichaId: Number( id ) },
    } );

    // 2. Crear un Set de proveedores recibidos para fácil comparación
    const proveedoresRecibidos = new Set( inputOutput.map( item => item.id ) );

    // 3. Eliminar los que ya no están en el array recibido
    const aEliminar = existentes.filter(
      item => !proveedoresRecibidos.has( item.id )
    );
    for ( const item of aEliminar ) {
      await prisma.inputOutput.delete( { where: { id: item.id } } );
    }

    // 4. Procesar cada item recibido: actualizar si existe, crear si no
    for ( const item of inputOutput ) {
      const existente = existentes.find(
        dbItem => dbItem.id === item.id
      );
      if ( existente ) {
        await prisma.inputOutput.update( {
          where: { id: existente.id },
          data: {
            entrada: item.entrada,
            salida: item.salida,
            cliente: item.cliente,
            proveedor: item.proveedor,
          },
        } );
      } else {
        await prisma.inputOutput.create( {
          data: {
            fichaId: Number( id ),
            proveedor: item.proveedor,
            entrada: item.entrada,
            salida: item.salida,
            cliente: item.cliente,
          },
        } );
      }
    }

    // 5. Obtener el estado final actualizado
    const result = await prisma.inputOutput.findMany( {
      where: { fichaId: Number( id ) },
    } );

    res.json( {
      ok: true,
      msg: 'Input/Output registrado correctamente',
      result,
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar Input/Output',
    } );
  }
};


module.exports = {
  getInputOutputById,
  byIdRegistrarInputOutput
};
