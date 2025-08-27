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
  await prisma.mapa.createMany( {
    data: [
      { nombre: 'PROGRAMA NACIONAL DE BECAS Y CREDITO EDUCATIVO', ruc: '20546798152', descripcion: 'Mapa de procesos del PRONABEC', estado: true, entrada: "Ciudadanos de bajos, insuficientes recursos o alto rendimiento académico con barreras de acceso a la educación superior de calidad ", salida: "Ciudadanos que accedieron a educación superior de calidad y contribuyen en el desarrollo económico y social" },
      { nombre: 'Mapa de Procesos OAJ', ruc: '20123456789', descripcion: 'Mapa de procesos de la Oficina de Asesoría Jurídica', estado: true, entrada: "Entrada 2", salida: "Salida 2" },

    ]
  } );

  // crear dueños
  await prisma.owner.createMany( {
    data: [
      { oficina: "Dirección Ejecutiva", siglas: "DE", director: "Alexandra Ames Brachowicz", correo: "alexandra.ames@pronabec.gob.pe" },
      { oficina: "Oficina de Asesoría Jurídica", siglas: "OAJ", director: "Cesar Paul Hernández Pérez", correo: "cesar.hernandez@pronabec.gob.pe" },
      { oficina: "Oficina de Planeamiento y Presupuesto", siglas: "OPP", director: "Dante Javier Beltrán Arias", correo: "dante.beltran@pronabec.gob.pe" },
      { oficina: "Unidad de Planeamiento", siglas: "UPLAN", director: "Jorge Luis Nicho Cárdenas", correo: "jorge.nicho@pronabec.gob.pe" },
      { oficina: "Unidad de Modernización de la Gestión", siglas: "UMG", director: "Jerzy Alfredo Alarcón Quiroz", correo: "jerzy.alarcon@pronabec.gob.pe" },
      { oficina: "Unidad de Presupuesto", siglas: "UPRE", director: "Mariella Juliana García Zapata", correo: "mariella.garcia@pronabec.gob.pe" },
      { oficina: "Unidad de Estudios Sociales e Investigación", siglas: "UESI", director: "Lucía del Rosario Espezúa Berrios", correo: "espezua.lucia@gmail.com" },
      { oficina: "Oficina de Administración y Finanzas", siglas: "OAF", director: "Erik Enrique Tello Corrales", correo: "erik.tello@pronabec.gob.pe" },
      { oficina: "Unidad de Contabilidad y Control Previo", siglas: "UCCP", director: "María Cecilia Girao Araujo", correo: "Maria.girao@pronabec.gob.pe" },
      { oficina: "Unidad de Tesorería", siglas: "UT", director: "Pilar Milagros Celestino Romani", correo: "pilar.celestino@pronabec.gob.pe" },
      { oficina: "Unidad de Abastecimiento", siglas: "UA", director: "Robert Paul Andrade Olivera", correo: "robert.andrade@pronabec.gob.pe" },
      { oficina: "Unidad de Subvenciones y Financiamiento", siglas: "USF", director: "Pegui Paloma Guillen Ramirez", correo: "pegui.guillen@pronabec.gob.pe" },
      { oficina: "Oficina de Comunicaciones y Relaciones Institucionales", siglas: "OCRI", director: "Raul Castro Pereyra", correo: "raul.castro@pronabec.gob.pe" },
      { oficina: "Oficina de Gestión de Recursos Humanos", siglas: "OGRH", director: "Carlos Fernando Dulanto Paniagua", correo: "carlos.dulanto@pronabec.gob.pe" },
      { oficina: "Oficina de Atención a la Ciudadanía y Gestión Documental", siglas: "OAGD", director: "Maricarmen Benites Avalo", correo: "maricarmen.benites@pronabec.gob.pe" },
      { oficina: "Oficina de Tecnologías de la Información", siglas: "OTI", director: "Andy Erick Arellano Chicana", correo: "andy.arellano@pronabec.gob.pe" },
      { oficina: "Dirección de Gestión de Becas", siglas: "DIBEC", director: "Ronald Coronado Morla", correo: "ronald.coronado@pronabec.gob.pe" },
      { oficina: "Subdirección de Evaluación y Selección", siglas: "SES", director: "Adriana Soyer Verri", correo: "adriana.soyer@pronabec.gob.pe" },
      { oficina: "Subdirección de Seguimiento y Supervisión", siglas: "SUS", director: "Lourdes De Los Milagros Ramírez Tavara", correo: "lourdes.ramirez@pronabec.gob.pe" },
      { oficina: "Dirección de Gestión de Crédito Educativo", siglas: "DICRE", director: "Bruno Giussepe Yika Zapata", correo: "bruno.yika@pronabec.gob.pe" },
      { oficina: "Subdirección de Evaluación y Otorgamiento", siglas: "SEO", director: "Rolando Bardález Ruiz", correo: "rolando.bardales@pronabec.gob.pe" },
      { oficina: "Subdirección de Seguimiento y Cumplimiento", siglas: "SEC", director: "Patricia Teresa Llerena Chumpitaz", correo: "patricia.llerena@pronabec.gob.pe" },
      { oficina: "Dirección de Acompañamiento Socioemocional y Bienestar", siglas: "DIAB", director: "Elvira Pacherres Mendives de Severino", correo: "elvira.pacherres@pronabec.gob.pe" },
      { oficina: "Dirección de Coordinación Nacional y Cooperación Internacional", siglas: "DICONCI", director: "Jessyca Del Carmen Murguía Hernández", correo: "jessyca.murguia@pronabec.gob.pe" },

    ]
  } );


  // Crear procesos
  await prisma.proceso.createMany( {
    data: [

   /* 1 */    { codigo: "E1", version: 1, nombre: "Planificación estratégica​", tipo: "Estratégico", nivel: 0, descripcion: "Gestión de la Planificación estratégica​", parentId: null, estado: true, mapaId: 1 },
    /* 2 */   { codigo: "E2", version: 1, nombre: "Gestión de la mejora continua e innovación institucional​", tipo: "Estratégico", nivel: 0, descripcion: "Gestión de la mejora continua e innovación institucional​", parentId: null, estado: true, mapaId: 1 },
     /* 3 */  { codigo: "E3", version: 1, nombre: "Gestión de estrategias de comunicación, cooperación y relaciones internacionales​", tipo: "Estratégico", nivel: 0, descripcion: "Gestión de estrategias de comunicación, cooperación y relaciones internacionales​", parentId: null, estado: true, mapaId: 1 },
     /* 4 */  { codigo: "E4", version: 1, nombre: "Gestión de control y riesgos", tipo: "Estratégico", nivel: 0, descripcion: "Gestión de control y riesgos", parentId: null, estado: true, mapaId: 1 },
     /* 5 */  { codigo: "M1", version: 1, nombre: "Diseño de instrumentos para la gestión del beneficio​s", tipo: "Misional", nivel: 0, descripcion: "Diseño y actualización de instrumentos para la gestión del beneficio​", parentId: null, estado: true, mapaId: 1 },
     /* 6 */  { codigo: "M2", version: 1, nombre: "Gestión del otorgamiento del beneficio", tipo: "Misional", nivel: 0, descripcion: "Gestión del otorgamiento del beneficio", parentId: null, estado: true, mapaId: 1 },
     /* 7 */  { codigo: "M3", version: 1, nombre: "Gestión de la continuidad del beneficio", tipo: "Misional", nivel: 0, descripcion: "Gestión de la continuidad del beneficio", parentId: null, estado: true, mapaId: 1 },
     /* 8 */  { codigo: "M4", version: 1, nombre: "Gestión de la recuperación del beneficio", tipo: "Misional", nivel: 0, descripcion: "Gestión de la recuperación del beneficio", parentId: null, estado: true, mapaId: 1 },
     /* 9 */  { codigo: "S1", version: 1, nombre: "Gestión de recursos humanos", tipo: "Soporte", nivel: 0, descripcion: "Gestión de recursos humanos", parentId: null, estado: true, mapaId: 1 },
     /* 10 */ { codigo: "S1.1", version: 1, nombre: "Organización del trabajo", tipo: "Soporte", nivel: 1, descripcion: "Organización del trabajo", parentId: 9, estado: true, mapaId: 1 },
     /* 11 */ { codigo: "S1.1.1", version: 1, nombre: "Diseño de puestos", tipo: "Soporte", nivel: 2, descripcion: "Diseño de puestos", parentId: 10, estado: true, mapaId: 1 },
     /* 12 */ { codigo: "S1.1.1.1", version: 1, nombre: "Formulación del Manual de Perfil de Puestos", tipo: "Soporte", nivel: 3, descripcion: "Formulación del Manual de Perfil de Puestos", parentId: 11, estado: true, mapaId: 1 },
     /* 13 */ { codigo: "S1.1.1.2", version: 1, nombre: "Formulacion de perfiles de puestos no contenidos en el MPP", tipo: "Soporte", nivel: 3, descripcion: "Formulacion de perfiles de puestos no contenidos en el MPP", parentId: 3, estado: true, mapaId: 1 },
     /* 14 */ { codigo: "S1.1.2", version: 1, nombre: "Administración de puestos", tipo: "Soporte", nivel: 2, descripcion: "Administración de puestos", parentId: 10, estado: true, mapaId: 1 },
     /* 15 */ { codigo: "S1.1.2.1", version: 1, nombre: "Elaborar y aprobar el CPE", tipo: "Soporte", nivel: 3, descripcion: "Elaborar y aprobar el CPE", parentId: 14, estado: true, mapaId: 1 },
     /* 16 */ { codigo: "S1.1.2.2", version: 1, nombre: "Actualizar el CPE", tipo: "Soporte", nivel: 3, descripcion: "Actualizar el CPE", parentId: 14, estado: true, mapaId: 1 },
     /* 17 */ { codigo: "S1.2", version: 1, nombre: "Incorporación y administración del personal", tipo: "Soporte", nivel: 1, descripcion: "Incorporación y administración del personal", parentId: 9, estado: true, mapaId: 1 },
     /* 18 */ { codigo: "S1.2.1", version: 1, nombre: "Gestión de la incorporación", tipo: "Soporte", nivel: 2, descripcion: "Gestión de la incorporación", parentId: 17, estado: true, mapaId: 1 },
     /* 19 */ { codigo: "S1.2.1.1", version: 1, nombre: "Seleccionar al personal", tipo: "Soporte", nivel: 3, descripcion: "Seleccionar al personal", parentId: 18, estado: true, mapaId: 1 },
     /* 20 */ { codigo: "S1.2.1.2", version: 1, nombre: "Vincular al personal", tipo: "Soporte", nivel: 3, descripcion: "Vincular al personal", parentId: 18, estado: true, mapaId: 1 },
     /* 21 */ { codigo: "S1.2.1.3", version: 1, nombre: "Inducción al personal", tipo: "Soporte", nivel: 3, descripcion: "Inducción al personal", parentId: 18, estado: true, mapaId: 1 },
     /* 22 */ { codigo: "S1.2.2", version: 1, nombre: "Administración de personas", tipo: "Soporte", nivel: 2, descripcion: "Administración de personas", parentId: 17, estado: true, mapaId: 1 },
     /* 23 */ { codigo: "S1.2.2.1", version: 1, nombre: "Administración de legajos", tipo: "Soporte", nivel: 3, descripcion: "Administración de legajos", parentId: 22, estado: true, mapaId: 1 },
     /* 24 */ { codigo: "S1.2.2.1.1", version: 1, nombre: "Apertura y Registro de Legajos", tipo: "Soporte", nivel: 4, descripcion: "Apertura y Registro de Legajos", parentId: 23, estado: true, mapaId: 1 },
     /* 25 */ { codigo: "S1.2.2.1.2", version: 1, nombre: "Solicitud de copias", tipo: "Soporte", nivel: 4, descripcion: "Solicitud de copias", parentId: 23, estado: true, mapaId: 1 },
     /* 26 */ { codigo: "S1.2.2.1.3", version: 1, nombre: "Atención de prestamo", tipo: "Soporte", nivel: 4, descripcion: "Atención de prestamo", parentId: 23, estado: true, mapaId: 1 },
     /* 27 */ { codigo: "S1.2.2.1.4", version: 1, nombre: "Atención de solicitud de entrega de documentos originales", tipo: "Soporte", nivel: 4, descripcion: "Atención de solicitud de entrega de documentos originales", parentId: 23, estado: true, mapaId: 1 },
     /* 28 */ { codigo: "S1.2.2.1.5", version: 1, nombre: "Transferencias de Legajos (Cese)", tipo: "Soporte", nivel: 4, descripcion: "Transferencias de Legajos (Cese)", parentId: 23, estado: true, mapaId: 1 },
     /* 29 */ { codigo: "S1.2.2.2", version: 1, nombre: "Control de asistencia", tipo: "Soporte", nivel: 3, descripcion: "Control de asistencia", parentId: 22, estado: true, mapaId: 1 },
     /* 30 */ { codigo: "S1.2.2.3", version: 1, nombre: "Gestión de vacaciones y licencias", tipo: "Soporte", nivel: 3, descripcion: "Gestión de vacaciones y licencias", parentId: 22, estado: true, mapaId: 1 },
     /* 31 */ { codigo: "S1.2.2.4", version: 1, nombre: "Desplazamientos", tipo: "Soporte", nivel: 3, descripcion: "Desplazamientos", parentId: 22, estado: true, mapaId: 1 },
     /* 32 */ { codigo: "S1.2.2.3.1", version: 1, nombre: "Designación o encargatura de personal + ddjj de intereses", tipo: "Soporte", nivel: 4, descripcion: "Designación o encargatura de personal + ddjj de intereses", parentId: 31, estado: true, mapaId: 1 },
     /* 33 */ { codigo: "S1.2.2.3.2", version: 1, nombre: "Rotación de personal", tipo: "Soporte", nivel: 4, descripcion: "Rotación de personal", parentId: 31, estado: true, mapaId: 1 },
     /* 34 */ { codigo: "S1.2.2.5", version: 1, nombre: "Gestionar el teletrabajo", tipo: "Soporte", nivel: 3, descripcion: "Gestionar el teletrabajo", parentId: 22, estado: true, mapaId: 1 },
     /* 35 */ { codigo: "S1.2.2.6", version: 1, nombre: "Gestión de los Procesos disciplinarios", tipo: "Soporte", nivel: 3, descripcion: "Gestión de los Procesos disciplinarios", parentId: 22, estado: true, mapaId: 1 },
     /* 36 */ { codigo: "S1.2.2.6.1", version: 1, nombre: "Atender denuncias presentadas contra servidores del PRONABEC", tipo: "Soporte", nivel: 4, descripcion: "Atender denuncias presentadas contra servidores del PRONABEC", parentId: 35, estado: true, mapaId: 1 },
     /* 37 */ { codigo: "S1.2.2.6.2", version: 1, nombre: "Realizar el proceso disciplinario contra servidores del PRONABEC", tipo: "Soporte", nivel: 4, descripcion: "Realizar el proceso disciplinario contra servidores del PRONABEC", parentId: 35, estado: true, mapaId: 1 },
     /* 38 */ { codigo: "S1.2.2.7", version: 1, nombre: "Desvinculación (Entrega de cargo)+ sol. Documentos", tipo: "Soporte", nivel: 3, descripcion: "Desvinculación (Entrega de cargo)+ sol. Documentos", parentId: 22, estado: true, mapaId: 1 },
     /* 39 */ { codigo: "S1.2.2.7.1", version: 1, nombre: "Entrega de cargo", tipo: "Soporte", nivel: 4, descripcion: "Entrega de cargo", parentId: 38, estado: true, mapaId: 1 },
     /* 40 */ { codigo: "S1.2.2.7.2", version: 1, nombre: "Atención de entrega de documentos", tipo: "Soporte", nivel: 4, descripcion: "Atención de entrega de documentos", parentId: 38, estado: true, mapaId: 1 },
     /* 41 */ { codigo: "S1.3", version: 1, nombre: "Gestión del talento", tipo: "Soporte", nivel: 1, descripcion: "Gestión del talento", parentId: 9, estado: true, mapaId: 1 },
     /* 42 */ { codigo: "S1.3.1", version: 1, nombre: "Gestión del desarrollo y capacitación", tipo: "Soporte", nivel: 2, descripcion: "Gestión del desarrollo y capacitación", parentId: 41, estado: true, mapaId: 1 },
     /* 43 */ { codigo: "S1.3.1.1", version: 1, nombre: "Planificación de la capacitación", tipo: "Soporte", nivel: 3, descripcion: "Planificación de la capacitación", parentId: 42, estado: true, mapaId: 1 },
     /* 44 */ { codigo: "S1.3.1.1.1", version: 1, nombre: "Conformacion de Comité de Planificación de la capacitación", tipo: "Soporte", nivel: 4, descripcion: "Conformacion de Comité de Planificación de la capacitación", parentId: 43, estado: true, mapaId: 1 },
     /* 45 */ { codigo: "S1.3.1.1.2", version: 1, nombre: "Definir PDP + mod.", tipo: "Soporte", nivel: 4, descripcion: "Definir PDP + mod.", parentId: 43, estado: true, mapaId: 1 },
     /* 46 */ { codigo: "S1.3.1.2", version: 1, nombre: "Ejecucion de la capacitación", tipo: "Soporte", nivel: 3, descripcion: "Ejecucion de la capacitación", parentId: 42, estado: true, mapaId: 1 },
     /* 47 */ { codigo: "S1.3.1.2.1", version: 1, nombre: "Elaborar expediente de capacitación", tipo: "Soporte", nivel: 4, descripcion: "Elaborar expediente de capacitación", parentId: 46, estado: true, mapaId: 1 },
     /* 48 */ { codigo: "S1.3.1.2.2", version: 1, nombre: "Ejecutar la capacitación", tipo: "Soporte", nivel: 4, descripcion: "Ejecutar la capacitación", parentId: 46, estado: true, mapaId: 1 },
     /* 49 */ { codigo: "S1.3.1.2.3", version: 1, nombre: "Modificar el PDP", tipo: "Soporte", nivel: 4, descripcion: "Modificar el PDP", parentId: 46, estado: true, mapaId: 1 },
     /* 50 */ { codigo: "S1.3.1.3", version: 1, nombre: "Evaluación de la capacitación", tipo: "Soporte", nivel: 3, descripcion: "Evaluación de la capacitación", parentId: 42, estado: true, mapaId: 1 },
     /* 51 */ { codigo: "S1.3.2", version: 1, nombre: "Gestión del rendimiento", tipo: "Soporte", nivel: 2, descripcion: "Gestión del rendimiento", parentId: 41, estado: true, mapaId: 1 },
     /* 52 */ { codigo: "S1.3.2.1", version: 1, nombre: "Planificar la gestión del rendimiento", tipo: "Soporte", nivel: 3, descripcion: "Planificar la gestión del rendimiento", parentId: 51, estado: true, mapaId: 1 },
     /* 53 */ { codigo: "S1.3.2.2", version: 1, nombre: "Seguimiento al cumplimiento de metas", tipo: "Soporte", nivel: 3, descripcion: "Seguimiento al cumplimiento de metas", parentId: 51, estado: true, mapaId: 1 },
     /* 54 */ { codigo: "S1.3.2.3", version: 1, nombre: "Evaluación al cumplimiento de metas", tipo: "Soporte", nivel: 3, descripcion: "Evaluación al cumplimiento de metas", parentId: 51, estado: true, mapaId: 1 },
     /* 55 */ { codigo: "S1.4", version: 1, nombre: "Gestión de compensaciones", tipo: "Soporte", nivel: 1, descripcion: "Gestión de compensaciones", parentId: 9, estado: true, mapaId: 1 },
     /* 56 */ { codigo: "S1.4.1", version: 1, nombre: "Elaborar planillas de pago", tipo: "Soporte", nivel: 2, descripcion: "Elaborar planillas de pago", parentId: 55, estado: true, mapaId: 1 },
     /* 57 */ { codigo: "S1.4.2", version: 1, nombre: "Liquidación de beneficios sociales", tipo: "Soporte", nivel: 2, descripcion: "Liquidación de beneficios sociales", parentId: 55, estado: true, mapaId: 1 },
     /* 58 */ { codigo: "S1.5", version: 1, nombre: "Gestión de relaciones humanas y sociales", tipo: "Soporte", nivel: 1, descripcion: "Gestión de relaciones humanas y sociales", parentId: 9, estado: true, mapaId: 1 },
     /* 59 */ { codigo: "S1.5.1", version: 1, nombre: "Relaciones laborales individuales y colectivas", tipo: "Soporte", nivel: 2, descripcion: "Relaciones laborales individuales y colectivas", parentId: 58, estado: true, mapaId: 1 },
     /* 60 */ { codigo: "S1.5.1.1", version: 1, nombre: "Resolución de conflictos", tipo: "Soporte", nivel: 3, descripcion: "Resolución de conflictos", parentId: 59, estado: true, mapaId: 1 },
     /* 61 */ { codigo: "S1.5.1.2", version: 1, nombre: "Atención de pliego de reclamos y convenios colectivos", tipo: "Soporte", nivel: 3, descripcion: "Atención de pliego de reclamos y convenios colectivos", parentId: 59, estado: true, mapaId: 1 },
     /* 62 */ { codigo: "S1.5.2", version: 1, nombre: "Gestionar la seguridad y salud en el trabajo", tipo: "Soporte", nivel: 2, descripcion: "Gestionar la seguridad y salud en el trabajo", parentId: 58, estado: true, mapaId: 1 },
     /* 63 */ { codigo: "S1.5.2.1", version: 1, nombre: "Definir plan y programas de SST", tipo: "Soporte", nivel: 3, descripcion: "Definir plan y programas de SST", parentId: 62, estado: true, mapaId: 1 },
     /* 64 */ { codigo: "S1.5.2.2", version: 1, nombre: "Gestión de incidentes y diagnostico del SST", tipo: "Soporte", nivel: 3, descripcion: "Gestión de incidentes y diagnostico del SST", parentId: 62, estado: true, mapaId: 1 },
     /* 65 */ { codigo: "S1.5.3", version: 1, nombre: "Gestionar el bienestar social", tipo: "Soporte", nivel: 2, descripcion: "Gestionar el bienestar social", parentId: 58, estado: true, mapaId: 1 },
     /* 66 */ { codigo: "S1.5.3.1", version: 1, nombre: "Elaborar Plan de Bienestar Social", tipo: "Soporte", nivel: 3, descripcion: "Elaborar Plan de Bienestar Social", parentId: 65, estado: true, mapaId: 1 },
     /* 67 */ { codigo: "S1.5.3.2", version: 1, nombre: "Atención de descanso médico", tipo: "Soporte", nivel: 3, descripcion: "Atención de descanso médico", parentId: 65, estado: true, mapaId: 1 },
     /* 68 */ { codigo: "S1.5.3.3", version: 1, nombre: "Atención de trámite por maternidad", tipo: "Soporte", nivel: 3, descripcion: "Atención de trámite por maternidad", parentId: 65, estado: true, mapaId: 1 },
     /* 69 */ { codigo: "S1.5.3.4", version: 1, nombre: "Atención del registro de derechohabientes", tipo: "Soporte", nivel: 3, descripcion: "Atención del registro de derechohabientes", parentId: 65, estado: true, mapaId: 1 },
     /* 70 */ { codigo: "S1.5.4", version: 1, nombre: "Gestionar la cultura y clima laboral", tipo: "Soporte", nivel: 2, descripcion: "Gestionar la cultura y clima laboral", parentId: 58, estado: true, mapaId: 1 },
     /* 71 */ { codigo: "S1.5.4.1", version: 1, nombre: "Planificar la gestión de clima organizacional", tipo: "Soporte", nivel: 3, descripcion: "Planificar la gestión de clima organizacional", parentId: 70, estado: true, mapaId: 1 },
     /* 72 */ { codigo: "S1.5.4.2", version: 1, nombre: "Intervención de la gestión de clima organizacional", tipo: "Soporte", nivel: 3, descripcion: "Intervención de la gestión de clima organizacional", parentId: 70, estado: true, mapaId: 1 },
     /* 73 */ { codigo: "S1.5.4.3", version: 1, nombre: "Realizar la medición de clima organizacional", tipo: "Soporte", nivel: 3, descripcion: "Realizar la medición de clima organizacional", parentId: 70, estado: true, mapaId: 1 },
     /* 74 */ { codigo: "S1.5.5", version: 1, nombre: "Comunicación interna", tipo: "Soporte", nivel: 2, descripcion: "Comunicación interna", parentId: 50, estado: true, mapaId: 1 },
     /* 75 */ { codigo: "S1.5.5.1", version: 1, nombre: "Definicion del plan de comunicación interna", tipo: "Soporte", nivel: 3, descripcion: "Definicion del plan de comunicación interna", parentId: 74, estado: true, mapaId: 1 },
     /* 76 */ { codigo: "S1.5.5.2", version: 1, nombre: "Ejecución del plan de comunicación interna", tipo: "Soporte", nivel: 3, descripcion: "Ejecución del plan de comunicación interna", parentId: 74, estado: true, mapaId: 1 },
     /* 77 */ { codigo: "S2", version: 1, nombre: "Administración de recursos financieros", tipo: "Soporte", nivel: 0, descripcion: "Administración de recursos financieros", parentId: null, estado: true, mapaId: 1 },
     /* 78 */ { codigo: "S3", version: 1, nombre: "Gestión de abastecimiento", tipo: "Soporte", nivel: 0, descripcion: "Gestión de abastecimiento", parentId: null, estado: true, mapaId: 1 },
     /* 79 */ { codigo: "S4", version: 1, nombre: "Gestión de tecnologías de la información y comunicación", tipo: "Soporte", nivel: 0, descripcion: "Gestión de tecnologías de la información y comunicación", parentId: null, estado: true, mapaId: 1 },
     /* 80 */ { codigo: "S5", version: 1, nombre: "Atención de asuntos jurídicos", tipo: "Soporte", nivel: 0, descripcion: "Atención de asuntos jurídicos", parentId: null, estado: true, mapaId: 1 },
     /* 81 */ { codigo: "S6", version: 1, nombre: "Atención al ciudadano y administración del archivo", tipo: "Soporte", nivel: 0, descripcion: "Atención al ciudadano y administración del archivo", parentId: null, estado: true, mapaId: 1 },

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