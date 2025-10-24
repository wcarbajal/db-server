const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const {
  getIndicadores,


} = require( '../controllers/resultados.controllers' );

/* 
  this.indicadorPath = '/api/indicador';
   */

const route = Router();


route.get( '/:indicadorId/', [
  validarCampos
], getResultados );



module.exports = route;