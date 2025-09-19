const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const {
  getIndicadores,
  crearIndicador,
  modificarIndicador,
  getIndicador,
  eliminarIndicador
} = require( '../controllers/indicador.controllers' );

/* 
  this.indicadorPath = '/api/indicador';
   */

const route = Router();


route.get( '/:mapaId', [
  validarCampos
], getIndicadores );

route.get( '/unico/:Id', [
  validarCampos
], getIndicador );

route.put( '/:id', [
  validarCampos
], modificarIndicador );

route.delete( '/:id', [
  check( 'id', 'El id del indicador es obligatorio' ).not().isEmpty(),
  check( 'id', 'El id del indicador debe ser un número' ).isNumeric(),
  validarCampos
], eliminarIndicador );

route.post( '/:mapaId', [
  validarCampos
], crearIndicador );

module.exports = route;