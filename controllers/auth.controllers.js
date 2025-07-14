const { request, response } = require( 'express' );
const { PrismaClient } = require( '@prisma/client' );
const prisma = new PrismaClient();
const bcrytpjs = require( 'bcryptjs' );
const { generarjwt } = require( '../helpers/jwt' );

const login = async ( req, res = response ) => {

  const { correo, password } = req.body; 
  // Validar datos con Zod
 

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



const crearUsuario = async ( req = request, res ) => {

  const { nombre, correo, password, img, rol } = req.body;

  // verificar si el correo existe

  const isUser = await prisma.usuario.findMany( {
    where: {
      correo
    }
  } );


  if ( isUser.length > 0 ) {
    return res.status( 400 ).json( {
      ok: false,
      msg: "el correo ya se encuentra registrado",
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


  const usuarioDB = await prisma.usuario.create( {
    data: {
      nombre,
      correo,
      password: contraseña,
      img,
      rolesId: rolId.id
    }
  } );
  const { password: _password, ...usuario } = usuarioDB;

  const token = await generarjwt( usuarioDB.id );

  res.status( 200 ).json( {
    ok: true,
    msg: "post Api - Controlador",
    usuario,
    token
  } );


};
//fin post

const renovarToken = async ( req, res ) => {

  const id = req.id;
  // generar un nuevo token
  const token = await generarjwt( id );

  // obtener el usuario por id
  const usuarioDB = await prisma.usuario.findUnique( {
    where: {
      id
    }

  } );

  const { password, ...usuario } = usuarioDB;
  res.json( {
    ok: true,
    msg: "renovar Api - Controlador",
    token,
    usuario
  } );
};




module.exports = {
  login,
  crearUsuario,
  renovarToken,

};