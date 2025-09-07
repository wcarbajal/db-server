  const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const {
  getUnidadesOperativas,
  updateUnidadesOperativas,
  registerUnidadesOperativas,
  eliminarUnidadesOperativas
} = require( '../controllers/unidadOperativa.controllers' );


/* 
this.unidadOperativaPath = '/api/unidad-operativa';
*/

const router = Router();

router.get( '/:mapaId', [ 
  validarCampos,
], getUnidadesOperativas );

router.put( '/:id', [

  validarCampos,
], updateUnidadesOperativas );

router.post( '/', [

  validarCampos,
], registerUnidadesOperativas );

router.put( '/eliminar/:id', [

  validarCampos,
], eliminarUnidadesOperativas );


module.exports = router;
