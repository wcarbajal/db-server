const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { getRoles } = require( '../controllers/rol.controllers' );


/* 
this.rolPath = '/api/rol';
*/

const route = Router();


route.get( '/', [
  validarCampos,
], getRoles );

module.exports = route;