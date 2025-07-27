const fs = require( 'fs/promises' );
const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );
const path = require( 'path' );

const prisma = new PrismaClient();


const listaProcesos = async ( req = request, res = response ) => {


  const procesos = await prisma.proceso.findMany( {
    where: {
      estado: true
    }
  } );


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

const listaProcesosNivel0 = async ( req = request, res = response ) => {


  const procesos = await prisma.proceso.findMany( {
    where: {
      estado: true,
      nivel: 0
    }
  } );


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

  const { codigo, tipo, nivel, nombre, descripcion, parentId } = req.body;

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
        tipo,
        nivel: +nivel,
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
  const { codigo, tipo, nivel, nombre, descripcion, parentId } = req.body;


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
    let parentIdValue = procesoExistente.parentId;
    if ( typeof parentId !== "undefined" && parentId !== "" ) {
      if ( !/^\d+$/.test( parentId ) ) {
        return res.status( 400 ).json( {
          ok: false,
          msg: 'El parentId debe ser un número entero si se proporciona'
        } );
      }
      parentIdValue = Number( parentId );
    }

    const procesoActualizado = await prisma.proceso.update( {
      where: { id: Number( id ) },
      data: {
        codigo: codigo ?? procesoExistente.codigo,
        nombre: nombre ?? procesoExistente.nombre,
        descripcion: descripcion ?? procesoExistente.descripcion,
        tipo: tipo ?? procesoExistente.tipo,
        nivel: nivel ? +nivel : procesoExistente.nivel,
        parentId: parentIdValue
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

    const procesoEliminado = await prisma.proceso.update( {
      where: { id: Number( id ) },
      data: {
        estado: false,
        codigo: procesoExistente.codigo + " (Eliminado)" + new Date().toISOString(),
      }
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


const detalleProceso = async ( req = request, res = response ) => {
  const { id } = req.params;
  try {
    const proceso = await prisma.proceso.findUnique( {
      where: { id: Number( id ) },
      include: {
        dueños: true,
        hijos: true,
        parent: true,
        responsables: true,
        detalleProceso: {
          include: {
            diagramaRelacion: true,
            fichaRelacion: true,
            procedimientoRelacion: true,
            indicadoresList: true
          }
        },
      }
    } );

    if ( !proceso ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Proceso no encontrado'
      } );
    }

    res.json( {
      ok: true,
      msg: 'Detalle del proceso',
      proceso
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al obtener el detalle del proceso'
    } );
  }
};


const actualizarDiagrama = async ( req = request, res = response ) => {
  const { id } = req.params;

  const file = req.files?.diagrama;

  if ( !file ) return res.status( 400 ).json( { ok: false, msg: 'No se subió archivo 400' } );
  console.log( "file", file );

  try {

    // Verificar si el proceso existe
    const procesoExistente = await prisma.proceso.findUnique( {
      where: { id: Number( id ) }
    } );

    console.log( "procesoExistente", procesoExistente );

    if ( !procesoExistente ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Proceso no encontrado'
      } );
    }

    //uploadPath debe apuntar a la carpeta public

    const uploadPath = path.join( __dirname, '../public', `diagrama-${ procesoExistente.codigo }.png` );
    console.log( "uploadPath", uploadPath );
    await file.mv( uploadPath );

    const url = `/diagrama-${ procesoExistente.codigo }.png`;
    const fullUrl = req.protocol + '://' + req.get('host') + url;

    console.log("fullUrl", fullUrl)


    if ( procesoExistente.detalleProcesoId !== null ) {

      await prisma.proceso.update( {
        where: { id: Number( id ) },
        data: {
          detalleProceso: {
            update: {
              diagramaRelacion: {
                update: {
                  url: fullUrl
                }
              }
            }
          }
        }
      } );
    } else {
      await prisma.proceso.update( {
        where: { id: Number( id ) },
        data: {
          detalleProceso: {
            create: {
              diagramaRelacion: {
                create: {
                  url: fullUrl
                }
              }
            }
          }
        }
      } );
    }


    res.json( {
      ok: true,
      msg: 'Diagrama actualizado correctamente',
      url: fullUrl

    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al actualizar el diagrama'
    } );
  }
};

module.exports = {
  listaProcesos,
  registrarProceso,
  actualizarProceso,
  eliminarProceso,
  actualizarDiagrama,
  detalleProceso,
  listaProcesosNivel0
};



