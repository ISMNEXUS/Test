/**
 * TEST DE INTELIGENCIAS MÚLTIPLES Y ESTILOS DE APRENDIZAJE
 * 80 preguntas - Versión 3.0
 * @version 3.0.0
 */

// ==============================================
// CONFIGURACIÓN
// ==============================================
const CONFIG = {
    totalQuestions: 80,
    apiEndpoint: 'api.php',
    emailEndpoint: 'correo.php',
    redirectUrl: 'https://englishmyway.online/'
};

// ==============================================
// ESTADO DE LA APLICACIÓN
// ==============================================
class AppState {
    constructor() {
        this.currentStep = 'hero';
        this.currentQuestion = 0;
        this.answers = [];
        this.userInfo = {};
        this.startTime = null;
        this.results = {};
        this.scaleAnswers = []; // Para preguntas de escala 1-5
        this.learningAnswers = []; // Para preguntas SI/NO
    }

    reset() {
        this.currentStep = 'hero';
        this.currentQuestion = 0;
        this.answers = [];
        this.userInfo = {};
        this.results = {};
        this.startTime = null;
        this.scaleAnswers = [];
        this.learningAnswers = [];
    }
}

// ==============================================
// BASE DE DATOS DE PREGUNTAS
// ==============================================
const QUESTIONS = [
    // PARTE 1: INTELIGENCIAS MÚLTIPLES (35 preguntas - Escala 1-5)
    // Inteligencia Lingüística (5 preguntas)
    {
        section: 1,
        type: 'scale',
        category: 'INTELIGENCIA LINGÜÍSTICA',
        question: 'CUENTA BROMAS Y CHISTE O INVENTA CUENTOS INCREÍBLES',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'linguistic'
    },
    {
        section: 1,
        type: 'scale',
        category: 'INTELIGENCIA LINGÜÍSTICA',
        question: 'TIENE BUENA MEMORIA PARA LOS NOMBRES, LUGARES, FECHAS Y TRIVIALIDADES',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'linguistic'
    },
    {
        section: 1,
        type: 'scale',
        category: 'INTELIGENCIA LINGÜÍSTICA',
        question: 'DISFRUTA LOS JUEGOS DE PALABRAS',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'linguistic'
    },
    {
        section: 1,
        type: 'scale',
        category: 'INTELIGENCIA LINGÜÍSTICA',
        question: 'DISFRUTA LEER LIBROS',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'linguistic'
    },
    {
        section: 1,
        type: 'scale',
        category: 'INTELIGENCIA LINGÜÍSTICA',
        question: 'ESCRIBE LAS PALABRAS CORRECTAMENTE',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'linguistic'
    },
    
    // Inteligencia Lógica y Matemática (5 preguntas)
    {
        section: 2,
        type: 'scale',
        category: 'INTELIGENCIA LÓGICA Y MATEMÁTICA',
        question: 'HACE MUCHAS PREGUNTAS ACERCA DEL FUNCIONAMIENTO DE LAS COSAS',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'logical'
    },
    {
        section: 2,
        type: 'scale',
        category: 'INTELIGENCIA LÓGICA Y MATEMÁTICA',
        question: 'HACE OPERACIONES ARITMÉTICAS MENTALMENTE CON MUCHA RAPIDEZ',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'logical'
    },
    {
        section: 2,
        type: 'scale',
        category: 'INTELIGENCIA LÓGICA Y MATEMÁTICA',
        question: 'DISFRUTA LAS CLASES DE MATEMÁTICAS',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'logical'
    },
    {
        section: 2,
        type: 'scale',
        category: 'INTELIGENCIA LÓGICA Y MATEMÁTICA',
        question: 'LE INTERESAN LOS JUEGOS DE MATEMÁTICAS EN COMPUTADORAS',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'logical'
    },
    {
        section: 2,
        type: 'scale',
        category: 'INTELIGENCIA LÓGICA Y MATEMÁTICA',
        question: 'LE GUSTAN LOS JUEGOS Y ROMPECABEZAS QUE REQUIEREN LÓGICA',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'logical'
    },
    
    // Inteligencia Espacial (5 preguntas)
    {
        section: 3,
        type: 'scale',
        category: 'INTELIGENCIA ESPACIAL',
        question: 'PRESENTA IMÁGENES VISUALES NÍTIDAS',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'spatial'
    },
    {
        section: 3,
        type: 'scale',
        category: 'INTELIGENCIA ESPACIAL',
        question: 'LEE MAPAS, GRÁFICOS Y DIAGRAMAS CON MÁS FACILIDAD QUE EL TEXTO',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'spatial'
    },
    {
        section: 3,
        type: 'scale',
        category: 'INTELIGENCIA ESPACIAL',
        question: 'FANTASEA MÁS QUE SUS COMPAÑEROS',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'spatial'
    },
    {
        section: 3,
        type: 'scale',
        category: 'INTELIGENCIA ESPACIAL',
        question: 'DIBUJA FIGURAS AVANZADAS PARA SU EDAD',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'spatial'
    },
    {
        section: 3,
        type: 'scale',
        category: 'INTELIGENCIA ESPACIAL',
        question: 'LE GUSTA VER PELÍCULAS, DIAPOSITIVAS Y OTRAS PRESENTACIONES VISUALES',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'spatial'
    },
    
    // Inteligencia Física y Cinestésica (5 preguntas)
    {
        section: 4,
        type: 'scale',
        category: 'INTELIGENCIA FÍSICA Y CINESTÉSICA',
        question: 'SE DESTACA EN UNO O MÁS DEPORTES',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'bodily'
    },
    {
        section: 4,
        type: 'scale',
        category: 'INTELIGENCIA FÍSICA Y CINESTÉSICA',
        question: 'SE MUEVE O ESTÁ INQUIETO CUANDO ESTÁ SENTADO MUCHO TIEMPO',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'bodily'
    },
    {
        section: 4,
        type: 'scale',
        category: 'INTELIGENCIA FÍSICA Y CINESTÉSICA',
        question: 'IMITA MUY BIEN LOS GESTOS Y MOVIMIENTOS CARACTERÍSTICOS DE OTRAS PERSONAS',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'bodily'
    },
    {
        section: 4,
        type: 'scale',
        category: 'INTELIGENCIA FÍSICA Y CINESTÉSICA',
        question: 'LE ENCANTA DESARMAR COSAS Y VOLVERLAS A ARMAR',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'bodily'
    },
    {
        section: 4,
        type: 'scale',
        category: 'INTELIGENCIA FÍSICA Y CINESTÉSICA',
        question: 'APENAS VE ALGO, LO TOCA TODO CON LAS MANOS',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'bodily'
    },
    
    // Inteligencia Musical (5 preguntas)
    {
        section: 5,
        type: 'scale',
        category: 'INTELIGENCIA MUSICAL',
        question: 'SE DA CUENTA CUANDO LA MÚSICA ESTÁ DESTONADA O SUENA MAL',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'musical'
    },
    {
        section: 5,
        type: 'scale',
        category: 'INTELIGENCIA MUSICAL',
        question: 'RECUERDA LAS MELODÍAS DE LAS CANCIONES',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'musical'
    },
    {
        section: 5,
        type: 'scale',
        category: 'INTELIGENCIA MUSICAL',
        question: 'TIENE BUENA VOZ PARA CANTAR',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'musical'
    },
    {
        section: 5,
        type: 'scale',
        category: 'INTELIGENCIA MUSICAL',
        question: 'TOCA UN INSTRUMENTO MUSICAL O CANTA EN UN CORO O ALGÚN OTRO GRUPO',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'musical'
    },
    {
        section: 5,
        type: 'scale',
        category: 'INTELIGENCIA MUSICAL',
        question: 'CANTURREA SIN DARSE CUENTA',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'musical'
    },
    
    // Inteligencia Interpersonal (5 preguntas)
    {
        section: 6,
        type: 'scale',
        category: 'INTELIGENCIA INTERPERSONAL',
        question: 'DISFRUTA CONVERSAR CON SUS COMPAÑEROS',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'interpersonal'
    },
    {
        section: 6,
        type: 'scale',
        category: 'INTELIGENCIA INTERPERSONAL',
        question: 'TIENE CARACTERÍSTICAS DE LÍDER NATURAL',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'interpersonal'
    },
    {
        section: 6,
        type: 'scale',
        category: 'INTELIGENCIA INTERPERSONAL',
        question: 'ACONSEJA A LOS AMIGOS QUE TIENEN PROBLEMAS',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'interpersonal'
    },
    {
        section: 6,
        type: 'scale',
        category: 'INTELIGENCIA INTERPERSONAL',
        question: 'PARECE TENER BUEN SENTIDO COMÚN',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'interpersonal'
    },
    {
        section: 6,
        type: 'scale',
        category: 'INTELIGENCIA INTERPERSONAL',
        question: 'PERTENECE A CLUBES, COMITÉS Y OTRAS ORGANIZACIONES',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'interpersonal'
    },
    
    // Inteligencia Intrapersonal (5 preguntas)
    {
        section: 7,
        type: 'scale',
        category: 'INTELIGENCIA INTRAPERSONAL',
        question: 'DEMUESTRA SENTIDO DE INDEPENDENCIA O VOLUNTAD FUERTE',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'intrapersonal'
    },
    {
        section: 7,
        type: 'scale',
        category: 'INTELIGENCIA INTRAPERSONAL',
        question: 'TIENE UN CONCEPTO PRÁCTICO DE SUS HABILIDADES Y DEBILIDADES',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'intrapersonal'
    },
    {
        section: 7,
        type: 'scale',
        category: 'INTELIGENCIA INTRAPERSONAL',
        question: 'PRESENTA BUEN DESEMPEÑO CUANDO ESTÁ SOLO JUGANDO O ESTUDIANDO',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'intrapersonal'
    },
    {
        section: 7,
        type: 'scale',
        category: 'INTELIGENCIA INTRAPERSONAL',
        question: 'LLEVA UN BUEN ESTILO DE VIDA Y APRENDIZAJE',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'intrapersonal'
    },
    {
        section: 7,
        type: 'scale',
        category: 'INTELIGENCIA INTRAPERSONAL',
        question: 'TIENE UN INTERÉS O PASATIEMPO SOBRE EL QUE NO HABLA MUCHO CON LOS DEMÁS',
        scale: [1, 2, 3, 4, 5],
        intelligence: 'intrapersonal'
    },
    
    // PARTE 2: ESTILOS DE APRENDIZAJE (45 preguntas - SI/NO)
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'TENGO FAMA DE DECIR LO QUE PIENSO CLARAMENTE Y SIN RODEOS', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ESTOY SEGURO/A DE LO QUE ES BUENO Y LO QUE ES MALO, LO QUE ESTÁ BIEN Y LO QUE ESTÁ MAL', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'MUCHAS VECES ACTÚO SIN MIRAR LAS CONSECUENCIAS', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'NORMALMENTE TRATO DE RESOLVER LOS PROBLEMAS METÓDICAMENTE Y PASO A PASO', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'CREO QUE LOS FORMALISMOS COARTAN Y LIMITAN LA ACTUACIÓN LIBRE DE LAS PERSONAS', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME INTERESA SABER CUÁLES SON LOS SISTEMAS DE VALORES DE LOS DEMÁS Y CON QUÉ CRITERIOS', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'PIENSO QUE EL ACTUAR INTUITIVAMENTE PUEDE SER SIEMPRE TAN VÁLIDO COMO ACTUAR REFLEXIVAMENTE', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'CREO QUE LO MÁS IMPORTANTE ES QUE LAS COSAS FUNCIONEN', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'PROCURO ESTAR AL TANTO DE LO QUE OCURRE AQUÍ Y AHORA', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'DISFRUTO CUANDO TENGO TIEMPO PARA PREPARAR MI TRABAJO Y REALIZARLO A CONCIENCIA', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ESTOY A GUSTO SIGUIENDO UN ORDEN, EN LAS COMIDAS, EN EL ESTUDIO, HACIENDO EJERCICIO REGULARMENTE', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'CUANDO ESCUCHO UNA NUEVA IDEA ENSEGUIDA COMIENZO A PENSAR CÓMO PONERLA EN PRÁCTICA', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'PREFIERO LAS IDEAS ORIGINALES Y NOVEDOSAS AUNQUE NO SEAN PRÁCTICAS', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ADMITO Y ME AJUSTO A LAS NORMAS SOLO SI ME SIRVEN PARA LOGRAR MIS OBJETIVOS', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'NORMALMENTE ENCAJO BIEN CON PERSONAS REFLEXIVAS, Y ME CUESTAN SINCRONIZAR CON PERSONAS DEMASIADO ESPONTÁNEAS E IMPREVISIBLES', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ESCUCHO CON MÁS FRECUENCIA QUE HABLO', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'PREFIERO LAS COSAS ESTRUCTURADAS A LAS DESORDENADAS', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'CUANDO POSEO CUALQUIER INFORMACIÓN, TRATO DE INTERPRETARLA BIEN ANTES DE MANIFESTAR ALGUNA CONCLUSIÓN', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ANTES DE HACER ALGO ESTUDIO CON CUIDADO SUS VENTAJAS E INCONVENIENTES', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME CREZCO CON EL RETO DE HACER ALGO NUEVO Y DIFERENTE', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'CASI SIEMPRE PROCURO SER COHERENTE CON MIS CRITERIOS Y SISTEMAS DE VALORES. TENGO PRINCIPIOS Y LOS SIGO', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'CUANDO HAY UNA DISCUSIÓN NO ME GUSTA IR CON RODEOS', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME DISGUSTA IMPLICARME AFECTIVAMENTE EN MI AMBIENTE DE TRABAJO. PREFIERO MANTENER RELACIONES DISTANTES', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME GUSTAN MÁS LAS PERSONAS REALISTAS Y CONCRETAS QUE LAS TEÓRICAS', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME GUSTA SER CREATIVO/A, ROMPER ESTRUCTURAS', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME SIENTO A GUSTO CON LAS PERSONAS DIVERTIDAS Y ESPONTÁNEAS', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'LA MAYORÍA DE LAS VECES EXPRESO ABIERTAMENTE CÓMO ME SIENTO', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME GUSTA ANALIZAR Y DAR VUELTAS A LAS COSAS', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME MOLESTA QUE LA GENTE NO SE TOME EN SERIO LAS COSAS', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME ATRAE EXPERIMENTAR Y PRACTICAR LAS ÚLTIMAS TÉCNICAS Y NOVEDADES', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'SOY CAUTELOSO/A A LA HORA DE SACAR CONCLUSIONES', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'PREFIERO CONTAR CON EL MAYOR NÚMERO DE FUENTES DE INFORMACIÓN. CUANTOS MÁS DATOS REÚNA PARA REFLEXIONAR, MEJOR', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'TIENDO A SER PERFECCIONISTA', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'PREFIERO OÍR LAS OPINIONES DE LOS DEMÁS ANTES DE EXPONER LA MÍA', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME GUSTA AFRONTAR LA VIDA ESPONTÁNEAMENTE Y NO TENER QUE PLANIFICAR TODO PREVIAMENTE', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'EN LAS DISCUSIONES ME GUSTA OBSERVAR CÓMO ACTÚAN LOS DEMÁS PARTICIPANTES', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME SIENTO INCÓMODO/A CON LAS PERSONAS CALLADAS Y DEMASIADO ANALÍTICAS', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'JUZGO CON FRECUENCIA LAS IDEAS DE LOS DEMÁS POR SU VALOR PRÁCTICO', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME AGOBIO SI ME OBLIGAN A ACELERAR MUCHO EL TRABAJO PARA CUMPLIR UN PLAZO', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'EN LAS REUNIONES APOYO LAS IDEAS PRÁCTICAS Y REALISTAS', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ES MEJOR GOZAR DEL MOMENTO PRESENTE QUE DELEITARSE PENSANDO EN EL PASADO O EN EL FUTURO', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME MOLESTAN LAS PERSONAS QUE SIEMPRE DESEAN APRESURAR LAS COSAS', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'APORTO IDEAS NUEVAS Y ESPONTÁNEAS EN LOS GRUPOS DE DISCUSIÓN', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'PIENSO QUE SON MÁS CONSISTENTES LAS DECISIONES FUNDAMENTADAS EN UN MINUCIOSO ANÁLISIS QUE LAS BASADAS EN LA INTUICIÓN', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'DETECTO FRECUENTEMENTE LA INCONSISTENCIA Y PUNTOS DÉBILES EN LA ARGUMENTACIÓN DE LOS DEMÁS', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'CREO QUE ES PRECISO SALTARSE LAS NORMAS MUCHAS VECES QUE CUMPLIRLAS', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'A MENUDO CAIGO EN LA CUENTA DE OTRAS FORMAS MEJORES Y MÁS PRÁCTICAS DE HACER LAS COSAS', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'EN CONJUNTO HABLO MÁS DE LO QUE ESCUCHO', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'PREFIERO DISTANCIARME DE LOS HECHOS Y OBSERVARLOS DESDE OTRAS PERSPECTIVAS', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ESTOY CONVENCIDO/A QUE DEBE IMPONERSE LA LÓGICA Y EL RAZONAMIENTO', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME GUSTA BUSCAR NUEVAS EXPERIENCIAS', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME GUSTA EXPERIMENTAR Y APLICAR LAS COSAS', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'PIENSO QUE DEBEMOS LLEGAR PRONTO AL GRANO, AL MEOLLO DE LOS TEMAS', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'SIEMPRE TRATO DE CONSEGUIR CONCLUSIONES E IDEAS CLARAS', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'PREFIERO DISCUTIR CUESTIONES CONCRETAS Y NO PERDER EL TIEMPO CON CHARLAS VACÍAS', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME IMPACIENTO CUANDO ME DAN EXPLICACIONES IRRELEVANTES E INCOHERENTES', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'COMPRUEBO ANTES SI LAS COSAS FUNCIONAN REALMENTE', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'HAGO VARIOS BORRADORES ANTES DE LA REDACCIÓN DEFINITIVA DE UN TRABAJO', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'SOY CONSCIENTE DE QUE EN LAS DISCUSIONES AYUDO A MANTENER A LOS DEMÁS CENTRADOS EN EL TEMA, EVITANDO DIVAGACIONES', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'OBSERVO QUE CON FRECUENCIA, SOY UNO/A DE LOS/AS MÁS OBJETIVOS/AS Y DESAPASIONADOS/AS EN LAS DISCUSIONES', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'CUANDO ALGO VA MAL, LE QUITO IMPORTANCIA Y TRATO DE HACERLO MEJOR', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'RECHAZO IDEAS ORIGINALES Y ESPONTÁNEAS SI NO LAS VEO PRÁCTICAS', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME GUSTA SOPESAR DIVERSAS ALTERNATIVAS ANTES DE TOMAR UNA DECISIÓN', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'CON FRECUENCIA MIRO HACIA DELANTE PARA PREVER EL FUTURO', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'EN LOS DEBATES Y DISCUSIONES PREFIERO DESEMPEÑAR UN PAPEL SECUNDARIO ANTES QUE SER EL/LA LÍDER O EL/LA QUE MÁS PARTICIPA', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME MOLESTAN LAS PERSONAS QUE NO ACTÚAN CON LÓGICA', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ME RESULTA INCÓMODO TENER QUE PLANIFICAR Y PREVER LAS COSAS', learning: 'active'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'CREO QUE EL FIN JUSTIFICA LOS MEDIOS EN MUCHOS CASOS', learning: 'pragmatic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'SELO REFLEXIONAR SOBRE LOS ASUNTOS Y PROBLEMAS', learning: 'reflective'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'EL TRABAJO A CONCIENCIA ME LLENA DE SATISFACCIÓN Y ORGULLO', learning: 'theoretic'},
    {section: 8, type: 'yesno', category: 'Estilos de Aprendizaje', question: 'ANTE LOS ACONTECIMIENTOS TRATO DE DESCUBRIR LOS PRINCIPIOS Y TEORÍAS EN QUE SE BASAN', learning: 'theoretic'}
];

