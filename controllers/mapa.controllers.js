const fs = require( 'fs/promises' );
const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );
const { map } = require( 'zod' );


const prisma = new PrismaClient();

const listarMapa = async ( req = request, res = response ) => {

  const mapas = await prisma.mapa.findMany( {
    where: {
      estado: true
    }
  } );

  if ( !mapas || mapas.length === 0 ) {
    return res.status( 404 ).json( {
      ok: false,
      msg: 'No se encontraron mapas',
      mapa: []
    } );
  }

  res.json( {
    ok: true,
    msg: 'Lista de mapas',
    mapas
  } );
};

const registrarMapa = async ( req = request, res = response ) => {

  const { ruc, nombre, entrada, salida, descripcion } = req.body;

  console.log( "Valores recibidos:", { ruc, nombre, entrada, salida, descripcion } );

  try {
    // Validar que el mapa no exista
    const mapaExistente = await prisma.mapa.findFirst( {
      where: {
        OR: [
          { ruc },
          { nombre }
        ]
      }

    } );

    if ( mapaExistente ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'El mapa ya existe,  nombre o RUC duplicados',
        nombre: mapaExistente.nombre,
        ruc: mapaExistente.ruc
      } );
    }

    const mapa = await prisma.mapa.create( {
      data: {
        ruc: ruc,
        nombre,
        entrada,
        salida,
        descripcion
      }
    } );

    res.json( {
      ok: true,
      msg: 'Mapa registrado',
      mapa
    } );

  } catch ( error ) {
    console.error( "Error al registrar el mapa:", error );
    return res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar el mapa'
    } );
  }

};


const eliminarMapa = async ( req = request, res = response ) => {

  const { id } = req.params;

  try {
    const mapaExistente = await prisma.mapa.findUnique( {
      where: {
        id: parseInt( id )
      }
    } );

    if ( !mapaExistente ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Mapa no encontrado',
        mapa: null
      } );
    }

    const mapa = await prisma.mapa.update( {
      where: {
        id: parseInt( id )
      },
      data: {
        estado: false,
        ruc: mapaExistente.ruc + ' - Eliminado' + new Date().toISOString(),
        nombre: mapaExistente.nombre + ' - Eliminado' + new Date().toISOString(),
      }
    } );

    res.json( {
      ok: true,
      msg: 'Mapa eliminado',
      mapa
    } );

  } catch ( error ) {
    console.error( "Error al eliminar el mapa:", error );
    return res.status( 500 ).json( {
      ok: false,
      msg: 'Error al eliminar el mapa'
    } );
  }

};


const actualizarMapa = async ( req = request, res = response ) => {
  const { id } = req.params;
  const { ruc, nombre, entrada, salida, descripcion } = req.body;

  try {
    const mapaExistente = await prisma.mapa.findUnique( {
      where: {
        id: parseInt( id )
      }
    } );

    if ( !mapaExistente ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Mapa no encontrado',
        mapa: null
      } );
    }

    const mapaDuplicado = await prisma.mapa.findMany( {
      where: {
        NOT: { id: parseInt( id ) },
        OR: [
          { ruc },
          { nombre }
        ]
      }
    } );

    if ( mapaDuplicado.length > 0 ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'El nuevo nombre  o RUC, ya se encuentran registrados',
        nombre: mapaDuplicado.map( m => m.nombre ),
        ruc: mapaDuplicado.map( m => m.ruc )
      } );
    }

    const mapaActualizado = await prisma.mapa.update( {
      where: {
        id: parseInt( id )
      },
      data: {
        ruc,
        nombre,
        entrada,
        salida,
        descripcion: descripcion || ""
      }
    } );

    res.json( {
      ok: true,
      msg: 'Mapa actualizado',
      mapa: mapaActualizado
    } );

  } catch ( error ) {
    console.error( "Error al actualizar el mapa:", error );
    return res.status( 500 ).json( {
      ok: false,
      msg: 'Error al actualizar el mapa'
    } );
  }
};

const listarProcesosNivelCero = async ( req = request, res = response ) => {

  const { id } = req.params;

  try {
    const procesosNivel0 = await prisma.mapa.findMany( {
      where: {
        id: parseInt( id ),
        estado: true
      },
      select: {
        procesos: {
          where: {
            nivel: 0
          }
        }
      }
    } );



    //const procesos = procesosNivel0.length > 0 ? procesosNivel0[0].procesos : [];

    if ( !procesosNivel0 || procesosNivel0.length === 0 ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'No se encontraron procesos de nivel 0'
      } );
    }

    const procesos = procesosNivel0[ 0 ].procesos;

    res.status( 200 ).json( {
      ok: true,
      msg: 'Lista de procesos de nivel 0',
      procesos

    } );

  } catch ( error ) {
    console.error( "Error al listar procesos de nivel 0:", error );
    return res.status( 500 ).json( {
      ok: false,
      msg: 'Error al listar procesos de nivel 0'
    } );
  }
};

