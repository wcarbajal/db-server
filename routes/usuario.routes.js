const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const {
  getUsuarios,
  editarUsuario,
  registrarUsuarios,
  eliminarUsuarios,

} = require( '../controllers/usuario.controllers' );

/* 
 this.usuarioPath = '/api/usuario';
  */

const route = Router();

route.get( '/:mapaId', [
  validarCampos,
], getUsuarios );

route.put( '/:id', [
  validarCampos
], editarUsuario );

route.post( '/:mapaId', [
  check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
  check( 'correo', 'El correo es obligatorio' ).isEmail(),
  check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
  check( 'rol', 'El rol es obligatorio' ).not().isEmpty(),
  validarCampos
], registrarUsuarios );

route.delete( '/:id', [
  check( 'id', 'El ID debe ser válido' ).isMongoId(),
  validarCampos
], eliminarUsuarios );



module.exports = route;