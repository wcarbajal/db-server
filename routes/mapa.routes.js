const { Router } = require( 'express' );
const {  check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { 
  listarMapa, 
  listarProcesos, 
  registrarMapa, 
  eliminarMapa, 
  actualizarMapa, 
  listarProcesosNivelCero, 
  infoCantidades,
  obtenerDataChart
} = require( '../controllers/mapa.controllers' );


const router = Router();

router.get( '/', [
  validarCampos
], listarMapa );

router.get( '/:id/primer-nivel', [
  validarCampos
], listarProcesosNivelCero );

router.get( '/:id/procesos-lista', [
  validarCampos
], listarProcesos );

router.get( '/cantidades', [  
  validarCampos
], infoCantidades );  

router.post( '/registrar', [
  check( 'ruc', 'RUC es obligatorio' ).isString().notEmpty(),
  check( 'ruc', 'RUC debe tener 11 caracteres' ).isLength( { min: 11, max: 11 } ),
  check( 'nombre', 'Nombre es obligatorio' ).isString().notEmpty(),
  check( 'nombre', 'Nombre debe tener entre 5 y 100 caracteres' ).isLength( { min: 5, max: 100 } ),
  check( 'entrada', 'Entrada es obligatorio' ).isString().notEmpty(),
  check( 'entrada', 'Entrada debe tener entre 5 y 500 caracteres' ).isLength( { min: 5, max: 500 } ),
  check( 'salida', 'Salida es obligatorio' ).isString().notEmpty(),
  check( 'salida', 'Salida debe tener entre 5 y 500 caracteres' ).isLength( { min: 5, max: 500 } ),
  check( 'descripcion', 'Descripción debe tener entre 5 y 500 caracteres' ).isLength( { min: 5, max: 500 } ).optional(),
  validarCampos
], registrarMapa );

router.put( '/actualizar/:id', [
  check( 'ruc', 'RUC es obligatorio' ).isString().notEmpty(),
  check( 'ruc', 'RUC debe tener 11 caracteres' ).isLength( { min: 11, max: 11 } ),
  check( 'nombre', 'Nombre es obligatorio' ).isString().notEmpty(),
  check( 'nombre', 'Nombre debe tener entre 5 y 100 caracteres' ).isLength( { min: 5, max: 100 } ),
  check( 'entrada', 'Entrada es obligatorio' ).isString().notEmpty(),
  check( 'entrada', 'Entrada debe tener entre 5 y 500 caracteres' ).isLength( { min: 5, max: 500 } ),
  check( 'salida', 'Salida es obligatorio' ).isString().notEmpty(),
  check( 'salida', 'Salida debe tener entre 5 y 500 caracteres' ).isLength( { min: 5, max: 500 } ),
  validarCampos
], actualizarMapa );

router.delete( '/eliminar/:id', [
  validarCampos
], eliminarMapa );

router.get( '/:id/data-chart', [
  validarCampos
], obtenerDataChart );

module.exports = router;