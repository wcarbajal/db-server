const { request, response } = require( 'express' );
const { PrismaClient } = require( '@prisma/client' );
const prisma = new PrismaClient();
const bcrytpjs = require( 'bcryptjs' );
const { generarjwt } = require( '../helpers/jwt' );

const login = async ( req, res = response ) => {

  const { correo, password } = req.body;

  try {

    const usuarioDB = await prisma.usuario.findFirst( {
      where: {
        correo
      }
    } );
    if ( !usuarioDB ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: "Usuario / Password no son correctos - correo"
      } );
    }
    //validar password
    const validPassword = bcrytpjs.compareSync( password, usuarioDB.password );
    if ( !validPassword ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: "Usuario / Password no son correctos - password"
      } );
    }
    const { password: _password, ...usuario } = usuarioDB;

    const token = await generarjwt( usuarioDB.id );

    res.json( {
      ok: true,
      usuario,
      token: token
    } );


  } catch ( error ) {
    console.log( error );
    return res.status( 500 ).json( {
      ok: false,
      msg: "Hable con el administrador"
    } );

  }

};

const usuariosPut = ( req, res ) => {
  res.json( {
    msg: "put Api - Controlador"
  } );
};

const crearUsuario = async ( req = request, res ) => {

  const { nombre, correo, password, img, rol } = req.body;

  // verificar si el correo existe

  const isUser = await prisma.usuario.findMany( {
    where: {
      correo
    }
  } );

  if ( isUser.length > 0 ) {
    return res.status( 409 ).json( {
      msg: "post Api - Controlador- correo registrado",
    } );
  }

  const rolId = await prisma.roles.findFirst( {
    where: {
      rol
    }
  } );

  //encriptar la contrasena
  const salt = bcrytpjs.genSaltSync();
  const contraseña = bcrytpjs.hashSync( password, salt );


  const usuario = await prisma.usuario.create( {
    data: {
      nombre,
      correo,
      password: contraseña,
      img,
      rolesId: rolId.id
    }
  } );
  const { password: _password, ...restUsuario } = usuario;

  const token = await generarjwt( usuario.id );

  res.status( 200 ).json( {
    msg: "post Api - Controlador",
    restUsuario,
    token
  } );


};
//fin post

const usuariosDelete = ( req, res ) => {
  res.json( {
    msg: "delete Api - Controlador"
  } );
};
const usuariosPatch = ( req, res ) => {
  res.json( {
    msg: "patch Ap - Controlador"
  } );
};

module.exports = {
  login,
  crearUsuario,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};