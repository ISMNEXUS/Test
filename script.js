console.log('🚀 Script cargado');

const CONFIG = {
    totalQuestions: 40,
    originalQuestions: 80,
    apiEndpoint: 'api.php',
    emailEndpoint: 'correo.php',
    redirectUrl: 'https://www.tu-sitio.com'
};

class AppState {
    constructor() {
        this.currentStep = 'hero';
        this.currentQuestion = 0;
        this.answers = [];
        this.userInfo = {};
        this.startTime = null;
        this.results = {};
        this.selectedQuestions = [];
    }
    
    reset() {
        this.currentStep = 'hero';
        this.currentQuestion = 0;
        this.answers = [];
        this.userInfo = {};
        this.startTime = null;
        this.results = {};
        this.selectedQuestions = [];
    }
}

const state = new AppState();

const QUESTIONS = [
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

function loadUserData() {
    try {
        const savedData = localStorage.getItem('testUserData');
        if (savedData) {
            const data = JSON.parse(savedData);
            state.userInfo = data;
            console.log('Datos de usuario cargados desde localStorage');
        }
    } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
    }
}

function initializeApp() {
    loadUserData();
    
    window.startTest = startTest;
    window.goBack = goBack;
    window.exitTest = exitTest;
    window.showSection = showSection;
    window.submitUserForm = submitUserForm;
    window.selectScaleAnswer = selectScaleAnswer;
    window.selectYesNoAnswer = selectYesNoAnswer;
    window.nextQuestion = nextQuestion;
    window.previousQuestion = previousQuestion;
    window.retakeTest = retakeTest;
    window.downloadResults = downloadResults;
    
    setupEventListeners();
    
    console.log('✅ Aplicación inicializada correctamente');
}

function setupEventListeners() {
    const startTestBtn = document.getElementById('startTestBtn');
    if (startTestBtn) {
        startTestBtn.addEventListener('click', startTest);
        console.log('✅ startTestBtn listener agregado');
    }
    
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', submitUserForm);
        console.log('✅ userForm listener agregado');
    }
    
    const goBackBtn = document.getElementById('goBackBtn');
    if (goBackBtn) {
        goBackBtn.addEventListener('click', goBack);
        console.log('✅ goBackBtn listener agregado');
    }
    
    const exitTestBtn = document.getElementById('exitTestBtn');
    if (exitTestBtn) {
        exitTestBtn.addEventListener('click', exitTest);
        console.log('✅ exitTestBtn listener agregado');
    }
    
    const retakeTestBtn = document.getElementById('retakeTestBtn');
    if (retakeTestBtn) {
        retakeTestBtn.addEventListener('click', retakeTest);
        console.log('✅ retakeTestBtn listener agregado');
    }
    
    const downloadResultsBtn = document.getElementById('downloadResultsBtn');
    if (downloadResultsBtn) {
        downloadResultsBtn.addEventListener('click', downloadResults);
        console.log('✅ downloadResultsBtn listener agregado');
    }
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        state.currentStep = sectionId;
        console.log('Mostrando sección:', sectionId);
    }
}

function startTest() {
    console.log('Iniciando test...');
    showSection('userInfo');
}

function submitUserForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const age = document.getElementById('userAge').value.trim();
    const gender = document.getElementById('userGender').value;
    
    if (!name || !email || !age || !gender) {
        alert('Por favor, completa todos los campos');
        return;
    }
    
    state.userInfo = { name, email, age, gender };
    
    try {
        localStorage.setItem('testUserData', JSON.stringify(state.userInfo));
    } catch (error) {
        console.error('Error al guardar datos en localStorage:', error);
    }
    
    state.selectedQuestions = selectBalancedQuestions();
    state.currentQuestion = 0;
    state.answers = [];
    state.startTime = Date.now();
    
    showSection('test');
    renderQuestion();
}

function selectBalancedQuestions() {
    const scaleQuestions = QUESTIONS.filter(q => q.type === 'scale');
    const yesnoQuestions = QUESTIONS.filter(q => q.type === 'yesno');
    
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };
    
    const selectedScale = shuffleArray(scaleQuestions).slice(0, 20);
    const selectedYesNo = shuffleArray(yesnoQuestions).slice(0, 20);
    
    return shuffleArray([...selectedScale, ...selectedYesNo]);
}

