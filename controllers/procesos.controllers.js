const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );

const prisma = new PrismaClient();


const listaProcesos = async ( req = request, res = response ) => {


  const procesos = await prisma.proceso.findMany();


  if ( !procesos || procesos.length === 0 ) {
    return res.status( 404 ).json( {
      ok: false,
      msg: 'No se encontraron procesos'
    } );
  }
  res.json( {
    ok: true,
    msg: 'Lista de procesos',
    procesos
  } );
};

const registrarProceso = async ( req = request, res = response ) => {

  const { codigo, nombre, descripcion, parentId } = req.body;

  try {
    // Verificar si el código ya existe
    const existeCodigo = await prisma.proceso.findUnique( {
      where: { codigo }
    } );
    // Si el código ya existe, retornar un error
    if ( existeCodigo ) {
      return res.status( 400 ).json( {  
        ok: false,
        msg: 'El código ya se encuentra registrado'
      } );
    }

    const nuevoProceso = await prisma.proceso.create( {
      data: {
        codigo,
        nombre,
        descripcion, 
        parentId: parentId ? Number( parentId ) : null
      }
    } );
    res.status( 201 ).json( {
      ok: true,
      msg: 'Proceso registrado',
      nuevoProceso
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar el proceso'
    } );
  }
};

const actualizarProceso = async ( req = request, res = response ) => {
  const { id } = req.params;
  const { codigo, nombre, descripcion, parentId } = req.body;

  try {
    // Verificar si el proceso existe
    const procesoExistente = await prisma.proceso.findUnique( {
      where: { id: Number( id ) }
    } );

    if ( !procesoExistente ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Proceso no encontrado'
      } );
    }
    const procesoActualizado = await prisma.proceso.update( {
      where: { id: Number( id ) },
      data: {
        codigo,
        nombre: nombre ? nombre : procesoExistente.nombre,
        descripcion: descripcion ? descripcion : procesoExistente.descripcion,
        parentId: parentId ? parentId : procesoExistente.parentId
      }
    } );
    res.json( {
      ok: true,
      msg: 'Proceso actualizado',
      procesoActualizado
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al actualizar el proceso'
    } );
  }
};

const eliminarProceso = async ( req = request, res = response ) => {
  const { id } = req.params;

  try {
   const procesoEliminado = await prisma.proceso.delete( {
      where: { id: Number( id ) }
    } );
    if ( !procesoEliminado ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Proceso no encontrado'
      } );
    }
    res.json( {
      ok: true,
      msg: 'Proceso eliminado'
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al eliminar el proceso'
    } );
  }
};


module.exports = {
  listaProcesos,
  registrarProceso,
  actualizarProceso,
  eliminarProceso
};