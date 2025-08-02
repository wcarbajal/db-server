const { Router } = require( 'express' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { listaMapa } = require( '../controllers/mapa.controllers' );

const router = Router();

router.get( '/', [
  validarCampos
] , listaMapa )


module.exports = router;