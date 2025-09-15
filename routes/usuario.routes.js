const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const {
  getUsuarios,
  editarUsuario,
  registrarUsuarios,
  eliminarUsuario,

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
  validarCampos
], registrarUsuarios );

route.delete( '/:id', [
  
  validarCampos
], eliminarUsuario );



module.exports = route;