// Estado global
const appState = new AppState();

// ==============================================
// INICIALIZACIÓN
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const startBtn = document.getElementById('startTestBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startTest);
    }
    loadUserData();
}

function loadUserData() {
    const saved = localStorage.getItem('userInfo');
    if (saved) {
        appState.userInfo = JSON.parse(saved);
    }
}

// ==============================================
// FLUJO DEL TEST
// ==============================================
function startTest() {
    appState.currentStep = 'form';
    showSection('userFormSection');
}

function submitUserForm(e) {
    e.preventDefault();
    
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        edad: document.getElementById('edad').value,
        profesion: document.getElementById('profesion').value
    };
    
    appState.userInfo = formData;
    localStorage.setItem('userInfo', JSON.stringify(formData));
    
    appState.currentStep = 'test';
    appState.startTime = Date.now();
    appState.currentQuestion = 0;
    
    showSection('testSection');
    renderQuestion();
}

// Función alias para compatibilidad con HTML
function renderCurrentQuestion() {
    renderQuestion();
}

// Función para inicializar el flujo de preguntas
function startQuestionFlow() {
    renderQuestion();
}

function renderQuestion() {
    if (appState.currentQuestion >= QUESTIONS.length) {
        finishTest();
        return;
    }
    
    const question = QUESTIONS[appState.currentQuestion];
    const container = document.getElementById('questionContainer');
    
    // Actualizar barra de progreso
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        const percentage = ((appState.currentQuestion + 1) / QUESTIONS.length) * 100;
        progressBar.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `Pregunta ${appState.currentQuestion + 1} de ${QUESTIONS.length}`;
    }
    
    let html = `
        <div class="question-content">
            <div class="question-category">${question.category}</div>
            <h3 class="question-text">${question.question}</h3>
            
            <div class="options-container">
    `;
    
    if (question.type === 'scale') {
        // Escala 1-5
        html += '<div class="scale-options">';
        question.scale.forEach(value => {
            html += `
                <button class="scale-button" data-value="${value}" onclick="selectScaleAnswer(${value})">
                    <span class="scale-number">${value}</span>
                </button>
            `;
        });
        html += '</div>';
    } else if (question.type === 'yesno') {
        // SI/NO
        html += `
            <button class="option-button yes-button" data-value="si" onclick="selectYesNoAnswer('si')">
                <i class="fas fa-check"></i> SÍ
            </button>
            <button class="option-button no-button" data-value="no" onclick="selectYesNoAnswer('no')">
                <i class="fas fa-times"></i> NO
            </button>
        `;
    }
    
    html += `
            </div>
            
            <div class="test-navigation">
                ${appState.currentQuestion > 0 ? '<button class="btn btn-secondary" onclick="previousQuestion()"><i class="fas fa-arrow-left"></i> Anterior</button>' : ''}
                <button class="btn btn-primary" id="nextBtn" onclick="nextQuestion()" disabled>
                    ${appState.currentQuestion === QUESTIONS.length - 1 ? 'Finalizar' : 'Siguiente'} <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function selectScaleAnswer(value) {
    appState.scaleAnswers[appState.currentQuestion] = value;
    document.getElementById('nextBtn').disabled = false;
    
    // Visual feedback
    document.querySelectorAll('.scale-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.scale-button').classList.add('selected');
}

function selectYesNoAnswer(value) {
    appState.learningAnswers[appState.currentQuestion] = value;
    document.getElementById('nextBtn').disabled = false;
    
    // Visual feedback
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.option-button').classList.add('selected');
}

function nextQuestion() {
    if (appState.currentQuestion < QUESTIONS.length - 1) {
        appState.currentQuestion++;
        renderQuestion();
    } else {
        finishTest();
    }
}

function previousQuestion() {
    if (appState.currentQuestion > 0) {
        appState.currentQuestion--;
        renderQuestion();
    }
}

function finishTest() {
    appState.currentStep = 'results';
    calculateResults();
    showSection('resultsSection');
    sendEmailWithResults();
}

// ==============================================
// CÁLCULO DE RESULTADOS
// ==============================================
function calculateResults() {
    // Calcular puntuaciones de inteligencias múltiples
    const intelligences = {
        linguistic: 0,
        logical: 0,
        spatial: 0,
        bodily: 0,
        musical: 0,
        interpersonal: 0,
        intrapersonal: 0
    };
    
    QUESTIONS.slice(0, 35).forEach((q, idx) => {
        if (appState.scaleAnswers[idx]) {
            intelligences[q.intelligence] += appState.scaleAnswers[idx];
        }
    });
    
    // Calcular estilos de aprendizaje
    const learningStyles = {
        active: 0,
        reflective: 0,
        theoretic: 0,
        pragmatic: 0
    };
    
    // Mapear respuestas a estilos de aprendizaje
    // Preguntas 35-44: Estilo Activo
    // Preguntas 45-54: Estilo Reflexivo
    // Preguntas 55-64: Estilo Teórico
    // Preguntas 65-74: Estilo Pragmático
    
    for (let i = 0; i < 10; i++) {
        if (appState.learningAnswers[35 + i] === 'si') learningStyles.active++;
        if (appState.learningAnswers[45 + i] === 'si') learningStyles.reflective++;
        if (appState.learningAnswers[55 + i] === 'si') learningStyles.theoretic++;
        if (appState.learningAnswers[65 + i] === 'si') learningStyles.pragmatic++;
    }
    
    appState.results = {
        intelligences,
        learningStyles,
        totalTime: Date.now() - appState.startTime
    };
}

function displayResults() {
    const container = document.getElementById('resultsContent');
    
    let html = `
        <div class="results-header">
            <h2>Resultados de tu Análisis</h2>
            <p>Hola ${appState.userInfo.nombre}, aquí están tus resultados:</p>
        </div>
        
        <div class="results-sections">
            <div class="results-card">
                <h3><i class="fas fa-brain"></i> Inteligencias Múltiples</h3>
                <div class="intelligence-results">
    `;
    
    Object.entries(appState.results.intelligences).forEach(([key, value]) => {
        const percentage = (value / 25) * 100;
        html += `
            <div class="intelligence-item">
                <span class="intelligence-name">${formatIntelligenceName(key)}</span>
                <div class="progress-bar-small">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="intelligence-score">${value}/25</span>
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
            
            <div class="results-card">
                <h3><i class="fas fa-graduation-cap"></i> Estilos de Aprendizaje</h3>
                <div class="learning-results">
    `;
    
    Object.entries(appState.results.learningStyles).forEach(([key, value]) => {
        const percentage = (value / 11) * 100; // Aprox 11 preguntas por estilo
        html += `
            <div class="learning-item">
                <span class="learning-name">${formatLearningStyle(key)}</span>
                <div class="progress-bar-small">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="learning-score">${value} respuestas</span>
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
        </div>
        
        <div class="results-actions">
            <button class="btn btn-primary" onclick="goToHome()">
                <i class="fas fa-home"></i> Ir a Inicio
            </button>
            <button class="btn btn-secondary" onclick="downloadResults()">
                <i class="fas fa-download"></i> Descargar Resultados
            </button>
        </div>
    `;
    
    container.innerHTML = html;
}

function formatIntelligenceName(key) {
    const names = {
        linguistic: 'Lingüística',
        logical: 'Lógica y Matemática',
        spatial: 'Espacial',
        bodily: 'Física y Cinestésica',
        musical: 'Musical',
        interpersonal: 'Interpersonal',
        intrapersonal: 'Intrapersonal'
    };
    return names[key] || key;
}

function formatLearningStyle(key) {
    const names = {
        active: 'Activo',
        reflective: 'Reflexivo',
        theoretic: 'Teórico',
        pragmatic: 'Pragmático'
    };
    return names[key] || key;
}

// ==============================================
// ENVÍO DE EMAIL
// ==============================================
function sendEmailWithResults() {
    const emailData = {
        nombre: appState.userInfo.nombre,
        email: appState.userInfo.email,
        edad: appState.userInfo.edad,
        profesion: appState.userInfo.profesion,
        resultados: JSON.stringify(appState.results),
        fecha: new Date().toLocaleString()
    };
    
    fetch(CONFIG.emailEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Email enviado:', data);
    })
    .catch(error => console.error('Error al enviar email:', error));
    
    displayResults();
}

// ==============================================
// NAVEGACIÓN
// ==============================================
function goToHome() {
    window.location.href = CONFIG.redirectUrl;
}

function downloadResults() {
    const data = {
        usuario: appState.userInfo,
        resultados: appState.results,
        fecha: new Date().toLocaleString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resultados_test_${appState.userInfo.nombre}.json`;
    link.click();
}

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}