function renderQuestion() {
    const question = state.selectedQuestions[state.currentQuestion];
    
    document.getElementById('questionNumber').textContent = state.currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = CONFIG.totalQuestions;
    document.getElementById('questionCategory').textContent = question.category;
    document.getElementById('questionText').textContent = question.question;
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    if (question.type === 'scale') {
        const scaleContainer = document.createElement('div');
        scaleContainer.className = 'scale-container';
        
        question.scale.forEach(value => {
            const button = document.createElement('button');
            button.className = 'scale-btn';
            button.textContent = value;
            button.onclick = () => selectScaleAnswer(value);
            scaleContainer.appendChild(button);
        });
        
        answersContainer.appendChild(scaleContainer);
    } else {
        const yesNoContainer = document.createElement('div');
        yesNoContainer.className = 'yesno-container';
        
        const yesBtn = document.createElement('button');
        yesBtn.className = 'yesno-btn';
        yesBtn.textContent = 'SI';
        yesBtn.onclick = () => selectYesNoAnswer(true);
        
        const noBtn = document.createElement('button');
        noBtn.className = 'yesno-btn';
        noBtn.textContent = 'NO';
        noBtn.onclick = () => selectYesNoAnswer(false);
        
        yesNoContainer.appendChild(yesBtn);
        yesNoContainer.appendChild(noBtn);
        answersContainer.appendChild(yesNoContainer);
    }
    
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.style.display = state.currentQuestion === 0 ? 'none' : 'block';
    }
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = ((state.currentQuestion + 1) / CONFIG.totalQuestions) * 100;
        progressBar.style.width = progress + '%';
    }
}

function selectScaleAnswer(value) {
    const question = state.selectedQuestions[state.currentQuestion];
    state.answers[state.currentQuestion] = {
        questionIndex: state.currentQuestion,
        question: question.question,
        answer: value,
        type: question.type,
        intelligence: question.intelligence,
        learning: question.learning
    };
    
    nextQuestion();
}

function selectYesNoAnswer(value) {
    const question = state.selectedQuestions[state.currentQuestion];
    state.answers[state.currentQuestion] = {
        questionIndex: state.currentQuestion,
        question: question.question,
        answer: value ? 1 : 0,
        type: question.type,
        intelligence: question.intelligence,
        learning: question.learning
    };
    
    nextQuestion();
}

function nextQuestion() {
    if (state.currentQuestion < CONFIG.totalQuestions - 1) {
        state.currentQuestion++;
        renderQuestion();
    } else {
        calculateResults();
        showResults();
    }
}

function previousQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        renderQuestion();
    }
}

function calculateResults() {
    const scores = {
        linguistic: 0,
        logical: 0,
        spatial: 0,
        bodily: 0,
        musical: 0,
        interpersonal: 0,
        intrapersonal: 0,
        active: 0,
        reflective: 0,
        theoretic: 0,
        pragmatic: 0
    };
    
    const counts = {
        linguistic: 0,
        logical: 0,
        spatial: 0,
        bodily: 0,
        musical: 0,
        interpersonal: 0,
        intrapersonal: 0,
        active: 0,
        reflective: 0,
        theoretic: 0,
        pragmatic: 0
    };
    
    state.answers.forEach(answer => {
        if (answer.intelligence) {
            scores[answer.intelligence] += answer.answer;
            counts[answer.intelligence]++;
        }
        if (answer.learning) {
            scores[answer.learning] += answer.answer;
            counts[answer.learning]++;
        }
    });
    
    for (let key in scores) {
        if (counts[key] > 0) {
            scores[key] = (scores[key] / counts[key]).toFixed(2);
        }
    }
    
    state.results = {
        scores,
        timestamp: new Date().toISOString(),
        duration: Math.round((Date.now() - state.startTime) / 1000)
    };
}

