const fs = require( 'fs/promises' );
const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );
const path = require( 'path' );

const prisma = new PrismaClient();


const listaProcesos = async ( req = request, res = response ) => {
  const { idMapa } = req.params;


  const procesos = await prisma.mapa.findMany( {
    where: {
      estado: true,
      id: Number( idMapa )
    },
    select: {
      procesos: {
        where: {
          estado: true
        },
        orderBy: {
          nivel: 'asc'
        }
      }
    }

  } );


  if ( !procesos || procesos.length === 0 || !procesos[ 0 ].procesos || procesos[ 0 ].procesos.length === 0 ) {
    return res.status( 404 ).json( {
      ok: false,
      msg: 'No se encontraron procesos',
      procesos: []
    } );
  }
  res.json( {
    ok: true,
    msg: 'Lista de procesos',
    procesos: procesos[ 0 ].procesos
  } );
};


const registrarProceso = async ( req = request, res = response ) => {

  const { idMapa } = req.params;

  const { codigo, tipo, nivel, nombre, descripcion, parentId } = req.body;

  try {
    // Verificar si el código ya existe

    const existeCodigo = await prisma.mapa.findUnique( {
      where: { id: Number( idMapa ) },
      select: {
        procesos: {
          where: {
            codigo,
            estado: true
          }
        }
      }
    } );
    // Si el código ya existe, retornar un error
    if ( existeCodigo && existeCodigo.procesos.length > 0 ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'El código ya se encuentra registrado',
        proceso: []
      } );
    }

    const data = {
      codigo,
      nombre,
      tipo,
      nivel: +nivel,
      descripcion,
      mapa: {
        connect: { id: Number( idMapa ) }
      }
    };

    if ( parentId ) {
      data.parent = {
        connect: { id: Number( parentId ) }
      };
    }

    const nuevoProceso = await prisma.proceso.create( { data } );

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

  const { codigo, tipo, nivel, nombre, descripcion, parentId, owners, objetivo, estrategico, alcance } = req.body;


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
        actividades: true,
        diagrama: true,
        ficha: true,
        indicadores: true,
        hijos: true,
        owners: true,
        responsables: true,
        parent: true
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
    const fullUrl = req.protocol + '://' + req.get( 'host' ) + url;

    console.log( "fullUrl", fullUrl );


    await prisma.proceso.update( {
      where: { id: Number( id ) },
      data: {
        diagrama: {
          upsert: {
            create: {
              url: fullUrl
            },
            update: {
              url: fullUrl
            }
          }
        }
      }
    } );

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



const actualizarDescripcionProceso = async ( req = request, res = response ) => {
  const { id } = req.params;
  const { descripcion, tipo, nivel, objetivo, estrategico, alcance, owners } = req.body;

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
        descripcion: descripcion ?? procesoExistente.descripcion,
        tipo: tipo ?? procesoExistente.tipo,
        nivel: nivel ? +nivel : procesoExistente.nivel,
        objetivo: objetivo ?? procesoExistente.objetivo,
        estrategico: estrategico ?? procesoExistente.estrategico,
        alcance: alcance ?? procesoExistente.alcance,
        owners: {
          set: owners.map( owner => ( { id: Number( owner ) } ) )
        }
      }
    } );

    res.json( {
      ok: true,
      msg: 'Descripción del proceso actualizada',
      procesoActualizado
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al actualizar la descripción del proceso'
    } );
  }
};

const registrarProcedimientoProceso = async ( req = request, res = response ) => {

  const { id } = req.params;
  // TODO: ingreo de datos.
  const { iddetalleproceso, idprocedimiento, actividades } = req.body;
  console.log( iddetalleproceso, idprocedimiento, actividades );


  try {
    // Verificar si el proceso existe
    const procesoExistente = await prisma.proceso.findUnique( {
      where: { id: Number( id ) },
      include: {
        detalleProceso: {
          include: {
            procedimientoRelacion: true
          }
        }
      }

    } );

    if ( !procesoExistente ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Proceso no encontrado'
      } );
    }

    if ( !iddetalleproceso ) {
      // Si no existe detalleProceso, crearlo
      await prisma.proceso.update( {
        where: { id: Number( id ) },
        data: {
          detalleProceso: {
            create: {}
          }
        }
      } );
      // guardar el procedimiento
      await prisma.detalleProceso.update( {
        where: { id: Number( procesoExistente.detalleProceso.id ) },
        data: {
          procedimientoRelacion: {
            create: {
              actividades
            }
          }
        }
      } );

      return res.json( {
        ok: true,
        msg: 'Procedimiento registrado correctamente',
        procedimiento: {
          idprocedimiento,
          actividades
        }
      } );
    }


    //verificar si el procedimiento existe
    if ( !idprocedimiento ) {
      // Si no existe, crearlo

      await prisma.detalleProceso.update( {
        where: { id: Number( procesoExistente.detalleProceso.id ) },
        data: {
          procedimientoRelacion: {
            create: {
              actividades: {
                create: actividades
              }
            }
          }
        }
      } );

      return res.json( {
        ok: true,
        msg: 'Procedimiento creado correctamente',
        procedimiento: {
          idprocedimiento: idprocedimiento,
          actividades
        }
      } );
    }

    //guardar el procedimiento
    await prisma.procedimiento.update( {
      where: { id: Number( idprocedimiento ) },
      data: {
        actividades
      }
    } );

    res.json( {
      ok: true,
      msg: 'Procedimiento registrado correctamente',
      procedimiento: {
        idprocedimiento,
        actividades
      }
    } );


  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar las actividades del procedimiento'
    } );
  }
};





const registrarIndicadorProceso = async ( req = request, res = response ) => {
  const { id } = req.params;
  const { iddetalleproceso, idindicador } = req.body;

  try {
    // Verificar si el proceso existe
    const procesoExistente = await prisma.proceso.findUnique( {
      where: { id: Number( id ) },
      include: {
        detalleProceso: {
          include: {
            indicadoresList: true
          }
        }
      }
    } );

    if ( !procesoExistente ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Proceso no encontrado'
      } );
    }

    // si detalleProceso no existe, crearlo

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar el indicador del proceso'
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
  actualizarDescripcionProceso,
  registrarProcedimientoProceso,
  registrarIndicadorProceso,
};



