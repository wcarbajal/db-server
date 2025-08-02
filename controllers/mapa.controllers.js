const fs = require( 'fs/promises' );
const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );


const prisma = new PrismaClient();

const listaMapa = async ( req = request, res = response ) => {

  const mapa = await prisma.mapa.findMany({})

  if ( !mapa || mapa.length === 0 ) {
    return res.status(404).json({
      ok: false,
      msg: 'No se encontraron mapas'
    });
  }

  res.json({
    ok: true,
    msg: 'Lista de mapas',
    mapa
  });
}

const registrarMapa = async ( req = request, res = response ) => {

  const { ruc, nombre, entrada, salida } = req.body;

 try {
  // Validar que el mapa no exista
  const mapaExistente = await prisma.mapa.findFirst({
    where: {
      OR: [
        { ruc },
        { nombre }
      ]
    }

  });

  if ( mapaExistente ) {
    return res.status(400).json({
      ok: false,
      msg: 'El mapa ya existe,  nombre o RUC duplicados',
      nombre: mapaExistente.nombre,
      ruc: mapaExistente.ruc
    });
  }

  const mapa = await prisma.mapa.create({
    data: {
      nombre,
      entrada,
      salida
    }
  });

  res.json({
    ok: true,
    msg: 'Mapa registrado',
    mapa
  });
  
 } catch (error) {
    console.error( "Error al registrar el mapa:", error );
    return res.status(500).json({
      ok: false,
      msg: 'Error al registrar el mapa'
    });
  }
  
 }



    


module.exports = {
  listaMapa,
  registrarMapa
}