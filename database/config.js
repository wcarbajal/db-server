const Prisma = require( '@prisma/client' );
const { PrismaClient } = require('@prisma/client');


const conectionDB = async () => {
  try {
     const prisma = new PrismaClient();
     console.log('Conectado a base de datos')
  } catch (error) {
    console.log(error)
    throw new Error('Error al conectar a la base de datos')
  }
}

module.exports = conectionDB