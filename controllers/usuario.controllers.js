const { PrismaClient } = require( '@prisma/client' );
const { request, response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );
const { ms } = require( 'zod/locales' );

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
            id: Number( mapaId )
          }
        }
      },
      omit: {
        password: true
      },
      include: {
        rol: true,
        mapas: true
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
const editarUsuario = async ( req = request, res = response ) => {

  const { id } = req.params;
  const { nombre, apellidoPaterno, apellidoMaterno, correo, password, rol } = req.body;

  try {
    // verificar si el usuario existe
    const usuarioExistente = await prisma.usuario.findUnique( {
      where: { 
        id: Number( id ) ,
        estado: true
      }
    } );
    if ( !usuarioExistente ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'El usuario no existe'
      } );
    }

    //ecriptar la contraseña si se proporciona una nueva
    let passwordEncript;
    if ( password ) {
      // Aquí deberías agregar la lógica para encriptar la contraseña
      // Por ejemplo, usando bcrypt:
      const salt = bcryptjs.genSaltSync();
      passwordEncript = bcryptjs.hashSync( password, salt );
    }

    const usuario = await prisma.usuario.update( {
      where: { id },
      data: {
        nombre: nombre || usuarioExistente.nombre,
        apellidoPaterno: apellidoPaterno || usuarioExistente.apellidoPaterno,
        apellidoMaterno: apellidoMaterno || usuarioExistente.apellidoMaterno,
        correo: correo || usuarioExistente.correo,
        password: passwordEncript || usuarioExistente.password
      }
    });

    // si el rol ha cambiado, actualizar la relación
    if ( rol && rol !== usuarioExistente.rol ) {
      await prisma.usuario.update( {
        where: { id },
        data: {
          rol: {
            connect: { id: rol }
          }
        }
      });
    }
    
    res.json( {
      ok: true,
      msg: 'Usuario actualizado',
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
const registrarUsuarios = async ( req = request, res = response ) => {

  const { mapaId } = req.params;

  const { nombre, apellidoPaterno, apellidoMaterno, correo, password, rol } = req.body;

  try {
    const usuarioExistente = await prisma.usuario.findUnique( {
      where: { 
        correo,
        estado: true
      }
    } );
    if ( usuarioExistente ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'El usuario ya existe'
      } );
    }
    const salt = bcryptjs.genSaltSync();
    const passwordEncript = bcryptjs.hashSync( password, salt );

    const nuevoUsuario = await prisma.usuario.create( {
      data: {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        password: passwordEncript,
        rol
      }
    } );
    res.status( 201 ).json( {
      ok: true,
      msg: 'Usuario registrado',
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
  editarUsuario,
  registrarUsuarios,
  eliminarUsuarios
};