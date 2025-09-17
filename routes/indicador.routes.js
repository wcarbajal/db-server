const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { 
  getIndicadores,
  crearIndicador
 } = require( '../controllers/indicador.controllers' );

/* 
  this.indicadorPath = '/api/indicador';
   */

const route = Router();


route.get( '/:mapaId', [
  validarCampos
], getIndicadores );

route.post( '/:mapaId', [
  validarCampos
], crearIndicador );

module.exports = route;