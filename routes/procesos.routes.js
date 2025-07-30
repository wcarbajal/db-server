const { Router } = require( 'express' );
const {  check } = require( 'express-validator' );
const fileUpload = require('express-fileupload');



const { listaProcesos, actualizarProceso, eliminarProceso, registrarProceso, detalleProceso, listaProcesosNivel0, actualizarDiagrama, listaOwners, actualizarDescripcionProceso } = require( '../controllers/procesos.controllers' );
const { validarCampos, validarArchivo } = require( '../middlewares/validar-campos' );


const router = Router();

router.get( '/', [

  validarCampos
], listaProcesos );

router.get( '/nivel0', [

  validarCampos
], listaProcesosNivel0 );

router.post( '/actualizar-diagrama/:id', [ 
  fileUpload(),
  validarCampos
], actualizarDiagrama );

router.get( '/detalle/:id', [

  validarCampos
], detalleProceso );

router.get( '/owners', [

  validarCampos
], listaOwners );

/* fetchConToken(`procesos/actualizar-diagrama/${procesoId}`, formData, "POST"); */

router.post( '/registrar', [
  check( 'codigo', 'El código es obligatorio' ).not().isEmpty(),
  check( 'codigo', 'El código debe tener entre 2 y 30 caracteres' ).isLength( { min: 2, max: 30 } ),
  check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
  check( 'nombre', 'El nombre debe tener entre 5 y 100 caracteres' ).isLength( { min: 5, max: 100 } ),
  check( 'descripcion', 'La descripción es opcional' ).optional().isLength( { max: 500 } ),
  check( 'parentId', 'El parentId debe ser un número entero si se proporciona' ).optional().isInt(),
  validarCampos
], registrarProceso );


//actualizar un proceos en modo admin
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

//actualizar un proceos en mo
router.put( '/descripcion/:id', [ 
  check( 'descripcion', 'La descripción es opcional' ).optional().isLength( { max: 500 } ),
  check( 'parentId', 'El parentId debe ser un número entero si se proporciona' ).optional().isInt(),
  check( 'tipo', 'El tipo de proceso es obligatorio' ).optional().not().isEmpty(),
  check( 'tipo', 'El tipo de proceso debe ser Misional, Soporte o Estratégico' ).optional().isIn( [ "Misional", "Soporte", "Estratégico" ] ),
  check( 'nivel', 'El nivel es obligatorio' ).optional().not().isEmpty(),
  check( 'nivel', 'El nivel debe ser un número entre 0 y 9' ).optional().isIn( [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ] ),
  check( 'objetivo', 'El objetivo es obligatorio' ).optional().not().isEmpty(),
  check( 'objetivo', 'El objetivo debe tener al menos 5 caracteres' ).optional().isLength( { min: 5 } ),
  check( 'estrategico', 'Los objetivos estratégicos son obligatorios' ).optional().not().isEmpty(),
  check( 'estrategico', 'Los objetivos estratégicos deben tener al menos 5 caracteres' ).optional().isLength( { min: 5 } ),
  check( 'alcance', 'El alcance es obligatorio' ).optional().not().isEmpty(),
  check( 'alcance', 'El alcance debe tener al menos 5 caracteres' ).optional().isLength( { min: 5 } ),
  check( 'owners', 'Los owners son obligatorios' ).optional().isArray(),
  validarCampos
], actualizarDescripcionProceso );

//eliminar un proceso
router.delete( '/:id', [
  check( 'id', 'El ID del proceso es obligatorio' ).not().isEmpty(),
  check( 'id', 'El ID debe ser un número entero' ).isInt(),
  validarCampos
], eliminarProceso );

//

module.exports = router;