const listarProcesos = async ( req = request, res = response ) => {
  const { id } = req.params;

  try {

    const mapa = await prisma.mapa.findMany( {
      where: {
        id: parseInt( id ),
        estado: true
      }
    } );

    if ( !mapa || mapa.length === 0 ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'No se encontró el mapa',
      } );
    }

    const procesosList = await prisma.proceso.findMany( {
      where: {
        mapaId: parseInt( id ),
        estado: true
      }
    } );

    //const procesos = procesosList.length > 0 ? procesosList[0].procesos : [];
    if ( !procesosList || procesosList.length === 0 ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'No se encontraron procesos asociados al mapa',
        procesos: []
      } );
    }
    
    res.status( 200 ).json( {
      ok: true,
      msg: 'Lista de procesos asociados al mapa',
      procesos: procesosList
    } );

  } catch ( error ) {
    console.error( "Error al listar procesos:", error );
    return res.status( 500 ).json( {
      ok: false,
      msg: 'Error al listar procesos'
    } );
  }

};

const infoCantidades = async ( req = request, res = response ) => {
  try {
    const mapasCount = await prisma.mapa.count( {
      where: {
        estado: true
      }
    } );

    const procesosCount = await prisma.proceso.count( {
      where: {
        estado: true
      }
    } );

    const ownersCount = await prisma.owner.count( {
      where: {
        estado: true
      }
    } );

    const usuariosCount = await prisma.usuario.count( {
      where: {
        estado: true
      }
    } );

     const unidadesFuncionalesCount = await prisma.unidadOperativa.count( {
      where: {
        estado: true
      }
    } );

    /*  const reportesCount = await prisma.reporte.count( {
       where: {
         estado: true
       }
     } ); */

    res.json( {
      ok: true,
      msg: 'Cantidades de entidades',
      mapas: mapasCount === null ? 0 : mapasCount,
      procesos: procesosCount === null ? 0 : procesosCount,
      owners: ownersCount === null ? 0 : ownersCount,
      usuarios: usuariosCount === null ? 0 : usuariosCount,
      unidadesFuncionales: unidadesFuncionalesCount === null ? 0 : unidadesFuncionalesCount,
      reportes: 0

    } );

  } catch ( error ) {
    console.error( "Error al obtener cantidades:", error );
    return res.status( 500 ).json( {
      ok: false,
      msg: 'Error al obtener cantidades'
    } );
  }
};

const obtenerDataChart = async ( req = request, res = response ) => {

  const { id } = req.params;

  try {
    // Verificar si el proceso existe
    const procesoExistente = await prisma.proceso.findMany( {
      where: { mapaId: Number( id ) }
    } );

    if ( !procesoExistente || procesoExistente.length === 0 ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Proceso no encontrado'
      } );
    }

    // 1. Procesos por tipo
    const procesosPorTipo = await prisma.proceso.groupBy( {
      where: { estado: true, mapaId: Number( id ) },
      by: [ 'tipo' ],
      _count: { tipo: true },
    } );

    const resumenPorTipo = procesosPorTipo.map( item => ( {
      tipo: item.tipo,
      cantidad: item._count.tipo
    } ) );


    // version con map, pero Promise.all, dao que no se puede usar .map con await dentro de un callback, map no espera las promesas
    /*  const listadoPorTipo = {};
     await Promise.all(
       procesosPorTipo.map( async ( tipoObj ) => {
         const tipo = tipoObj.tipo;
         listadoPorTipo[ tipo ] = await prisma.proceso.findMany( {
           where: { tipo, estado: true },
           select: { id: true, codigo: true, nombre: true, tipo: true }
         } );
       } )
     ); */

    // 2. Procesos por nivel
    const procesosPorNivel = await prisma.proceso.groupBy( {
      where: { estado: true, mapaId: Number( id ) },
      by: [ 'nivel' ],
      _count: { nivel: true },
    } );

    const resumenPorNivel = procesosPorNivel.map( item => ( {
      nivel: item.nivel,
      cantidad: item._count.nivel
    } ) );

    /*  const listadoPorNivel = {};
     for ( const nivelObj of procesosPorNivel ) {
       const nivel = nivelObj.nivel;
       listadoPorNivel[ nivel ] = await prisma.proceso.findMany( {
         where: { nivel, estado: true },
         select: { id: true, codigo: true, nombre: true, nivel: true }
       } );
     } */

    // 3. Procesos por responsables
    const responsables = await prisma.owner.findMany( {
      include: {
        procesos: {
          where: { estado: true, mapaId: Number( id ) },
          select: { id: true, codigo: true, nombre: true }
        }
      }
    } );
    
    const resumenResponsables = responsables.map( r => ( {
      responsable: r.nombre,
      cantidad: r.procesos.length,
      procesos: r.procesos
    } ) );

    // 4. Procesos por owners
    /*  const owners = await prisma.owner.findMany( {
       include: {
         procesos: {
           where: { estado: true },
           select: { id: true, codigo: true, nombre: true }
         }
       }
     } );
 
     const resumenOwners = owners.map( o => ( {
       owner: o.nombre,
       cantidad: o.procesos.length,
       procesos: o.procesos
     } ) ); */

    res.json( {
      ok: true,
      msg: "Resumen de procesos",
      porTipo: resumenPorTipo,
      porNivel: resumenPorNivel,     
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: "Error al obtener el resumen de procesos"
    } );
  }
};

module.exports = {
  listarMapa,
  registrarMapa,
  eliminarMapa,
  actualizarMapa,
  listarProcesosNivelCero,
  listarProcesos,
  infoCantidades,
  obtenerDataChart
};