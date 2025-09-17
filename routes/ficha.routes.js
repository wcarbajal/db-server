const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );

const { getInputOutputById,
  byIdRegistrarInputOutput,
  getRiesgosByIdFicha,
  byIdFichaRegistrarRiesgos,
  getRegistrosByIdFicha,
  byIdFichaRegistrarRegistros
 } = require( '../controllers/ficha.controllers' );


const router = Router();

router.get( '/', ( req, res ) => {
  res.json( {
    ok: true,
    msg: 'GET Ficha'
  } );
} );

router.get( '/:id/input-output', [  
  validarCampos
], getInputOutputById );

router.get( '/:id/riesgos', [  
  validarCampos
], getRiesgosByIdFicha );

router.get( '/:id/registros', [  
  validarCampos
], getRegistrosByIdFicha );

router.post( '/:id/registrar-io', [ 
  validarCampos
], byIdRegistrarInputOutput );

router.post( '/:id/registrar-riesgos', [ 
  validarCampos
], byIdFichaRegistrarRiesgos );

router.post( '/:id/registrar-registros', [ 
  validarCampos
], byIdFichaRegistrarRegistros );

module.exports = router;
