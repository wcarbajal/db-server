const { Router } = require( 'express' );
const {  check } = require( 'express-validator' );


const { listaOwners, registrarOwner, eliminarOwner, actualizarOwner } = require( '../controllers/owners.controllers' );
const { validarCampos } = require( '../middlewares/validar-campos' );


const router = Router();


router.get( '/', [

  validarCampos
], listaOwners );

router.post( '/registrar', [
 check( 'oficina', 'La oficina es obligatoria' ).not().isEmpty(),
 check( 'siglas', 'Las siglas son obligatorias' ).not().isEmpty(),
 check( 'director', 'El director es obligatorio' ).not().isEmpty(),
 check( 'correo', 'El correo es obligatorio' ).isEmail().optional(),
  validarCampos
], registrarOwner );

router.put( '/eliminar/:id', [
 check( 'oficina', 'La oficina es obligatoria' ).not().isEmpty().optional(),
 check( 'siglas', 'Las siglas son obligatorias' ).not().isEmpty().optional(),
 check( 'director', 'El director es obligatorio' ).not().isEmpty().optional(),
 check( 'correo', 'El correo es obligatorio' ).isEmail().optional(),
  validarCampos
], eliminarOwner );

router.put( '/actualizar/:id', [
  
  validarCampos
], actualizarOwner );

module.exports = router;
