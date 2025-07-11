const { Router } = require( 'express' );
const {  usuariosPut,  usuariosDelete, usuariosPatch, crearUsuario, login } = require( '../controllers/auth.controllers' );
const { body, check } = require( 'express-validator' );
const { validarCampos } = require( '../controllers/middlewares/validar-campos' );
const { PrismaClient } = require( '@prisma/client' );


const router = Router();
const  prisma  = new PrismaClient();


router.post( '/',[
  check( 'correo', 'El correo es obligatorio' ).isEmail(),
  check( 'password', 'El password es obligatorio' ).not().isEmpty(),
  validarCampos
] , login );

router.put( '/', usuariosPut );

router.post( '/nuevo', [
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
      throw new Error ('EL rol no esta registrado en la base de datos')
    }
  }),
  validarCampos
], crearUsuario );

router.delete( '/', usuariosDelete );

router.patch( '/', usuariosPatch );

module.exports = router;