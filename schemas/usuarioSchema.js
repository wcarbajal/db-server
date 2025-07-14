const { z } = require('zod');

const loginSchema = z.object({
  
  correo: z.string().email('El correo no es válido'),
  password: z.string().min(1, 'El password es obligatorio'),
  
});

const registerSchema = z.object({
  nombre: z.string( "Obligatorio").min(3, 'El nombre es obligatorio'),
  correo: z.string().email('El correo no es válido'),
  password: z.string().min(6, 'El password es obligatorio'),
  rol: z.enum(['ADMIN', 'USER'], {message: 'El rol debe ser ADMIN o USER'}),
  img: z.string().optional(),
}).refine(data => data.rol === 'ADMIN' || data.rol === 'USER', {
  message: 'El rol debe ser ADMIN o USER',
  
  

});

module.exports = {
  loginSchema,
  registerSchema
};