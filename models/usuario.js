import { z } from 'zod';

// Define un esquema para validar los datos del usuario
const usuarioSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  edad: z.number().positive({ message: "La edad debe ser un número positivo" }).optional(),
  correo: z.string().email({ message: "El correo electrónico no es válido" }),
});

// Define una clase Usuario
class Usuario {
  constructor(nombre, edad, correo) {
    this.nombre = nombre;
    this.edad = edad;
    this.correo = correo;
  }

  // Método para validar los datos del usuario
  validar() {
    try {
      usuarioSchema.parse(this);
      return { success: true };
    } catch (error) {
      return { success: false, errores: error.errors };
    }
  }
}

module.exports = Usuario;