const { PrismaClient } = require( '@prisma/client' );
const prisma = new PrismaClient();
const bcryptjs = require( 'bcryptjs' );


async function main() {
  // Crear roles
  await prisma.roles.createMany( {
    data: [
      { rol: 'ADMIN' },
      { rol: 'USER' }
    ],
    skipDuplicates: true
  } );

  // Crear procesos
  await prisma.proceso.createMany( {
    data: [
      
      { codigo: "S1", nombre: "Gestión de recursos humanos", tipo: "Estratégico", nivel: 0, descripcion: "Gestión de recursos humanos", parentId: null, estado: true },
      { codigo: "S1.1", nombre: "Organización del trabajo", tipo: "Estratégico", nivel: 1, descripcion: "Organización del trabajo", parentId: 1, estado: true },
      { codigo: "S1.1.1", nombre: "Diseño de puestos", tipo: "Estratégico", nivel: 2, descripcion: "Diseño de puestos", parentId: 2, estado: true },
      { codigo: "S1.1.1.1", nombre: "Formulación del Manual de Perfil de Puestos", tipo: "Estratégico", nivel: 3, descripcion: "Formulación del Manual de Perfil de Puestos", parentId: 3, estado: true },
      { codigo: "S1.1.1.2", nombre: "Formulacion de perfiles de puestos no contenidos en el MPP", tipo: "Estratégico", nivel: 3, descripcion: "Formulacion de perfiles de puestos no contenidos en el MPP", parentId: 3, estado: true },
      { codigo: "S1.1.2", nombre: "Administración de puestos", tipo: "Estratégico", nivel: 2, descripcion: "Administración de puestos", parentId: 2, estado: true },
      { codigo: "S1.1.2.1", nombre: "Elaborar y aprobar el CPE", tipo: "Estratégico", nivel: 3, descripcion: "Elaborar y aprobar el CPE", parentId: 6, estado: true },
      { codigo: "S1.1.2.2", nombre: "Actualizar el CPE", tipo: "Estratégico", nivel: 3, descripcion: "Actualizar el CPE", parentId: 6, estado: true },
      { codigo: "S1.2", nombre: "Incorporación y administración del personal", tipo: "Estratégico", nivel: 1, descripcion: "Incorporación y administración del personal", parentId: 1, estado: true },
      { codigo: "S1.2.1", nombre: "Gestión de la incorporación", tipo: "Estratégico", nivel: 2, descripcion: "Gestión de la incorporación", parentId: 9, estado: true },
      { codigo: "S1.2.1.1", nombre: "Seleccionar al personal", tipo: "Estratégico", nivel: 3, descripcion: "Seleccionar al personal", parentId: 10, estado: true },
      { codigo: "S1.2.1.2", nombre: "Vincular al personal", tipo: "Estratégico", nivel: 3, descripcion: "Vincular al personal", parentId: 10, estado: true },
      { codigo: "S1.2.1.3", nombre: "Inducción al personal", tipo: "Estratégico", nivel: 3, descripcion: "Inducción al personal", parentId: 10, estado: true },
      { codigo: "S1.2.2", nombre: "Administración de personas", tipo: "Estratégico", nivel: 2, descripcion: "Administración de personas", parentId: 9, estado: true },
      { codigo: "S1.2.2.1", nombre: "Administración de legajos", tipo: "Estratégico", nivel: 3, descripcion: "Administración de legajos", parentId: 14, estado: true },
      { codigo: "S1.2.2.1.1", nombre: "Apertura y Registro de Legajos", tipo: "Estratégico", nivel: 4, descripcion: "Apertura y Registro de Legajos", parentId: 15, estado: true },
      { codigo: "S1.2.2.1.2", nombre: "Solicitud de copias", tipo: "Estratégico", nivel: 4, descripcion: "Solicitud de copias", parentId: 15, estado: true },
      { codigo: "S1.2.2.1.3", nombre: "Atención de prestamo", tipo: "Estratégico", nivel: 4, descripcion: "Atención de prestamo", parentId: 15, estado: true },
      { codigo: "S1.2.2.1.4", nombre: "Atención de solicitud de entrega de documentos originales", tipo: "Estratégico", nivel: 4, descripcion: "Atención de solicitud de entrega de documentos originales", parentId: 15, estado: true },
      { codigo: "S1.2.2.1.5", nombre: "Transferencias de Legajos (Cese)", tipo: "Estratégico", nivel: 4, descripcion: "Transferencias de Legajos (Cese)", parentId: 15, estado: true },
      { codigo: "S1.2.2.2", nombre: "Control de asistencia", tipo: "Estratégico", nivel: 3, descripcion: "Control de asistencia", parentId: 14, estado: true },
      { codigo: "S1.2.2.3", nombre: "Gestión de vacaciones y licencias", tipo: "Estratégico", nivel: 3, descripcion: "Gestión de vacaciones y licencias", parentId: 14, estado: true },
      { codigo: "S1.2.2.4", nombre: "Desplazamientos", tipo: "Estratégico", nivel: 3, descripcion: "Desplazamientos", parentId: 14, estado: true },
      { codigo: "S1.2.2.3.1", nombre: "Designación o encargatura de personal + ddjj de intereses", tipo: "Estratégico", nivel: 4, descripcion: "Designación o encargatura de personal + ddjj de intereses", parentId: 23, estado: true },
      { codigo: "S1.2.2.3.2", nombre: "Rotación de personal", tipo: "Estratégico", nivel: 4, descripcion: "Rotación de personal", parentId: 23, estado: true },
      { codigo: "S1.2.2.5", nombre: "Gestionar el teletrabajo", tipo: "Estratégico", nivel: 3, descripcion: "Gestionar el teletrabajo", parentId: 14, estado: true },
      { codigo: "S1.2.2.6", nombre: "Gestión de los Procesos disciplinarios", tipo: "Estratégico", nivel: 3, descripcion: "Gestión de los Procesos disciplinarios", parentId: 14, estado: true },
      { codigo: "S1.2.2.6.1", nombre: "Atender denuncias presentadas contra servidores del PRONABEC", tipo: "Estratégico", nivel: 4, descripcion: "Atender denuncias presentadas contra servidores del PRONABEC", parentId: 27, estado: true },
      { codigo: "S1.2.2.6.2", nombre: "Realizar el proceso disciplinario contra servidores del PRONABEC", tipo: "Estratégico", nivel: 4, descripcion: "Realizar el proceso disciplinario contra servidores del PRONABEC", parentId: 27, estado: true },
      { codigo: "S1.2.2.7", nombre: "Desvinculación (Entrega de cargo)+ sol. Documentos", tipo: "Estratégico", nivel: 3, descripcion: "Desvinculación (Entrega de cargo)+ sol. Documentos", parentId: 14, estado: true },
      { codigo: "S1.2.2.7.1", nombre: "Entrega de cargo", tipo: "Estratégico", nivel: 4, descripcion: "Entrega de cargo", parentId: 30, estado: true },
      { codigo: "S1.2.2.7.2", nombre: "Atención de entrega de documentos", tipo: "Estratégico", nivel: 4, descripcion: "Atención de entrega de documentos", parentId: 30, estado: true },
      { codigo: "S1.3", nombre: "Gestión del talento", tipo: "Estratégico", nivel: 1, descripcion: "Gestión del talento", parentId: 1, estado: true },
      { codigo: "S1.3.1", nombre: "Gestión del desarrollo y capacitación", tipo: "Estratégico", nivel: 2, descripcion: "Gestión del desarrollo y capacitación", parentId: 33, estado: true },
      { codigo: "S1.3.1.1", nombre: "Planificación de la capacitación", tipo: "Estratégico", nivel: 3, descripcion: "Planificación de la capacitación", parentId: 34, estado: true },
      { codigo: "S1.3.1.1.1", nombre: "Conformacion de Comité de Planificación de la capacitación", tipo: "Estratégico", nivel: 4, descripcion: "Conformacion de Comité de Planificación de la capacitación", parentId: 35, estado: true },
      { codigo: "S1.3.1.1.2", nombre: "Definir PDP + mod.", tipo: "Estratégico", nivel: 4, descripcion: "Definir PDP + mod.", parentId: 35, estado: true },
      { codigo: "S1.3.1.2", nombre: "Ejecucion de la capacitación", tipo: "Estratégico", nivel: 3, descripcion: "Ejecucion de la capacitación", parentId: 34, estado: true },
      { codigo: "S1.3.1.2.1", nombre: "Elaborar expediente de capacitación", tipo: "Estratégico", nivel: 4, descripcion: "Elaborar expediente de capacitación", parentId: 38, estado: true },
      { codigo: "S1.3.1.2.2", nombre: "Ejecutar la capacitación", tipo: "Estratégico", nivel: 4, descripcion: "Ejecutar la capacitación", parentId: 38, estado: true },
      { codigo: "S1.3.1.2.3", nombre: "Modificar el PDP", tipo: "Estratégico", nivel: 4, descripcion: "Modificar el PDP", parentId: 38, estado: true },
      { codigo: "S1.3.1.3", nombre: "Evaluación de la capacitación", tipo: "Estratégico", nivel: 3, descripcion: "Evaluación de la capacitación", parentId: 34, estado: true },
      { codigo: "S1.3.2", nombre: "Gestión del rendimiento", tipo: "Estratégico", nivel: 2, descripcion: "Gestión del rendimiento", parentId: 33, estado: true },
      { codigo: "S1.3.2.1", nombre: "Planificar la gestión del rendimiento", tipo: "Estratégico", nivel: 3, descripcion: "Planificar la gestión del rendimiento", parentId: 43, estado: true },
      { codigo: "S1.3.2.2", nombre: "Seguimiento al cumplimiento de metas", tipo: "Estratégico", nivel: 3, descripcion: "Seguimiento al cumplimiento de metas", parentId: 43, estado: true },
      { codigo: "S1.3.2.3", nombre: "Evaluación al cumplimiento de metas", tipo: "Estratégico", nivel: 3, descripcion: "Evaluación al cumplimiento de metas", parentId: 43, estado: true },
      { codigo: "S1.4", nombre: "Gestión de compensaciones", tipo: "Estratégico", nivel: 1, descripcion: "Gestión de compensaciones", parentId: 1, estado: true },
      { codigo: "S1.4.1", nombre: "Elaborar planillas de pago", tipo: "Estratégico", nivel: 2, descripcion: "Elaborar planillas de pago", parentId: 47, estado: true },
      { codigo: "S1.4.2", nombre: "Liquidación de beneficios sociales", tipo: "Estratégico", nivel: 2, descripcion: "Liquidación de beneficios sociales", parentId: 47, estado: true },
      { codigo: "S1.5", nombre: "Gestión de relaciones humanas y sociales", tipo: "Estratégico", nivel: 1, descripcion: "Gestión de relaciones humanas y sociales", parentId: 1, estado: true },
      { codigo: "S1.5.1", nombre: "Relaciones laborales individuales y colectivas", tipo: "Estratégico", nivel: 2, descripcion: "Relaciones laborales individuales y colectivas", parentId: 50, estado: true },
      { codigo: "S1.5.1.1", nombre: "Resolución de conflictos", tipo: "Estratégico", nivel: 3, descripcion: "Resolución de conflictos", parentId: 51, estado: true },
      { codigo: "S1.5.1.2", nombre: "Atención de pliego de reclamos y convenios colectivos", tipo: "Estratégico", nivel: 3, descripcion: "Atención de pliego de reclamos y convenios colectivos", parentId: 51, estado: true },
      { codigo: "S1.5.2", nombre: "Gestionar la seguridad y salud en el trabajo", tipo: "Estratégico", nivel: 2, descripcion: "Gestionar la seguridad y salud en el trabajo", parentId: 50, estado: true },
      { codigo: "S1.5.2.1", nombre: "Definir plan y programas de SST", tipo: "Estratégico", nivel: 3, descripcion: "Definir plan y programas de SST", parentId: 54, estado: true },
      { codigo: "S1.5.2.2", nombre: "Gestión de incidentes y diagnostico del SST", tipo: "Estratégico", nivel: 3, descripcion: "Gestión de incidentes y diagnostico del SST", parentId: 54, estado: true },
      { codigo: "S1.5.3", nombre: "Gestionar el bienestar social", tipo: "Estratégico", nivel: 2, descripcion: "Gestionar el bienestar social", parentId: 50, estado: true },
      { codigo: "S1.5.3.1", nombre: "Elaborar Plan de Bienestar Social", tipo: "Estratégico", nivel: 3, descripcion: "Elaborar Plan de Bienestar Social", parentId: 58, estado: true },
      { codigo: "S1.5.3.2", nombre: "Atención de descanso médico", tipo: "Estratégico", nivel: 3, descripcion: "Atención de descanso médico", parentId: 58, estado: true },
      { codigo: "S1.5.3.3", nombre: "Atención de trámite por maternidad", tipo: "Estratégico", nivel: 3, descripcion: "Atención de trámite por maternidad", parentId: 58, estado: true },
      { codigo: "S1.5.3.4", nombre: "Atención del registro de derechohabientes", tipo: "Estratégico", nivel: 3, descripcion: "Atención del registro de derechohabientes", parentId: 58, estado: true },
      { codigo: "S1.5.4", nombre: "Gestionar la cultura y clima laboral", tipo: "Estratégico", nivel: 2, descripcion: "Gestionar la cultura y clima laboral", parentId: 50, estado: true },
      { codigo: "S1.5.4.1", nombre: "Planificar la gestión de clima organizacional", tipo: "Estratégico", nivel: 3, descripcion: "Planificar la gestión de clima organizacional", parentId: 62, estado: true },
      { codigo: "S1.5.4.2", nombre: "Intervención de la gestión de clima organizacional", tipo: "Estratégico", nivel: 3, descripcion: "Intervención de la gestión de clima organizacional", parentId: 62, estado: true },
      { codigo: "S1.5.4.3", nombre: "Realizar la medición de clima organizacional", tipo: "Estratégico", nivel: 3, descripcion: "Realizar la medición de clima organizacional", parentId: 62, estado: true },
      { codigo: "S1.5.5", nombre: "Comunicación interna", tipo: "Estratégico", nivel: 2, descripcion: "Comunicación interna", parentId: 50, estado: true },
      { codigo: "S1.5.5.1", nombre: "Definicion del plan de comunicación interna", tipo: "Estratégico", nivel: 3, descripcion: "Definicion del plan de comunicación interna", parentId: 66, estado: true },
      { codigo: "S1.5.5.2", nombre: "Ejecución del plan de comunicación interna", tipo: "Estratégico", nivel: 3, descripcion: "Ejecución del plan de comunicación interna", parentId: 66, estado: true },


    ],
    skipDuplicates: true
  } );

  // Obtener el rol ADMIN


  // Crear usuario admin
  const passwordHash = bcryptjs.hashSync( '123456', 10 );

  await prisma.usuario.create( {
    data: {
      nombre: 'Administrador',
      correo: 'admin@demo.com',
      password: passwordHash,
      rolesId: 1,
      estado: true,
      google: false,
      online: false
    }
  } );
}

main()
  .then( () => {
    console.log( 'Datos iniciales insertados correctamente.' );
    return prisma.$disconnect();
  } )
  .catch( e => {
    console.error( e );
    return prisma.$disconnect();
  } );