function showResults() {
    showSection('results');
    
    const scores = state.results.scores;
    
    const intelligences = [
        { key: 'linguistic', label: 'Lingüística' },
        { key: 'logical', label: 'Lógica-Matemática' },
        { key: 'spatial', label: 'Espacial' },
        { key: 'bodily', label: 'Corporal-Cinestésica' },
        { key: 'musical', label: 'Musical' },
        { key: 'interpersonal', label: 'Interpersonal' },
        { key: 'intrapersonal', label: 'Intrapersonal' }
    ];
    
    const learningStyles = [
        { key: 'active', label: 'Activo' },
        { key: 'reflective', label: 'Reflexivo' },
        { key: 'theoretic', label: 'Teórico' },
        { key: 'pragmatic', label: 'Pragmático' }
    ];
    
    const intelligencesContainer = document.getElementById('intelligencesResults');
    const learningContainer = document.getElementById('learningResults');
    
    if (intelligencesContainer) {
        intelligencesContainer.innerHTML = intelligences.map(intel => `
            <div class="result-item">
                <div class="result-label">${intel.label}</div>
                <div class="result-bar">
                    <div class="result-fill" style="width: ${(scores[intel.key] / 5) * 100}%"></div>
                </div>
                <div class="result-score">${scores[intel.key]}</div>
            </div>
        `).join('');
    }
    
    if (learningContainer) {
        learningContainer.innerHTML = learningStyles.map(style => `
            <div class="result-item">
                <div class="result-label">${style.label}</div>
                <div class="result-bar">
                    <div class="result-fill" style="width: ${(scores[style.key] / 1) * 100}%"></div>
                </div>
                <div class="result-score">${scores[style.key]}</div>
            </div>
        `).join('');
    }
    
    createRadarChart();
    generateRecommendations();
    
    saveToDatabase();
    sendEmail();
}

function createRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas || !window.Chart) return;
    
    const ctx = canvas.getContext('2d');
    const scores = state.results.scores;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Lingüística', 'Lógica', 'Espacial', 'Corporal', 'Musical', 'Interpersonal', 'Intrapersonal'],
            datasets: [{
                label: 'Inteligencias Múltiples',
                data: [
                    scores.linguistic,
                    scores.logical,
                    scores.spatial,
                    scores.bodily,
                    scores.musical,
                    scores.interpersonal,
                    scores.intrapersonal
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    });
}

function generateRecommendations() {
    const scores = state.results.scores;
    
    const intelligences = [
        { key: 'linguistic', label: 'Lingüística', recommendation: 'Lee libros, escribe diarios, participa en debates.' },
        { key: 'logical', label: 'Lógica-Matemática', recommendation: 'Resuelve puzzles, estudia matemáticas, programa.' },
        { key: 'spatial', label: 'Espacial', recommendation: 'Dibuja, diseña, juega con bloques de construcción.' },
        { key: 'bodily', label: 'Corporal', recommendation: 'Practica deportes, baila, haz manualidades.' },
        { key: 'musical', label: 'Musical', recommendation: 'Aprende un instrumento, canta, escucha música variada.' },
        { key: 'interpersonal', label: 'Interpersonal', recommendation: 'Trabaja en equipo, lidera proyectos, socializa.' },
        { key: 'intrapersonal', label: 'Intrapersonal', recommendation: 'Medita, reflexiona, lleva un diario personal.' }
    ];
    
    const sortedIntelligences = intelligences
        .map(intel => ({ ...intel, score: parseFloat(scores[intel.key]) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    
    const recommendationsContainer = document.getElementById('recommendations');
    if (recommendationsContainer) {
        recommendationsContainer.innerHTML = `
            <h3>Tus 3 inteligencias más desarrolladas:</h3>
            ${sortedIntelligences.map(intel => `
                <div class="recommendation-item">
                    <h4>${intel.label} (${intel.score})</h4>
                    <p>${intel.recommendation}</p>
                </div>
            `).join('')}
        `;
    }
}

function downloadResults() {
    const results = {
        userInfo: state.userInfo,
        results: state.results,
        answers: state.answers
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `resultados-${state.userInfo.name}-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

function retakeTest() {
    state.reset();
    showSection('hero');
}

function saveToDatabase() {
    const data = {
        userInfo: state.userInfo,
        results: state.results,
        answers: state.answers
    };
    
    fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos guardados en la base de datos:', data);
    })
    .catch(error => {
        console.error('Error al guardar en la base de datos:', error);
    });
}

function sendEmail() {
    const data = {
        userInfo: state.userInfo,
        results: state.results
    };
    
    fetch(CONFIG.emailEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Correo enviado:', data);
    })
    .catch(error => {
        console.error('Error al enviar correo:', error);
    });
}

function goBack() {
    if (state.currentStep === 'test') {
        if (confirm('¿Estás seguro de que quieres volver? Perderás tu progreso.')) {
            showSection('userInfo');
        }
    } else {
        showSection('hero');
    }
}

function exitTest() {
    if (confirm('¿Estás seguro de que quieres salir? Perderás todo tu progreso.')) {
        state.reset();
        showSection('hero');
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);
