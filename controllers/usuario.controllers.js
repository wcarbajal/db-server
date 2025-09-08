const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );

const prisma = new PrismaClient();


const getUsuarios = async ( req = request, res = response ) => {

  const { mapaId } = req.params;

  try {
    // buscar los usuarios que tengan asignado n-mapas

    const usuarios = await prisma.usuario.findMany( {
      where: {
        estado: true,
        mapas: {
          some: {
            id: Number(mapaId)
          }
        }
      },
      omit: {
        password: true
      },
      include:{
        
        rol: true
      }
    } );


    // verificar que hayan usuarios
    if ( !usuarios || usuarios.length === 0 ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'No se encontraron usuarios'
      } );
    }

    res.json( {
      ok: true,
      usuarios
    } );
    
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al obtener los usuarios'
    } );
  }
};
const updateUsuarios = async ( req = request, res = response ) => {

  const { id } = req.params;
  const { nombre, correo, password, rol } = req.body;

  try {
    const usuario = await prisma.usuario.update( {
      where: { id },
      data: {
        nombre,
        correo,
        password,
        rol
      }
    } );
    res.json( {
      ok: true,
      usuario
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al actualizar el usuario'
    } );
  }
};
const registerUsuarios = async ( req = request, res = response ) => {

  const { nombre, correo, password, rol } = req.body; 
  try {
    const usuarioExistente = await prisma.usuario.findUnique( {
      where: { correo }
    } );
    if ( usuarioExistente ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'El usuario ya existe'
      } );
    }
    const nuevoUsuario = await prisma.usuario.create( {
      data: {
        nombre,
        correo,
        password,
        rol
      }
    } );
    res.status( 201 ).json( {
      ok: true,
      usuario: nuevoUsuario
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al registrar el usuario'
    } );
  }
};

const eliminarUsuarios = async ( req = request, res = response ) => {
  const { id } = req.params;

  try {
    const usuario = await prisma.usuario.delete( {
      where: { id }
    } );
    res.json( {
      ok: true,
      usuario
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error al eliminar el usuario'
    } );
  }
};

module.exports = {
  getUsuarios,
  updateUsuarios,
  registerUsuarios,
  eliminarUsuarios
};