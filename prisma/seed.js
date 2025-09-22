const { PrismaClient } = require( '@prisma/client' );
const prisma = new PrismaClient();
const bcryptjs = require( 'bcryptjs' );


async function main() {
  // Crear roles
  await prisma.roles.createMany( {
    data: [
      { rol: 'ADMIN' },
      { rol: 'USER' },
      { rol: 'GUEST' }
    ],
    skipDuplicates: true
  } );
  await prisma.mapa.createMany( {
    data: [
      { nombre: 'PROGRAMA NACIONAL DE BECAS Y CREDITO EDUCATIVO', ruc: '20546798152', descripcion: 'Mapa de procesos del PRONABEC', estado: true, entrada: "Ciudadanos de bajos, insuficientes recursos o alto rendimiento académico con barreras de acceso a la educación superior de calidad ", salida: "Ciudadanos que accedieron a educación superior de calidad y contribuyen en el desarrollo económico y social" },
      { nombre: 'SUNARP', ruc: '20123456789', descripcion: 'Mapa de procesos de la SUNARP', estado: true, entrada: "Entrada 2", salida: "Salida 2" },

    ]
  } );

  await prisma.unidadOperativa.createMany( {
    data: [
      { nombre: "Dirección Ejecutiva", siglas: "DE", mapaId: 1 },
      { nombre: "Oficina de Asesoría Jurídica", siglas: "OAJ", mapaId: 1 },
      { nombre: "Oficina de Planeamiento y Presupuesto", siglas: "OPP", mapaId: 1 },
      { nombre: "Unidad de Planeamiento", siglas: "UPLAN", mapaId: 1 },
      { nombre: "Unidad de Modernización de la Gestión", siglas: "UMG", mapaId: 1 },
      { nombre: "Unidad de Presupuesto", siglas: "UPRE", mapaId: 1 },
      { nombre: "Unidad de Estudios Sociales e Investigación", siglas: "UESI", mapaId: 1 },
      { nombre: "Oficina de Administración y Finanzas", siglas: "OAF", mapaId: 1 },
      { nombre: "Unidad de Contabilidad y Control Previo", siglas: "UCCP", mapaId: 1 },
      { nombre: "Unidad de Tesorería", siglas: "UT", mapaId: 1 },
      { nombre: "Unidad de Abastecimiento", siglas: "UA", mapaId: 1 },
      { nombre: "Unidad de Subvenciones y Financiamiento", siglas: "USF", mapaId: 1 },
      { nombre: "Oficina de Comunicaciones y Relaciones Institucionales", siglas: "OCRI", mapaId: 1 },
      { nombre: "Oficina de Gestión de Recursos Humanos", siglas: "OGRH", mapaId: 1 },
      { nombre: "Oficina de Atención a la Ciudadanía y Gestión Documental", siglas: "OAGD", mapaId: 1 },
      { nombre: "Oficina de Tecnologías de la Información", siglas: "OTI", mapaId: 1 },
      { nombre: "Dirección de Gestión de Becas", siglas: "DIBEC", mapaId: 1 },
      { nombre: "Subdirección de Evaluación y Selección", siglas: "SES", mapaId: 1 },
      { nombre: "Subdirección de Seguimiento y Supervisión", siglas: "SUS", mapaId: 1 },
      { nombre: "Dirección de Gestión de Crédito Educativo", siglas: "DICRE", mapaId: 1 },
      { nombre: "Subdirección de Evaluación y Otorgamiento", siglas: "SEO", mapaId: 1 },
      { nombre: "Subdirección de Seguimiento y Cumplimiento", siglas: "SEC", mapaId: 1 },
      { nombre: "Dirección de Acompañamiento Socioemocional y Bienestar", siglas: "DIAB", mapaId: 1 },
      { nombre: "Dirección de Coordinación Nacional y Cooperación Internacional", siglas: "DICONCI", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Amazonas", siglas: "SUCCOR Amazonas", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Áncash", siglas: "SUCCOR Áncash", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Apurímac", siglas: "SUCCOR Apurímac", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Arequipa", siglas: "SUCCOR Arequipa", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Ayacucho", siglas: "SUCCOR Ayacucho", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Cajamarca", siglas: "SUCCOR Cajamarca", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Callao", siglas: "SUCCOR Callao", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Cusco", siglas: "SUCCOR Cusco", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Huancavelica", siglas: "SUCCOR Huancavelica", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Huánuco", siglas: "SUCCOR Huánuco", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Ica", siglas: "SUCCOR Ica", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Junín", siglas: "SUCCOR Junín", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional La Libertad", siglas: "SUCCOR La Libertad", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Lambayeque", siglas: "SUCCOR Lambayeque", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Lima Metropolitana", siglas: "SUCCOR Lima Metropolitana", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Lima Provincias", siglas: "SUCCOR Lima Provincias", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Loreto", siglas: "SUCCOR Loreto", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Madre de Dios", siglas: "SUCCOR Madre de Dios", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Moquegua", siglas: "SUCCOR Moquegua", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Pasco", siglas: "SUCCOR Pasco", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Piura", siglas: "SUCCOR Piura", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Puno", siglas: "SUCCOR Puno", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional San Martín", siglas: "SUCCOR San Martín", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Tacna", siglas: "SUCCOR Tacna", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Tumbes", siglas: "SUCCOR Tumbes", mapaId: 1 },
      { nombre: "Subdirección de Coordinación y Cooperación Regional Ucayali", siglas: "SUCCOR Ucayali", mapaId: 1 }
    ]
  } );

  // crear dueños
  await prisma.owner.createMany( {
    data: [
      { director: "Alexandra Ames Brachowicz", correo: "alexandra.ames@pronabec.gob.pe", unidadOperativaId: 1, mapaId: 1 },
      { director: "Cesar Paul Hernández Pérez", correo: "cesar.hernandez@pronabec.gob.pe", unidadOperativaId: 2, mapaId: 1 },
      { director: "Dante Javier Beltrán Arias", correo: "dante.beltran@pronabec.gob.pe", unidadOperativaId: 3, mapaId: 1 },
      { director: "Jorge Luis Nicho Cárdenas", correo: "jorge.nicho@pronabec.gob.pe", unidadOperativaId: 4, mapaId: 1 },
      { director: "Jerzy Alfredo Alarcón Quiroz", correo: "jerzy.alarcon@pronabec.gob.pe", unidadOperativaId: 5, mapaId: 1 },
      { director: "Mariella Juliana García Zapata", correo: "mariella.garcia@pronabec.gob.pe", unidadOperativaId: 6, mapaId: 1 },
      { director: "Lucía del Rosario Espezúa Berrios", correo: "espezua.lucia@gmail.com", unidadOperativaId: 7, mapaId: 1 },
      { director: "Erik Enrique Tello Corrales", correo: "erik.tello@pronabec.gob.pe", unidadOperativaId: 8, mapaId: 1 },
      { director: "María Cecilia Girao Araujo", correo: "Maria.girao@pronabec.gob.pe", unidadOperativaId: 9, mapaId: 1 },
      { director: "Pilar Milagros Celestino Romani", correo: "pilar.celestino@pronabec.gob.pe", unidadOperativaId: 10, mapaId: 1 },
      { director: "Robert Paul Andrade Olivera", correo: "robert.andrade@pronabec.gob.pe", unidadOperativaId: 11, mapaId: 1 },
      { director: "Pegui Paloma Guillen Ramirez", correo: "pegui.guillen@pronabec.gob.pe", unidadOperativaId: 12, mapaId: 1 },
      { director: "Raul Castro Pereyra", correo: "raul.castro@pronabec.gob.pe", unidadOperativaId: 13, mapaId: 1 },
      { director: "Carlos Fernando Dulanto Paniagua", correo: "carlos.dulanto@pronabec.gob.pe", unidadOperativaId: 14, mapaId: 1 },
      { director: "Maricarmen Benites Avalo", correo: "maricarmen.benites@pronabec.gob.pe", unidadOperativaId: 15, mapaId: 1 },
      { director: "Andy Erick Arellano Chicana", correo: "andy.arellano@pronabec.gob.pe", unidadOperativaId: 16, mapaId: 1 },
      { director: "Ronald Coronado Morla", correo: "ronald.coronado@pronabec.gob.pe", unidadOperativaId: 17, mapaId: 1 },
      { director: "Adriana Soyer Verri", correo: "adriana.soyer@pronabec.gob.pe", unidadOperativaId: 18, mapaId: 1 },
      { director: "Lourdes De Los Milagros Ramírez Tavara", correo: "lourdes.ramirez@pronabec.gob.pe", unidadOperativaId: 19, mapaId: 1 },
      { director: "Bruno Giussepe Yika Zapata", correo: "bruno.yika@pronabec.gob.pe", unidadOperativaId: 20, mapaId: 1 },
      { director: "Rolando Bardález Ruiz", correo: "rolando.bardales@pronabec.gob.pe", unidadOperativaId: 21, mapaId: 1 },
      { director: "Patricia Teresa Llerena Chumpitaz", correo: "patricia.llerena@pronabec.gob.pe", unidadOperativaId: 22, mapaId: 1 },
      { director: "Elvira Pacherres Mendives de Severino", correo: "elvira.pacherres@pronabec.gob.pe", unidadOperativaId: 23, mapaId: 1 },
      { director: "Jessyca Del Carmen Murguía Hernández", correo: "jessyca.murguia@pronabec.gob.pe", unidadOperativaId: 24, mapaId: 1 }
    ]
  } );


  // Crear procesos
  await prisma.proceso.createMany( {
    data: [
      { codigo: "E1", version: 1, nombre: "Planificación estratégica​", tipo: "Estratégico", nivel: 0, descripcion: "Gestión de la Planificación estratégica​", parentId: null, estado: true, mapaId: 1 },
      { codigo: "E2", version: 1, nombre: "Gestión de la mejora continua e innovación institucional​", tipo: "Estratégico", nivel: 0, descripcion: "Gestión de la mejora continua e innovación institucional​", parentId: null, estado: true, mapaId: 1 },
      { codigo: "E3", version: 1, nombre: "Gestión de estrategias de comunicación, cooperación y relaciones internacionales​", tipo: "Estratégico", nivel: 0, descripcion: "Gestión de estrategias de comunicación, cooperación y relaciones internacionales​", parentId: null, estado: true, mapaId: 1 },
      { codigo: "E4", version: 1, nombre: "Gestión de control y riesgos", tipo: "Estratégico", nivel: 0, descripcion: "Gestión de control y riesgos", parentId: null, estado: true, mapaId: 1 },
      { codigo: "M1", version: 1, nombre: "Diseño de instrumentos para la gestión del beneficio​s", tipo: "Misional", nivel: 0, descripcion: "Diseño y actualización de instrumentos para la gestión del beneficio​", parentId: null, estado: true, mapaId: 1 },
      { codigo: "M2", version: 1, nombre: "Gestión del otorgamiento del beneficio", tipo: "Misional", nivel: 0, descripcion: "Gestión del otorgamiento del beneficio", parentId: null, estado: true, mapaId: 1 },
      { codigo: "M3", version: 1, nombre: "Gestión de la continuidad del beneficio", tipo: "Misional", nivel: 0, descripcion: "Gestión de la continuidad del beneficio", parentId: null, estado: true, mapaId: 1 },
      { codigo: "M4", version: 1, nombre: "Gestión de la recuperación del beneficio", tipo: "Misional", nivel: 0, descripcion: "Gestión de la recuperación del beneficio", parentId: null, estado: true, mapaId: 1 },
      { codigo: "S1", version: 1, nombre: "Gestión de recursos humanos", tipo: "Soporte", nivel: 0, descripcion: "Gestión de recursos humanos", parentId: null, estado: true, mapaId: 1 },
      { codigo: "S1.1", version: 1, nombre: "Organización del trabajo", tipo: "Soporte", nivel: 1, descripcion: "Organización del trabajo", parentId: 9, estado: true, mapaId: 1 },
      { codigo: "S1.1.1", version: 1, nombre: "Diseño de puestos", tipo: "Soporte", nivel: 2, descripcion: "Diseño de puestos", parentId: 10, estado: true, mapaId: 1 },
      { codigo: "S1.1.1.1", version: 1, nombre: "Formulación del Manual de Perfil de Puestos", tipo: "Soporte", nivel: 3, descripcion: "Formulación del Manual de Perfil de Puestos", parentId: 11, estado: true, mapaId: 1 },
      { codigo: "S1.1.1.2", version: 1, nombre: "Formulacion de perfiles de puestos no contenidos en el MPP", tipo: "Soporte", nivel: 3, descripcion: "Formulacion de perfiles de puestos no contenidos en el MPP", parentId: 3, estado: true, mapaId: 1 },
      { codigo: "S1.1.2", version: 1, nombre: "Administración de puestos", tipo: "Soporte", nivel: 2, descripcion: "Administración de puestos", parentId: 10, estado: true, mapaId: 1 },
      { codigo: "S1.1.2.1", version: 1, nombre: "Elaborar y aprobar el CPE", tipo: "Soporte", nivel: 3, descripcion: "Elaborar y aprobar el CPE", parentId: 14, estado: true, mapaId: 1 },
      { codigo: "S1.1.2.2", version: 1, nombre: "Actualizar el CPE", tipo: "Soporte", nivel: 3, descripcion: "Actualizar el CPE", parentId: 14, estado: true, mapaId: 1 },
      { codigo: "S1.2", version: 1, nombre: "Incorporación y administración del personal", tipo: "Soporte", nivel: 1, descripcion: "Incorporación y administración del personal", parentId: 9, estado: true, mapaId: 1 },
      { codigo: "S1.2.1", version: 1, nombre: "Gestión de la incorporación", tipo: "Soporte", nivel: 2, descripcion: "Gestión de la incorporación", parentId: 17, estado: true, mapaId: 1 },
      { codigo: "S1.2.1.1", version: 1, nombre: "Seleccionar al personal", tipo: "Soporte", nivel: 3, descripcion: "Seleccionar al personal", parentId: 18, estado: true, mapaId: 1 },
      { codigo: "S1.2.1.2", version: 1, nombre: "Vincular al personal", tipo: "Soporte", nivel: 3, descripcion: "Vincular al personal", parentId: 18, estado: true, mapaId: 1 },
      { codigo: "S1.2.1.3", version: 1, nombre: "Inducción al personal", tipo: "Soporte", nivel: 3, descripcion: "Inducción al personal", parentId: 18, estado: true, mapaId: 1 },
      { codigo: "S1.2.2", version: 1, nombre: "Administración de personas", tipo: "Soporte", nivel: 2, descripcion: "Administración de personas", parentId: 17, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.1", version: 1, nombre: "Administración de legajos", tipo: "Soporte", nivel: 3, descripcion: "Administración de legajos", parentId: 22, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.1.1", version: 1, nombre: "Apertura y Registro de Legajos", tipo: "Soporte", nivel: 4, descripcion: "Apertura y Registro de Legajos", parentId: 23, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.1.2", version: 1, nombre: "Solicitud de copias", tipo: "Soporte", nivel: 4, descripcion: "Solicitud de copias", parentId: 23, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.1.3", version: 1, nombre: "Atención de prestamo", tipo: "Soporte", nivel: 4, descripcion: "Atención de prestamo", parentId: 23, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.1.4", version: 1, nombre: "Atención de solicitud de entrega de documentos originales", tipo: "Soporte", nivel: 4, descripcion: "Atención de solicitud de entrega de documentos originales", parentId: 23, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.1.5", version: 1, nombre: "Transferencias de Legajos (Cese)", tipo: "Soporte", nivel: 4, descripcion: "Transferencias de Legajos (Cese)", parentId: 23, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.2", version: 1, nombre: "Control de asistencia", tipo: "Soporte", nivel: 3, descripcion: "Control de asistencia", parentId: 22, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.3", version: 1, nombre: "Gestión de vacaciones y licencias", tipo: "Soporte", nivel: 3, descripcion: "Gestión de vacaciones y licencias", parentId: 22, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.4", version: 1, nombre: "Desplazamientos", tipo: "Soporte", nivel: 3, descripcion: "Desplazamientos", parentId: 22, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.3.1", version: 1, nombre: "Designación o encargatura de personal + ddjj de intereses", tipo: "Soporte", nivel: 4, descripcion: "Designación o encargatura de personal + ddjj de intereses", parentId: 31, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.3.2", version: 1, nombre: "Rotación de personal", tipo: "Soporte", nivel: 4, descripcion: "Rotación de personal", parentId: 31, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.5", version: 1, nombre: "Gestionar el teletrabajo", tipo: "Soporte", nivel: 3, descripcion: "Gestionar el teletrabajo", parentId: 22, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.6", version: 1, nombre: "Gestión de los Procesos disciplinarios", tipo: "Soporte", nivel: 3, descripcion: "Gestión de los Procesos disciplinarios", parentId: 22, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.6.1", version: 1, nombre: "Atender denuncias presentadas contra servidores del PRONABEC", tipo: "Soporte", nivel: 4, descripcion: "Atender denuncias presentadas contra servidores del PRONABEC", parentId: 35, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.6.2", version: 1, nombre: "Realizar el proceso disciplinario contra servidores del PRONABEC", tipo: "Soporte", nivel: 4, descripcion: "Realizar el proceso disciplinario contra servidores del PRONABEC", parentId: 35, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.7", version: 1, nombre: "Desvinculación (Entrega de cargo)+ sol. Documentos", tipo: "Soporte", nivel: 3, descripcion: "Desvinculación (Entrega de cargo)+ sol. Documentos", parentId: 22, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.7.1", version: 1, nombre: "Entrega de cargo", tipo: "Soporte", nivel: 4, descripcion: "Entrega de cargo", parentId: 38, estado: true, mapaId: 1 },
      { codigo: "S1.2.2.7.2", version: 1, nombre: "Atención de entrega de documentos", tipo: "Soporte", nivel: 4, descripcion: "Atención de entrega de documentos", parentId: 38, estado: true, mapaId: 1 },
      { codigo: "S1.3", version: 1, nombre: "Gestión del talento", tipo: "Soporte", nivel: 1, descripcion: "Gestión del talento", parentId: 9, estado: true, mapaId: 1 },
      { codigo: "S1.3.1", version: 1, nombre: "Gestión del desarrollo y capacitación", tipo: "Soporte", nivel: 2, descripcion: "Gestión del desarrollo y capacitación", parentId: 41, estado: true, mapaId: 1 },
      { codigo: "S1.3.1.1", version: 1, nombre: "Planificación de la capacitación", tipo: "Soporte", nivel: 3, descripcion: "Planificación de la capacitación", parentId: 42, estado: true, mapaId: 1 },
      { codigo: "S1.3.1.1.1", version: 1, nombre: "Conformacion de Comité de Planificación de la capacitación", tipo: "Soporte", nivel: 4, descripcion: "Conformacion de Comité de Planificación de la capacitación", parentId: 43, estado: true, mapaId: 1 },
      { codigo: "S1.3.1.1.2", version: 1, nombre: "Definir PDP + mod.", tipo: "Soporte", nivel: 4, descripcion: "Definir PDP + mod.", parentId: 43, estado: true, mapaId: 1 },
      { codigo: "S1.3.1.2", version: 1, nombre: "Ejecucion de la capacitación", tipo: "Soporte", nivel: 3, descripcion: "Ejecucion de la capacitación", parentId: 42, estado: true, mapaId: 1 },
      { codigo: "S1.3.1.2.1", version: 1, nombre: "Elaborar expediente de capacitación", tipo: "Soporte", nivel: 4, descripcion: "Elaborar expediente de capacitación", parentId: 46, estado: true, mapaId: 1 },
      { codigo: "S1.3.1.2.2", version: 1, nombre: "Ejecutar la capacitación", tipo: "Soporte", nivel: 4, descripcion: "Ejecutar la capacitación", parentId: 46, estado: true, mapaId: 1 },
      { codigo: "S1.3.1.2.3", version: 1, nombre: "Modificar el PDP", tipo: "Soporte", nivel: 4, descripcion: "Modificar el PDP", parentId: 46, estado: true, mapaId: 1 },
      { codigo: "S1.3.1.3", version: 1, nombre: "Evaluación de la capacitación", tipo: "Soporte", nivel: 3, descripcion: "Evaluación de la capacitación", parentId: 42, estado: true, mapaId: 1 },
      { codigo: "S1.3.2", version: 1, nombre: "Gestión del rendimiento", tipo: "Soporte", nivel: 2, descripcion: "Gestión del rendimiento", parentId: 41, estado: true, mapaId: 1 },
      { codigo: "S1.3.2.1", version: 1, nombre: "Planificar la gestión del rendimiento", tipo: "Soporte", nivel: 3, descripcion: "Planificar la gestión del rendimiento", parentId: 51, estado: true, mapaId: 1 },
      { codigo: "S1.3.2.2", version: 1, nombre: "Seguimiento al cumplimiento de metas", tipo: "Soporte", nivel: 3, descripcion: "Seguimiento al cumplimiento de metas", parentId: 51, estado: true, mapaId: 1 },
      { codigo: "S1.3.2.3", version: 1, nombre: "Evaluación al cumplimiento de metas", tipo: "Soporte", nivel: 3, descripcion: "Evaluación al cumplimiento de metas", parentId: 51, estado: true, mapaId: 1 },
      { codigo: "S1.4", version: 1, nombre: "Gestión de compensaciones", tipo: "Soporte", nivel: 1, descripcion: "Gestión de compensaciones", parentId: 9, estado: true, mapaId: 1 },
      { codigo: "S1.4.1", version: 1, nombre: "Elaborar planillas de pago", tipo: "Soporte", nivel: 2, descripcion: "Elaborar planillas de pago", parentId: 55, estado: true, mapaId: 1 },
      { codigo: "S1.4.2", version: 1, nombre: "Liquidación de beneficios sociales", tipo: "Soporte", nivel: 2, descripcion: "Liquidación de beneficios sociales", parentId: 55, estado: true, mapaId: 1 },
      { codigo: "S1.5", version: 1, nombre: "Gestión de relaciones humanas y sociales", tipo: "Soporte", nivel: 1, descripcion: "Gestión de relaciones humanas y sociales", parentId: 9, estado: true, mapaId: 1 },
      { codigo: "S1.5.1", version: 1, nombre: "Relaciones laborales individuales y colectivas", tipo: "Soporte", nivel: 2, descripcion: "Relaciones laborales individuales y colectivas", parentId: 58, estado: true, mapaId: 1 },
      { codigo: "S1.5.1.1", version: 1, nombre: "Resolución de conflictos", tipo: "Soporte", nivel: 3, descripcion: "Resolución de conflictos", parentId: 59, estado: true, mapaId: 1 },
      { codigo: "S1.5.1.2", version: 1, nombre: "Atención de pliego de reclamos y convenios colectivos", tipo: "Soporte", nivel: 3, descripcion: "Atención de pliego de reclamos y convenios colectivos", parentId: 59, estado: true, mapaId: 1 },
      { codigo: "S1.5.2", version: 1, nombre: "Gestionar la seguridad y salud en el trabajo", tipo: "Soporte", nivel: 2, descripcion: "Gestionar la seguridad y salud en el trabajo", parentId: 58, estado: true, mapaId: 1 },
      { codigo: "S1.5.2.1", version: 1, nombre: "Definir plan y programas de SST", tipo: "Soporte", nivel: 3, descripcion: "Definir plan y programas de SST", parentId: 62, estado: true, mapaId: 1 },
      { codigo: "S1.5.2.2", version: 1, nombre: "Gestión de incidentes y diagnostico del SST", tipo: "Soporte", nivel: 3, descripcion: "Gestión de incidentes y diagnostico del SST", parentId: 62, estado: true, mapaId: 1 },
      { codigo: "S1.5.3", version: 1, nombre: "Gestionar el bienestar social", tipo: "Soporte", nivel: 2, descripcion: "Gestionar el bienestar social", parentId: 58, estado: true, mapaId: 1 },
      { codigo: "S1.5.3.1", version: 1, nombre: "Elaborar Plan de Bienestar Social", tipo: "Soporte", nivel: 3, descripcion: "Elaborar Plan de Bienestar Social", parentId: 65, estado: true, mapaId: 1 },
      { codigo: "S1.5.3.2", version: 1, nombre: "Atención de descanso médico", tipo: "Soporte", nivel: 3, descripcion: "Atención de descanso médico", parentId: 65, estado: true, mapaId: 1 },
      { codigo: "S1.5.3.3", version: 1, nombre: "Atención de trámite por maternidad", tipo: "Soporte", nivel: 3, descripcion: "Atención de trámite por maternidad", parentId: 65, estado: true, mapaId: 1 },
      { codigo: "S1.5.3.4", version: 1, nombre: "Atención del registro de derechohabientes", tipo: "Soporte", nivel: 3, descripcion: "Atención del registro de derechohabientes", parentId: 65, estado: true, mapaId: 1 },
      { codigo: "S1.5.4", version: 1, nombre: "Gestionar la cultura y clima laboral", tipo: "Soporte", nivel: 2, descripcion: "Gestionar la cultura y clima laboral", parentId: 58, estado: true, mapaId: 1 },
      { codigo: "S1.5.4.1", version: 1, nombre: "Planificar la gestión de clima organizacional", tipo: "Soporte", nivel: 3, descripcion: "Planificar la gestión de clima organizacional", parentId: 70, estado: true, mapaId: 1 },
      { codigo: "S1.5.4.2", version: 1, nombre: "Intervención de la gestión de clima organizacional", tipo: "Soporte", nivel: 3, descripcion: "Intervención de la gestión de clima organizacional", parentId: 70, estado: true, mapaId: 1 },
      { codigo: "S1.5.4.3", version: 1, nombre: "Realizar la medición de clima organizacional", tipo: "Soporte", nivel: 3, descripcion: "Realizar la medición de clima organizacional", parentId: 70, estado: true, mapaId: 1 },
      { codigo: "S1.5.5", version: 1, nombre: "Comunicación interna", tipo: "Soporte", nivel: 2, descripcion: "Comunicación interna", parentId: 50, estado: true, mapaId: 1 },
      { codigo: "S1.5.5.1", version: 1, nombre: "Definicion del plan de comunicación interna", tipo: "Soporte", nivel: 3, descripcion: "Definicion del plan de comunicación interna", parentId: 74, estado: true, mapaId: 1 },
      { codigo: "S1.5.5.2", version: 1, nombre: "Ejecución del plan de comunicación interna", tipo: "Soporte", nivel: 3, descripcion: "Ejecución del plan de comunicación interna", parentId: 74, estado: true, mapaId: 1 },
      { codigo: "S2", version: 1, nombre: "Administración de recursos financieros", tipo: "Soporte", nivel: 0, descripcion: "Administración de recursos financieros", parentId: null, estado: true, mapaId: 1 },
      { codigo: "S3", version: 1, nombre: "Gestión de abastecimiento", tipo: "Soporte", nivel: 0, descripcion: "Gestión de abastecimiento", parentId: null, estado: true, mapaId: 1 },
      { codigo: "S4", version: 1, nombre: "Gestión de tecnologías de la información y comunicación", tipo: "Soporte", nivel: 0, descripcion: "Gestión de tecnologías de la información y comunicación", parentId: null, estado: true, mapaId: 1 },
      { codigo: "S5", version: 1, nombre: "Atención de asuntos jurídicos", tipo: "Soporte", nivel: 0, descripcion: "Atención de asuntos jurídicos", parentId: null, estado: true, mapaId: 1 },
      { codigo: "S6", version: 1, nombre: "Atención al ciudadano y administración del archivo", tipo: "Soporte", nivel: 0, descripcion: "Atención al ciudadano y administración del archivo", parentId: null, estado: true, mapaId: 1 },

    ],
    skipDuplicates: true
  } );

  // Obtener el rol ADMIN


  // Crear usuario admin
  const passwordHash = bcryptjs.hashSync( '123456', 10 );

  await prisma.usuario.create( {
    data: {
      nombre: 'Wuilmer',
      apellidoPaterno: 'Carbajal',
      apellidoMaterno: 'Barrenechea',
      correo: 'admin@demo.com',
      password: passwordHash,
      rolesId: 1,
      estado: true,
      google: false,
      online: false
    }
  } );
  
await prisma.usuario.update({
  where: { id: 1 },
  data: {
    mapas: {
      connect: { id: 1 }
    }
  }
});

  await prisma.indicador.createMany( {
    data: [
      {
        
        "codigo": "EOI.01",
        "nombre": "eSTRATEGICO",
        "estado": true,
        "creadoEn": "2025-09-16T17:56:52.015Z",
        "actualizadoEn": "2025-08-31T20:12:28.926Z",
        "justificacion": null,
        "formula": null,
        "sentidoEsperado": "Ascendente",
        "unidadMedida": null,
        "frecuencia": null,
        "fuenteDatos": null,
        "logrosEsperados": null,
        "lineaBase": null,
        "parentId": null,
        "procesoId": null,
        "nivelIndicador": "OEI",        
        "mapaId": 1
      },
      {
        
        "codigo": "AEI.01",
        "nombre": "Actividad estrategica",
        "estado": true,
        "creadoEn": "2025-09-17T01:08:13.378Z",
        "actualizadoEn": "2025-08-31T20:12:28.926Z",
        "justificacion": null,
        "formula": null,
        "sentidoEsperado": "Ascendente",
        "unidadMedida": null,
        "frecuencia": null,
        "fuenteDatos": null,
        "logrosEsperados": null,
        "lineaBase": null,
        "parentId": 1,
        "procesoId": null,
        "nivelIndicador": "OEI",
        "tipoIndicador": "IP",
        "mapaId": 1
      },
      {
        
        "codigo": "AEI.02",
        "nombre": "Actividad Estrategica 2",
        "estado": true,
        "creadoEn": "2025-09-17T01:08:13.378Z",
        "actualizadoEn": "2025-08-31T20:12:28.926Z",
        "justificacion": null,
        "formula": null,
        "sentidoEsperado": "Ascendente",
        "unidadMedida": null,
        "frecuencia": null,
        "fuenteDatos": null,
        "logrosEsperados": null,
        "lineaBase": null,
        "parentId": 2,
        "procesoId": null,
        "nivelIndicador": "AEI",
        "tipoIndicador": "IP",
        "mapaId": 1
      },
      {
        
        "codigo": "IP.01",
        "nombre": "Indicador de proceso",
        "estado": true,
        "creadoEn": "2025-09-17T03:40:40.532Z",
        "actualizadoEn": "2025-08-31T20:12:28.926Z",
        "justificacion": null,
        "formula": null,
        "sentidoEsperado": "Ascendente",
        "unidadMedida": null,
        "frecuencia": null,
        "fuenteDatos": null,
        "logrosEsperados": null,
        "lineaBase": null,
        "parentId": 1,
        "procesoId": null,
        "nivelIndicador": "AO",
        "tipoIndicador": "IP",
        "mapaId": 1
      },
      {
        
        "codigo": "IP.02",
        "nombre": "Indicdor de proceso 2",
        "estado": true,
        "creadoEn": "2025-09-17T03:42:09.057Z",
        "actualizadoEn": "2025-08-31T20:12:28.926Z",
        "justificacion": null,
        "formula": null,
        "sentidoEsperado": "Ascendente",
        "unidadMedida": null,
        "frecuencia": null,
        "fuenteDatos": null,
        "logrosEsperados": null,
        "lineaBase": null,
        "parentId": 3,
        "procesoId": null,
        "nivelIndicador": "AO",
        "tipoIndicador": "IP",
        "mapaId": 1
      },
      {
        
        "codigo": "IP.03",
        "nombre": "Indicdor de proceso 3",
        "estado": true,
        "creadoEn": "2025-09-17T03:42:09.057Z",
        "actualizadoEn": "2025-08-31T20:12:28.926Z",
        "justificacion": null,
        "formula": null,
        "sentidoEsperado": "Ascendente",
        "unidadMedida": null,
        "frecuencia": null,
        "fuenteDatos": null,
        "logrosEsperados": null,
        "lineaBase": null,
        "parentId": 3,
        "procesoId": null,
        "nivelIndicador": "AO",
        "tipoIndicador": "IP",
        "mapaId": 1
      },
      {
        
        "codigo": "IP.04",
        "nombre": "Indicadore de proceos",
        "estado": true,
        "creadoEn": "2025-09-17T03:43:18.236Z",
        "actualizadoEn": "2025-08-31T20:12:28.926Z",
        "justificacion": null,
        "formula": null,
        "sentidoEsperado": "Ascendente",
        "unidadMedida": null,
        "frecuencia": null,
        "fuenteDatos": null,
        "logrosEsperados": null,
        "lineaBase": null,
        "parentId": 2,
        "procesoId": null,
        "nivelIndicador": "AO",
        "tipoIndicador": "IP",
        "mapaId": 1
      }
    ]
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