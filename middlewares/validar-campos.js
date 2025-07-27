
const { response, request } = require( 'express' );
const { validationResult } = require( 'express-validator' );

const validarCampos = ( req, res, next) => {

  const errors = validationResult( req );
  if ( !errors.isEmpty() ) {
    return res.status( 400 ).json( errors );
  }

  next()


};

const validarArchivo = (req = request, res = response, next) => {

  console.log("request", req);
  if (!req.file || !req.file.diagrama) {
    return res.status(400).json({
      ok: false,
      msg: "Debe adjuntar un archivo de diagrama"
    });
  }
  // Validar tipo de archivo (ejemplo: solo imágenes)
  const archivo = req.files.diagrama;
  if (!archivo.mimetype.startsWith("image/")) {
    return res.status(400).json({
      ok: false,
      msg: "El archivo debe ser una imagen"
    });
  }
  // Puedes agregar más validaciones aquí (tamaño, extensión, etc.)
  next();
};


module.exports = {
  validarCampos,
  validarArchivo
};