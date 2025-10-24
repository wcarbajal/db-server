const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const {
  getResultados,
  updateResultado,
  createResultado,
  deleteResultado
} = require( '../controllers/resultados.controllers' );

/* 
  this.indicadorPath = '/api/resultado';
   */

const route = Router();


route.get( '/:indicadorId/', [
  validarCampos
], getResultados );

route.put( '/:resultadoId/', [
  validarCampos
], updateResultado );

route.post( '/', [
  validarCampos
], createResultado );

route.delete( '/:resultadoId/', [
  validarCampos
], deleteResultado );



module.exports = route;