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
  const fichaId = Number( id );
  
    
  const { inputOutput } = req.body;

  try {

    const ficha = await prisma.ficha.findUnique( { 
      where: { id: fichaId }
     } );

    if ( !ficha ) {
      return res.status( 404 ).json( { ok: false, msg: 'Ficha no encontrada' } );
    }
    // 1. Obtener todos los registros actuales de la ficha
    const existentes = await prisma.inputOutput.findMany( {
      where: { fichaId: Number( fichaId ) },
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
            fichaId,
            entrada: item.entrada,
            salida: item.salida,
            cliente: item.cliente,
            proveedor: item.proveedor,
          },
        } );
      } else {

        await prisma.inputOutput.create( {
          data: {
            fichaId,
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
      where: { fichaId: Number( fichaId ) },
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

const getRiesgosByIdFicha = async ( req = request, res = response ) => {

  const { id } = req.params;

  try {
    const riesgos = await prisma.riesgo.findMany( {
      where: { fichaId: Number( id ) },
    } );

    if ( !riesgos ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Ficha no encontrada'
      } );
    }

    res.json( {
      ok: true,
      riesgos
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al obtener Riesgos'
    } );
  }
};

const byIdFichaRegistrarRiesgos = async ( req = request, res = response ) => {

  const { id } = req.params;
  const fichaId = Number( id );
  const { riesgos } = req.body;

  try {

    const ficha = await prisma.ficha.findUnique( { where: { id: fichaId } } );

    if ( !ficha ) {
      return res.status( 404 ).json( { ok: false, msg: 'Ficha no encontrada' } );
    }

    // 1. Obtener todos los registros actuales de la ficha
    const existentes = await prisma.riesgo.findMany( {
      where: { fichaId: Number( fichaId ) },
    } );

    // 2. Crear un Set de proveedores recibidos para fácil comparación
    const riesgosRecibidos = new Set( riesgos.map( item => item.id ) );

    // 3. Eliminar los que ya no están en el array recibido
    const aEliminar = existentes.filter(
      item => !riesgosRecibidos.has( item.id )
    );
    for ( const item of aEliminar ) {
      await prisma.riesgo.delete( { where: { id: item.id } } );
    }

    // 4. Procesar cada item recibido: actualizar si existe, crear si no
    for ( const item of riesgos ) {
      const existente = existentes.find(
        dbItem => dbItem.id === item.id
      );
      if ( existente ) {
        await prisma.riesgo.update( {
          where: { id: existente.id },
          data: {
            fichaId,
            denominacion: item.denominacion,
          },
        } );
      } else {

        await prisma.riesgo.create( {
          data: {
            fichaId,
            denominacion: item.denominacion,
          },
        } );
      }
    }

    // 5. Obtener el estado final actualizado
    const result = await prisma.riesgo.findMany( {
      where: { fichaId: Number( fichaId ) },
    } );

    res.json( {
      ok: true,
      msg: 'Riesgos registrados correctamente',
      result,
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar Riesgos',
    } );
  }
};

const byIdFichaRegistrarRegistros = async ( req = request, res = response ) => {

  const { id } = req.params;
  const fichaId = Number( id );
  const { registros } = req.body;

  try {

    const ficha = await prisma.ficha.findUnique( { where: { id: fichaId } } );

    if ( !ficha ) {
      return res.status( 404 ).json( { ok: false, msg: 'Ficha no encontrada' } );
    }

    // 1. Obtener todos los registros actuales de la ficha
    const existentes = await prisma.registro.findMany( {
      where: { fichaId: Number( fichaId ) },
    } );

    // 2. Crear un Set de registros recibidos para fácil comparación
    const registrosRecibidos = new Set( registros.map( item => item.id ) );

    // 3. Eliminar los que ya no están en el array recibido
    const aEliminar = existentes.filter(
      item => !registrosRecibidos.has( item.id )
    );
    for ( const item of aEliminar ) {
      await prisma.registro.delete( { where: { id: item.id } } );
    }

    // 4. Procesar cada item recibido: actualizar si existe, crear si no
    for ( const item of registros ) {
      const existente = existentes.find(
        dbItem => dbItem.id === item.id
      );
      if ( existente ) {
        await prisma.registro.update( {
          where: { id: existente.id },
          data: {
            fichaId,
            denominacion: item.denominacion,
            tipoRegistro: item.tipoRegistro
          },
        } );
      } else {

        await prisma.registro.create( {
          data: {
            fichaId,
            denominacion: item.denominacion,
            tipoRegistro: item.tipoRegistro
          },
        } );
      }
    }

    // 5. Obtener el estado final actualizado
    const result = await prisma.riesgo.findMany( {
      where: { fichaId: Number( fichaId ) },
    } );

    res.json( {
      ok: true,
      msg: 'Registros registrados correctamente',
      result,
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar Riesgos',
    } );
  }
};

const getRegistrosByIdFicha = async ( req = request, res = response ) => {

  const { id } = req.params;

  try {
    const registros = await prisma.registro.findMany( {
      where: { fichaId: Number( id ) },
    } );

    if ( !registros ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Ficha no encontrada'
      } );
    }

    res.json( {
      ok: true,
      registros
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al obtener Riesgos'
    } );
  }
};


module.exports = {
  getInputOutputById,
  byIdRegistrarInputOutput,
  getRiesgosByIdFicha,
  byIdFichaRegistrarRiesgos,
  getRegistrosByIdFicha,
  byIdFichaRegistrarRegistros
};
