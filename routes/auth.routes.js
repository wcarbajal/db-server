const { Router } = require( 'express' );
const {  crearUsuario, login, renovarToken } = require( '../controllers/auth.controllers' );
const {  check } = require( 'express-validator' );

const { PrismaClient } = require( '@prisma/client' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { validarJWT } = require( '../middlewares/validar-jwt' );


const router = Router();
const  prisma  = new PrismaClient();


router.post( '/',[
  check( 'correo', 'El correo es obligatorio' ).isEmail(),
  check( 'password', 'El password es obligatorio' ).not().isEmpty(),
  validarCampos
] , login );



router.post( '/registrar', [
  check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
  check( 'password', 'El password es obligatorio' ).isLength( { min: 6, max: 15 } ),  
  check( 'correo', 'El correo no es valido' ).isEmail(),
  /* check( 'rol', 'No es un rol permitido' ).isIn(['ADMIN_ROLE', 'USER_ROLE']), */
  check('rol').custom( async ( rol = '')  => {
    const exiteRol = await prisma.roles.findFirst({
      where: {
        rol
      }
    })

    if (!exiteRol) {
      throw new Error ('EL rol no esta registrado en la base de datos Z')
    }
  }),
  validarCampos
], crearUsuario );

router.get( '/renovar', validarJWT, renovarToken );


module.exports = router;