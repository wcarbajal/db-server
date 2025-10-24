const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );
const path = require( 'path' );

const prisma = new PrismaClient();

const getResultados = async ( req = request, res = response ) => {
 
};
const updateResultado = async ( req = request, res = response ) => {
  const { resultadoId } = req.params;
  const { body } = req;

  try {
    //verificar si el resultado existe
    const resultadoExistente = await prisma.resultado.findUnique({
      where: { id: Number( resultadoId ) }
    });
    if ( !resultadoExistente ) {
      return res.status(404).json({
        ok: false,
        msg: 'Resultado no encontrado'
      });
    }
    const resultado = await prisma.resultado.update({
      where: { id: Number( resultadoId ) },
      data: body
    });

    res.json({
      ok: true,
      resultado
    });
  } catch (error) {
    console.error( "Error al actualizar resultado:", error );
    res.status(500).json({
      ok: false,
      msg: 'Error al actualizar resultado'
    });
  }
};
const createResultado = async ( req = request, res = response ) => {

  
  const { body } = req;

  try {

//verificar si el indicador existe
    const indicador = await prisma.indicador.findUnique({
      where: { id: Number( body.indicadorId ) }
    });

    if ( !indicador ) {
      return res.status(404).json({
        ok: false,
        msg: 'Indicador no encontrado'
      });
    }

    const resultado = await prisma.resultado.create({
      data: body
    });

    res.json({
      ok: true,
      resultado
    });
  } catch (error) {
    console.error( "Error al crear resultado:", error );
    res.status(500).json({
      ok: false,
      msg: 'Error al crear resultado'
    });
  }
};

const deleteResultado = async ( req = request, res = response ) => {
  const { resultadoId } = req.params;
  try {
    //verificar si el resultado existe
    const resultadoExistente = await prisma.resultado.findUnique({
      where: { id: Number( resultadoId ) }
    });
    if ( !resultadoExistente ) {
      return res.status(404).json({
        ok: false,
        msg: 'Resultado no encontrado'
      });
    }

    await prisma.resultado.delete({
      where: { id: Number( resultadoId ) }
    });

    res.json({
      ok: true,
      msg: 'Resultado eliminado correctamente'
    });
  } catch (error) {
    console.error( "Error al eliminar resultado:", error );
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar resultado'
    });
  }
};

module.exports = {
  getResultados,
  updateResultado,
  createResultado,
  deleteResultado
};
  