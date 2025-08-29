const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { getInputOutputById, byIdRegistrarInputOutput } = require( '../controllers/ficha.controllers' );


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



router.post( '/:id/registrar-io', [ 
  validarCampos
], byIdRegistrarInputOutput );

module.exports = router;
