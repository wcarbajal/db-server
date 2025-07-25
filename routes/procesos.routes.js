const { Router } = require( 'express' );
const {  check } = require( 'express-validator' );



const { listaProcesos, actualizarProceso, eliminarProceso, registrarProceso, detalleProceso } = require( '../controllers/procesos.controllers' );
const { validarCampos } = require( '../middlewares/validar-campos' );


const router = Router();

router.get( '/', [

  validarCampos
], listaProcesos );

router.get( '/detalle/:id', [

  validarCampos
], detalleProceso );


router.post( '/registrar', [
  check( 'codigo', 'El código es obligatorio' ).not().isEmpty(),
  check( 'codigo', 'El código debe tener entre 2 y 30 caracteres' ).isLength( { min: 2, max: 30 } ),
  check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
  check( 'nombre', 'El nombre debe tener entre 5 y 100 caracteres' ).isLength( { min: 5, max: 100 } ),
  check( 'descripcion', 'La descripción es opcional' ).optional().isLength( { max: 500 } ),
  check( 'parentId', 'El parentId debe ser un número entero si se proporciona' ).optional().isInt(),
  validarCampos
], registrarProceso );

router.put( '/:id', [
  check( 'id', 'El ID del proceso es obligatorio' ).not().isEmpty(),
  check( 'id', 'El ID debe ser un número entero' ).isInt(),
  check( 'codigo', 'El código es obligatorio' ).optional().not().isEmpty(),
  check( 'codigo', 'El código debe tener entre 2 y 30 caracteres' ).optional().isLength( { min: 2, max: 30 } ),
  check( 'nombre', 'El nombre es obligatorio' ).optional().not().isEmpty(),
  check( 'nombre', 'El nombre debe tener entre 5 y 100 caracteres' ).optional().isLength( { min: 5, max: 100 } ),
  check( 'descripcion', 'La descripción es opcional' ).optional().isLength( { max: 500 } ),
  check( 'parentId', 'El parentId debe ser un número entero si se proporciona' ).optional().isInt(),
  validarCampos
], actualizarProceso );
//eliminar un proceso
router.delete( '/:id', [
  check( 'id', 'El ID del proceso es obligatorio' ).not().isEmpty(),
  check( 'id', 'El ID debe ser un número entero' ).isInt(),
  validarCampos
], eliminarProceso );

//

module.exports = router;
