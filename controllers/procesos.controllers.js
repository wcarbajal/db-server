const fs = require( 'fs/promises' );
const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );
const path = require( 'path' );
const e = require( 'express' );
const { version } = require( 'os' );

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
        },
        include: {
          ficha: true,
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

  const {
    codigo,
    descripcion,
    nivel,
    nombre,
    parentId,
    tipo
  } = req.body;

  try {
    // Verificar si el código ya existe

    const existeProceso = await prisma.proceso.findFirst( {
      where: {
        AND: [
          { codigo },
          { estado: true },
          { mapaId: Number( idMapa ) }
        ]
      }
    } );
    if ( existeProceso ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'El proceso ya se encuentra registrado',
        proceso: existeProceso
      } );
    }

     const data = {
       codigo,
       nombre,
       tipo,
       nivel: +nivel,
       descripcion,
       version: 1,
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

  const {
    codigo,
    descripcion,
    idMapa,
    nivel,
    nombre,
    parentId,
    tipo,
    owners,
    objetivo,
    estrategico,
    alcance } = req.body;


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

// TODO: registrar actividades

const registrarActividadesProceso = async ( req = request, res = response ) => {

  const { id } = req.params;
  const { actividades } = req.body;

  console.log( "Actividades recibidas:", actividades );

  try {
    // Verificar si el proceso existe
    const procesoExistente = await prisma.proceso.findUnique( {
      where: { id: Number( id ) },

    } );

    if ( !procesoExistente ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Proceso no encontrado'
      } );
    }
    console.log( "el proceso existe" );

    let maxNumOrden = await prisma.actividad.aggregate( {
      where: { procesoId: Number( id ) },
      _max: { numOrden: true }
    } );

    console.log( { maxNumOrden } );

    let siguienteNumOrden = ( maxNumOrden._max.numOrden ?? 0 ) + 1;

    console.log( "siguienteNumOrden", siguienteNumOrden );

    //todo: del array de actividades que recibo, debo actualizar las actividades que existan y las que no existen, se deben de crear
    const actividadesActualizadas = await Promise.all(
      actividades.map( async ( actividad ) => {
        if ( actividad.id ) {
          // Actualizar actividad existente
          return await prisma.actividad.update( {
            where: { id: Number( actividad.id ) },
            data: {
              nombre: actividad.nombre,
              descripcion: actividad.descripcion,
              unidadOperativa: actividad.unidadOperativa,
              numOrden: actividad.numOrden,
              responsable: actividad.responsable
            }
          } );
        } else {

          const numOrdenAsignado = actividad.numOrden ?? siguienteNumOrden++;

          // Crear nueva actividad
          return await prisma.actividad.create( {
            data: {
              nombre: actividad.nombre,
              descripcion: actividad.descripcion,
              unidadOperativa: actividad.unidadOperativa,
              responsable: actividad.responsable,
              numOrden: numOrdenAsignado, // Asignar un número de orden si no se proporciona            
              procesoId: Number( id )
            }
          } );
        }
      } ) );

    console.log( "Actividades actualizadas:", actividadesActualizadas );

    res.json( {
      ok: true,
      msg: 'Actividades del proceso actualizadas',
      actividadesActualizadas
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar el indicador del proceso'
    } );
  }
};

const registrarInputOutput = async ( req = request, res = response ) => {

  const { id } = req.params;
  const { inputOutput } = req.body;

  try {
    // Verificar si el proceso existe
    const procesoExistente = await prisma.proceso.findUnique( {
      where: { id: Number( id ) },
    } );

    if ( !procesoExistente ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Proceso no encontrado'
      } );
    }

    //verificar si ya tiene una fichaa creada, sino crearlo

    let fichaId;

    const fichaExistente = await prisma.ficha.findUnique( {
      where: { procesoId: Number( id ) }
    } );

    if ( !fichaExistente ) {
      // Crear ficha si no existe
      const fichaCreada = await prisma.ficha.create( {
        data: {
          procesoId: Number( id ),
        }
      } );
      fichaId = fichaCreada.id;
    } else {
      fichaId = fichaExistente.id;
    }

    // Registrar inputOutput que llega como una array
    const nuevosInputOutput = await Promise.all(
      inputOutput.map( async ( io ) => {
        return await prisma.inputOutput.create( {
          data: {
            fichaId: Number( fichaId ),
            entradas: io.entrada,
            salidas: io.salida,
            proveedores: io.proveedores,
            clientes: io.clientes,

          }
        } );
      } )
    );

    res.json( {
      ok: true,
      msg: 'Input/Output registrado',
      nuevosInputOutput
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar el Input/Output del proceso'
    } );
  }
};


const registrarFichaProceso = async ( req = request, res = response ) => {

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

    if ( procesoExistente.ficha ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'El proceso ya tiene una ficha registrada',
        ficha: procesoExistente.ficha
      } );
    }

    // Crear ficha para el proceso
    const fichaCreada = await prisma.ficha.create( {
      data: {
        procesoId: Number( id )
      }
    } );

    res.json( {
      ok: true,
      msg: 'Ficha del proceso registrada',
      ficha: fichaCreada
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar la ficha del proceso'
    } );
  }
};

const obtenerImagenDiagrama64 = async ( req = request, res = response ) => {

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


    const imagenDiagrama = await prisma.diagrama.findUnique( {
      where: { procesoId: Number( id ) },

    } );

    if ( !imagenDiagrama ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Diagrama no encontrado'
      } );
    }
    // Obtener la imagen del diagrama en base64
    const imagePath = path.join( __dirname, `../public/diagrama-${ procesoExistente.codigo }.png` );

    const image = await fs.readFile( imagePath );

    const base64 = Buffer.from( image ).toString( 'base64' );


    res.json( {
      ok: true,
      msg: 'Diagrama obtenido',
      base64: `data:image/png;base64,${ base64 }`
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al obtener la imagen del diagrama'
    } );
  }
};

const registrarDiagramaProceso = async ( req = request, res = response ) => {
  const { id } = req.params;
  const { xml } = req.body;



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

    // verificar si existe el xml
    const diagramaExistente = await prisma.diagrama.findUnique( {
      where: { procesoId: Number( id ) }
    } );

    let xmlRegistro;

    if ( !diagramaExistente ) {
      xmlRegistro = await prisma.diagrama.create( {
        data: {
          procesoId: Number( id ),
          xml,
          url: 'no definido',
        }
      } );
    } else {
      xmlRegistro = await prisma.diagrama.update( {
        where: { procesoId: Number( id ) },
        data: {
          xml,
          url: 'no definido',
        }
      } );
    }

    res.json( {
      ok: true,
      msg: 'Diagrama del proceso registrado',
      diagrama: xmlRegistro.xml
    } );

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar el diagrama del proceso'
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
  registrarIndicadorProceso,
  registrarActividadesProceso,
  registrarInputOutput,
  registrarFichaProceso,
  obtenerImagenDiagrama64,
  registrarDiagramaProceso

}

