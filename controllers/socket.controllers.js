const { PrismaClient } = require( '@prisma/client' );
const prisma = new PrismaClient();
 
 const usuarioConectado = async( id )  => {
  

  const usuarioDB = await prisma.usuario.findUnique({
    where: { id: id }
  })
  if (!usuarioDB) { throw new Error('Usuario no encontrado'); }
  
  await prisma.usuario.update({
    where: { id: id },
    data: { online: true }
  })
  const { password: _password, ...usuario } = usuarioDB;

return usuario;

}

 const usuarioDesconectado = async( id )  => {
  

  const usuarioDB = await prisma.usuario.findUnique({
    where: { id: id }
  })
  if (!usuarioDB) { throw new Error('Usuario no encontrado'); }
  
  await prisma.usuario.update({
    where: { id: id },
    data: { online: false }
  })
  const { password: _password, ...usuario } = usuarioDB;
  
  

return usuario;

}



module.exports = {
  usuarioConectado,
  usuarioDesconectado
}