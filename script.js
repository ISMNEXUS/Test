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

const appState = new AppState();
window.appState = appState;

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
            appState.userInfo = data;
            console.log('Datos de usuario cargados desde localStorage');
        }
    } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
    }
}

function initializeApp() {
    console.log('📦 Iniciando aplicación...');
    
    loadUserData();
    
    console.log('🎯 Registrando funciones en window...');
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
    console.log('✅ Funciones registradas en window');
    
    console.log('🎯 Configurando event listeners...');
    setupEventListeners();
    
    console.log('✅ Aplicación inicializada correctamente');
    console.log('✅ Total de preguntas:', QUESTIONS.length);
}

function setupEventListeners() {
    console.log('   Buscando botones...');
    
    const startTestBtn = document.getElementById('startTestBtn');
    if (startTestBtn) {
        startTestBtn.addEventListener('click', () => {
            console.log('🖱️ Click detectado en startTestBtn');
            startTest();
        });
        console.log('   ✅ Event listener agregado: startTestBtn');
    } else {
        console.warn('   ⚠️ No se encontró: startTestBtn');
    }
    
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', submitUserForm);
        console.log('   ✅ Event listener agregado: userForm');
    } else {
        console.warn('   ⚠️ No se encontró: userForm');
    }
    
    const goBackBtn = document.getElementById('goBackBtn');
    if (goBackBtn) {
        goBackBtn.addEventListener('click', goBack);
        console.log('   ✅ Event listener agregado: goBackBtn');
    } else {
        console.warn('   ⚠️ No se encontró: goBackBtn');
    }
    
    const exitTestBtn = document.getElementById('exitTestBtn');
    if (exitTestBtn) {
        exitTestBtn.addEventListener('click', exitTest);
        console.log('   ✅ Event listener agregado: exitTestBtn');
    } else {
        console.warn('   ⚠️ No se encontró: exitTestBtn');
    }
    
    const retakeTestBtn = document.getElementById('retakeTestBtn');
    if (retakeTestBtn) {
        retakeTestBtn.addEventListener('click', retakeTest);
        console.log('   ✅ Event listener agregado: retakeTestBtn');
    } else {
        console.warn('   ⚠️ No se encontró: retakeTestBtn');
    }
    
    const downloadResultsBtn = document.getElementById('downloadResultsBtn');
    if (downloadResultsBtn) {
        downloadResultsBtn.addEventListener('click', downloadResults);
        console.log('   ✅ Event listener agregado: downloadResultsBtn');
    } else {
        console.warn('   ⚠️ No se encontró: downloadResultsBtn');
    }
    
    console.log('✅ Configuración de event listeners completada');
}

function showSection(sectionId) {
    console.log('📍 showSection llamada con:', sectionId);
    
    // Ocultar todas las secciones
    const allSections = document.querySelectorAll('section');
    console.log('   Total de secciones encontradas:', allSections.length);
    
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar la sección solicitada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        appState.currentStep = sectionId;
        console.log('✅ Sección mostrada:', sectionId);
    } else {
        console.error('❌ Sección no encontrada:', sectionId);
        console.log('   Secciones disponibles:', 
            Array.from(allSections).map(s => s.id).filter(id => id)
        );
    }
}

function startTest() {
    console.log('🚀 Iniciando test...');
    try {
        console.log('   Mostrando sección userFormSection');
        showSection('userFormSection');
        console.log('✅ Test iniciado correctamente');
    } catch (error) {
        console.error('❌ Error al iniciar test:', error);
    }
}

function submitUserForm(e) {
    e.preventDefault();
    
    console.log('📝 Procesando formulario...');
    
    const name = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('edad').value.trim();
    const profession = document.getElementById('profesion').value.trim();
    
    if (!name || !email) {
        alert('Por favor, completa al menos el nombre y email');
        return;
    }
    
    console.log('✅ Datos del formulario válidos');
    appState.userInfo = { name, email, age, profession };
    
    try {
        localStorage.setItem('testUserData', JSON.stringify(appState.userInfo));
        console.log('✅ Datos guardados en localStorage');
    } catch (error) {
        console.error('Error al guardar datos en localStorage:', error);
    }
    
    console.log('🎲 Seleccionando preguntas balanceadas...');
    appState.selectedQuestions = selectBalancedQuestions();
    appState.currentQuestion = 0;
    appState.answers = [];
    appState.startTime = Date.now();
    
    console.log('✅ Preguntas seleccionadas:', appState.selectedQuestions.length);
    console.log('   Mostrando sección de test...');
    showSection('testSection');
    
    setTimeout(() => {
        renderQuestion();
    }, 100);
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
    console.log('🎨 Renderizando pregunta', appState.currentQuestion + 1);
    
    if (!appState.selectedQuestions || appState.selectedQuestions.length === 0) {
        console.error('❌ No hay preguntas seleccionadas');
        console.error('   appState:', appState);
        return;
    }
    
    const question = appState.selectedQuestions[appState.currentQuestion];
    
    if (!question) {
        console.error('❌ Pregunta no encontrada en índice', appState.currentQuestion);
        console.error('   Total preguntas:', appState.selectedQuestions.length);
        return;
    }
    
    console.log('📝 Pregunta a renderizar:', question);
    
    // Actualizar texto de progreso
    const progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = `Pregunta ${appState.currentQuestion + 1} de ${CONFIG.totalQuestions}`;
    }
    
    // Actualizar barra de progreso con animación
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = ((appState.currentQuestion + 1) / CONFIG.totalQuestions) * 100;
        progressBar.style.width = progress + '%';
        progressBar.style.transition = 'width 0.5s ease';
    }
    
    // Renderizar pregunta en el contenedor
    const container = document.getElementById('questionContainer');
    if (!container) {
        console.error('❌ No se encontró questionContainer');
        return;
    }
    
    console.log('📦 Container encontrado, generando HTML...');
    
    // Agregar clase de animación
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    let html = '<div class="question-content">';
    html += '<div class="question-header-info">';
    html += '<span class="question-number">Pregunta ' + (appState.currentQuestion + 1) + '/' + CONFIG.totalQuestions + '</span>';
    html += '<span class="question-category">' + question.category + '</span>';
    html += '</div>';
    html += '<h3 class="question-text">' + question.question + '</h3>';
    
    if (question.type === 'scale') {
        html += '<div class="options-container">';
        html += '<div class="scale-instruction">Selecciona tu nivel de acuerdo:</div>';
        html += '<div class="scale-options">';
        
        const scaleLabels = [
            { value: 1, label: 'Nunca', emoji: '😟' },
            { value: 2, label: 'Raramente', emoji: '😐' },
            { value: 3, label: 'A veces', emoji: '🙂' },
            { value: 4, label: 'Frecuentemente', emoji: '😊' },
            { value: 5, label: 'Siempre', emoji: '😄' }
        ];
        
        scaleLabels.forEach(option => {
            html += '<div class="scale-option">';
            html += '<input type="radio" ';
            html += 'id="scale_' + option.value + '" ';
            html += 'name="question_' + appState.currentQuestion + '" ';
            html += 'value="' + option.value + '" ';
            html += 'onchange="selectScaleAnswer(' + option.value + ')">';
            html += '<label for="scale_' + option.value + '">';
            html += '<span class="scale-emoji">' + option.emoji + '</span>';
            html += '<span class="scale-number">' + option.value + '</span>';
            html += '<span class="scale-label">' + option.label + '</span>';
            html += '</label>';
            html += '</div>';
        });
        
        html += '</div></div>';
    } else {
        html += '<div class="options-container">';
        html += '<div class="boolean-options">';
        html += '<div class="boolean-option">';
        html += '<input type="radio" ';
        html += 'id="yes_option" ';
        html += 'name="question_' + appState.currentQuestion + '" ';
        html += 'value="yes" ';
        html += 'onchange="selectYesNoAnswer(true)">';
        html += '<label for="yes_option" class="boolean-label yes-label">';
        html += '<span class="boolean-icon">✓</span>';
        html += '<span class="boolean-text">SÍ</span>';
        html += '</label>';
        html += '</div>';
        html += '<div class="boolean-option">';
        html += '<input type="radio" ';
        html += 'id="no_option" ';
        html += 'name="question_' + appState.currentQuestion + '" ';
        html += 'value="no" ';
        html += 'onchange="selectYesNoAnswer(false)">';
        html += '<label for="no_option" class="boolean-label no-label">';
        html += '<span class="boolean-icon">✗</span>';
        html += '<span class="boolean-text">NO</span>';
        html += '</label>';
        html += '</div>';
        html += '</div></div>';
    }
    
    // Botones de navegación mejorados
    html += '<div class="question-navigation">';
    if (appState.currentQuestion > 0) {
        html += '<button class="btn-nav btn-prev" onclick="previousQuestion()">← Anterior</button>';
    } else {
        html += '<div></div>';
    }
    html += '<div class="question-counter">';
    html += '<span class="current">' + (appState.currentQuestion + 1) + '</span>';
    html += '<span class="separator">/</span>';
    html += '<span class="total">' + CONFIG.totalQuestions + '</span>';
    html += '</div>';
    html += '</div>';
    
    html += '</div>';
    
    console.log('✅ HTML generado, longitud:', html.length);
    
    try {
        container.innerHTML = html;
        console.log('✅ HTML insertado en container');
    } catch (error) {
        console.error('❌ Error al insertar HTML:', error);
        return;
    }
    
    // Animar entrada
    setTimeout(() => {
        container.style.transition = 'all 0.5s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        console.log('✅ Animación aplicada');
    }, 50);
    
    console.log('✅ Pregunta renderizada correctamente');
}

function selectScaleAnswer(value) {
    console.log('✔️ Respuesta seleccionada:', value);
    
    const question = appState.selectedQuestions[appState.currentQuestion];
    appState.answers[appState.currentQuestion] = {
        questionIndex: appState.currentQuestion,
        question: question.question,
        answer: value,
        type: question.type,
        intelligence: question.intelligence,
        learning: question.learning,
        category: question.category
    };
    
    console.log('✅ Respuesta guardada');
    nextQuestion();
}

function selectYesNoAnswer(value) {
    console.log('✔️ Respuesta seleccionada:', value ? 'SÍ' : 'NO');
    
    const question = appState.selectedQuestions[appState.currentQuestion];
    appState.answers[appState.currentQuestion] = {
        questionIndex: appState.currentQuestion,
        question: question.question,
        answer: value ? 1 : 0,
        type: question.type,
        intelligence: question.intelligence,
        learning: question.learning,
        category: question.category
    };
    
    console.log('✅ Respuesta guardada');
    nextQuestion();
}

function nextQuestion() {
    if (appState.currentQuestion < CONFIG.totalQuestions - 1) {
        appState.currentQuestion++;
        renderQuestion();
    } else {
        calculateResults();
        showResults();
    }
}

function previousQuestion() {
    if (appState.currentQuestion > 0) {
        appState.currentQuestion--;
        renderQuestion();
    }
}

function calculateResults() {
    console.log('📊 Calculando resultados...');
    
    // Inicializar contadores para inteligencias y estilos
    const intelligenceScores = {
        linguistic: { total: 0, count: 0, percentage: 0 },
        logical: { total: 0, count: 0, percentage: 0 },
        spatial: { total: 0, count: 0, percentage: 0 },
        bodily: { total: 0, count: 0, percentage: 0 },
        musical: { total: 0, count: 0, percentage: 0 },
        interpersonal: { total: 0, count: 0, percentage: 0 },
        intrapersonal: { total: 0, count: 0, percentage: 0 },
        naturalist: { total: 0, count: 0, percentage: 0 }
    };
    
    const learningScores = {
        visual: { total: 0, count: 0, percentage: 0 },
        auditory: { total: 0, count: 0, percentage: 0 },
        kinesthetic: { total: 0, count: 0, percentage: 0 },
        readwrite: { total: 0, count: 0, percentage: 0 }
    };
    
    // Procesar respuestas
    appState.answers.forEach((answer, index) => {
        if (!answer) return;
        
        console.log(`Procesando respuesta ${index + 1}:`, answer);
        
        // Convertir respuesta a valor numérico normalizado (0-5)
        const value = parseFloat(answer.answer) || 0;
        
        // Asignar a inteligencia
        if (answer.intelligence && intelligenceScores[answer.intelligence]) {
            intelligenceScores[answer.intelligence].total += value;
            intelligenceScores[answer.intelligence].count++;
        }
        
        // Asignar a estilo de aprendizaje
        if (answer.learning && learningScores[answer.learning]) {
            learningScores[answer.learning].total += value;
            learningScores[answer.learning].count++;
        }
    });
    
    // Calcular promedios y porcentajes
    let maxIntelligence = 0;
    let maxLearning = 0;
    
    for (let key in intelligenceScores) {
        const intel = intelligenceScores[key];
        if (intel.count > 0) {
            intel.average = intel.total / intel.count;
            if (intel.average > maxIntelligence) maxIntelligence = intel.average;
        } else {
            intel.average = 0;
        }
    }
    
    for (let key in learningScores) {
        const style = learningScores[key];
        if (style.count > 0) {
            style.average = style.total / style.count;
            if (style.average > maxLearning) maxLearning = style.average;
        } else {
            style.average = 0;
        }
    }
    
    // Calcular porcentajes relativos
    for (let key in intelligenceScores) {
        if (maxIntelligence > 0) {
            intelligenceScores[key].percentage = (intelligenceScores[key].average / maxIntelligence) * 100;
        }
    }
    
    for (let key in learningScores) {
        if (maxLearning > 0) {
            learningScores[key].percentage = (learningScores[key].average / maxLearning) * 100;
        }
    }
    
    // Determinar inteligencia dominante
    const sortedIntelligences = Object.entries(intelligenceScores)
        .map(([key, data]) => ({ key, ...data }))
        .sort((a, b) => b.average - a.average);
    
    // Determinar estilo de aprendizaje dominante
    const sortedLearning = Object.entries(learningScores)
        .map(([key, data]) => ({ key, ...data }))
        .sort((a, b) => b.average - a.average);
    
    appState.results = {
        intelligences: intelligenceScores,
        learning: learningScores,
        dominant: {
            intelligence: sortedIntelligences[0],
            learning: sortedLearning[0]
        },
        top3: {
            intelligences: sortedIntelligences.slice(0, 3),
            learning: sortedLearning.slice(0, 2)
        },
        timestamp: new Date().toISOString(),
        duration: Math.round((Date.now() - appState.startTime) / 1000),
        totalAnswers: appState.answers.filter(a => a).length
    };
    
    console.log('✅ Resultados calculados:', appState.results);
}

function showResults() {
    console.log('📈 Mostrando resultados...');
    showSection('resultsSection');
    
    const results = appState.results;
    
    // Definir nombres y descripciones en español
    const intelligenceNames = {
        linguistic: { name: 'Lingüística-Verbal', icon: '📝', description: 'Habilidad para usar palabras de manera efectiva' },
        logical: { name: 'Lógico-Matemática', icon: '🔢', description: 'Capacidad para el razonamiento lógico y matemático' },
        spatial: { name: 'Espacial-Visual', icon: '🎨', description: 'Habilidad para percibir el mundo visual con precisión' },
        bodily: { name: 'Corporal-Cinestésica', icon: '🤸', description: 'Capacidad para usar el cuerpo para expresar ideas' },
        musical: { name: 'Musical-Rítmica', icon: '🎵', description: 'Habilidad para percibir y crear música' },
        interpersonal: { name: 'Interpersonal-Social', icon: '👥', description: 'Capacidad para entender y relacionarse con otros' },
        intrapersonal: { name: 'Intrapersonal-Reflexiva', icon: '🧘', description: 'Habilidad para comprenderse a uno mismo' },
        naturalist: { name: 'Naturalista-Ecológica', icon: '🌿', description: 'Sensibilidad hacia el mundo natural' }
    };
    
    const learningNames = {
        visual: { name: 'Visual', icon: '👁️', description: 'Aprende mejor viendo imágenes y gráficos' },
        auditory: { name: 'Auditivo', icon: '👂', description: 'Aprende mejor escuchando explicaciones' },
        kinesthetic: { name: 'Kinestésico', icon: '✋', description: 'Aprende mejor haciendo y experimentando' },
        readwrite: { name: 'Lectura-Escritura', icon: '📖', description: 'Aprende mejor leyendo y escribiendo' }
    };
    
    // Renderizar inteligencias múltiples
    const intelligencesHTML = results.top3.intelligences.map((intel, index) => {
        const info = intelligenceNames[intel.key] || { name: intel.key, icon: '🎯', description: '' };
        const percentage = intel.percentage.toFixed(1);
        const position = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
        
        return `
            <div class="result-card ${index === 0 ? 'dominant' : ''}">
                <div class="result-position">${position}</div>
                <div class="result-icon">${info.icon}</div>
                <h3>${info.name}</h3>
                <div class="result-percentage">${percentage}%</div>
                <div class="result-bar-container">
                    <div class="result-bar-fill" style="width: ${percentage}%; background: ${getColorForIndex(index)}"></div>
                </div>
                <p class="result-description">${info.description}</p>
                <div class="result-stats">
                    <span>Promedio: ${intel.average.toFixed(2)}/5</span>
                    <span>${intel.count} preguntas</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Renderizar estilos de aprendizaje
    const learningHTML = results.top3.learning.map((style, index) => {
        const info = learningNames[style.key] || { name: style.key, icon: '🎯', description: '' };
        const percentage = style.percentage.toFixed(1);
        const position = index === 0 ? '🥇' : '🥈';
        
        return `
            <div class="learning-card ${index === 0 ? 'dominant' : ''}">
                <div class="learning-position">${position}</div>
                <div class="learning-icon">${info.icon}</div>
                <h3>${info.name}</h3>
                <div class="learning-percentage">${percentage}%</div>
                <div class="learning-bar-container">
                    <div class="learning-bar-fill" style="width: ${percentage}%; background: ${getColorForIndex(index + 3)}"></div>
                </div>
                <p class="learning-description">${info.description}</p>
                <div class="learning-stats">
                    <span>Promedio: ${style.average.toFixed(2)}/5</span>
                    <span>${style.count} preguntas</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Generar recomendaciones personalizadas
    const recommendations = generateIntelligentRecommendations(results);
    
    // Actualizar el DOM
    const resultsContainer = document.getElementById('resultsSection');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="results-container">
                <div class="results-header">
                    <h1>✨ Tus Resultados Personalizados</h1>
                    <p>Hola ${appState.userInfo.name}, aquí están tus inteligencias dominantes:</p>
                    <div class="test-info">
                        <span>⏱️ Tiempo: ${Math.floor(results.duration / 60)}m ${results.duration % 60}s</span>
                        <span>✅ ${results.totalAnswers} respuestas</span>
                    </div>
                </div>
                
                <div class="section">
                    <h2>🧠 Tus 3 Inteligencias Múltiples Más Desarrolladas</h2>
                    <div class="results-grid">
                        ${intelligencesHTML}
                    </div>
                </div>
                
                <div class="section">
                    <h2>📚 Tus Estilos de Aprendizaje Preferidos</h2>
                    <div class="learning-grid">
                        ${learningHTML}
                    </div>
                </div>
                
                <div class="section recommendations">
                    <h2>💡 Recomendaciones Personalizadas</h2>
                    ${recommendations}
                </div>
                
                <div class="actions">
                    <button onclick="downloadResults()" class="btn-primary">📥 Descargar PDF</button>
                    <button onclick="shareResults()" class="btn-secondary">🔗 Compartir</button>
                    <button onclick="restartTest()" class="btn-outline">🔄 Hacer de nuevo</button>
                </div>
            </div>
        `;
    }
    
    console.log('✅ Resultados mostrados correctamente');
}

function getColorForIndex(index) {
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];
    return colors[index % colors.length];
}

function generateIntelligentRecommendations(results) {
    const dominantIntel = results.dominant.intelligence;
    const dominantLearning = results.dominant.learning;
    
    const intelligenceRecommendations = {
        linguistic: [
            'Lee al menos 30 minutos diarios de diversos géneros',
            'Escribe un diario personal o blog',
            'Participa en debates o clubes de lectura',
            'Aprende un nuevo idioma',
            'Crea podcasts o contenido narrativo'
        ],
        logical: [
            'Resuelve puzzles y acertijos matemáticos',
            'Aprende programación o algoritmia',
            'Estudia lógica formal y filosofía',
            'Juega ajedrez o juegos de estrategia',
            'Analiza datos y crea modelos predictivos'
        ],
        spatial: [
            'Practica dibujo y diseño gráfico',
            'Juega con LEGO o bloques de construcción',
            'Estudia arquitectura y diseño 3D',
            'Aprende fotografía y composición',
            'Navega usando mapas sin GPS'
        ],
        bodily: [
            'Practica yoga, danza o artes marciales',
            'Aprende manualidades y artesanías',
            'Practica deportes en equipo',
            'Haz teatro o mímica',
            'Construye objetos con tus manos'
        ],
        musical: [
            'Aprende a tocar un instrumento musical',
            'Canta en un coro o grupo',
            'Estudia teoría musical y composición',
            'Escucha música de diferentes culturas',
            'Crea playlists temáticas y analiza patrones'
        ],
        interpersonal: [
            'Lidera proyectos en equipo',
            'Practica la escucha activa',
            'Voluntario en organizaciones sociales',
            'Aprende técnicas de negociación',
            'Únete a clubs o grupos de interés'
        ],
        intrapersonal: [
            'Medita diariamente al menos 10 minutos',
            'Lleva un diario de reflexión personal',
            'Establece metas y revísalas mensualmente',
            'Practica mindfulness y autoconocimiento',
            'Estudia psicología y desarrollo personal'
        ],
        naturalist: [
            'Cultiva un huerto o jardín',
            'Observa y cataloga especies naturales',
            'Haz senderismo y camping',
            'Estudia ecología y conservación',
            'Participa en proyectos ambientales'
        ]
    };
    
    const learningRecommendations = {
        visual: [
            'Usa mapas mentales y diagramas',
            'Estudia con videos y gráficos',
            'Colorea y destaca información importante',
            'Usa infografías para resumir conceptos',
            'Crea tableros visuales (mood boards)'
        ],
        auditory: [
            'Graba tus notas y escúchalas',
            'Estudia con podcasts y audiolibros',
            'Discute temas en voz alta',
            'Usa música de fondo apropiada',
            'Participa en seminarios y conferencias'
        ],
        kinesthetic: [
            'Haz pausas activas cada 30 minutos',
            'Usa manipulativos y objetos físicos',
            'Estudia caminando o moviéndote',
            'Practica con simulaciones y experimentos',
            'Toma notas a mano, no digital'
        ],
        readwrite: [
            'Reescribe notas con tus propias palabras',
            'Lee libros de texto y artículos',
            'Crea resúmenes y fichas de estudio',
            'Escribe ensayos y reportes',
            'Usa listas y bullet points'
        ]
    };
    
    const intelRecs = intelligenceRecommendations[dominantIntel.key] || [];
    const learnRecs = learningRecommendations[dominantLearning.key] || [];
    
    return `
        <div class="recommendations-grid">
            <div class="rec-column">
                <h3>🎯 Para tu inteligencia ${dominantIntel.key}:</h3>
                <ul>
                    ${intelRecs.slice(0, 3).map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            <div class="rec-column">
                <h3>📖 Para tu estilo ${dominantLearning.key}:</h3>
                <ul>
                    ${learnRecs.slice(0, 3).map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="insight-box">
            <h4>💫 Tu perfil de aprendizaje único:</h4>
            <p>
                Eres una persona con un perfil de <strong>${results.dominant.intelligence.key}</strong> 
                que aprende mejor de forma <strong>${results.dominant.learning.key}</strong>. 
                Esto significa que tu cerebro está especialmente desarrollado para 
                ${getDominantDescription(results.dominant.intelligence.key, results.dominant.learning.key)}.
            </p>
        </div>
    `;
}

function getDominantDescription(intelligence, learning) {
    const descriptions = {
        linguistic_visual: 'procesar información escrita y visual, perfecto para lectura rápida y análisis de textos con gráficos',
        linguistic_auditory: 'comunicarte verbalmente y escuchar con atención, ideal para debates y podcasts',
        logical_kinesthetic: 'resolver problemas prácticos mediante experimentación, excelente para ingeniería y ciencias aplicadas',
        spatial_visual: 'visualizar conceptos espaciales complejos, perfecto para diseño, arquitectura y artes visuales',
        musical_auditory: 'percibir y crear patrones sonoros, ideal para música, idiomas y fonética',
        interpersonal_kinesthetic: 'trabajar en equipo y aprender haciendo con otros, excelente para deportes y proyectos colaborativos',
        intrapersonal_readwrite: 'reflexionar profundamente mediante la escritura, perfecto para filosofía, literatura y coaching'
    };
    
    const key = `${intelligence}_${learning}`;
    return descriptions[key] || 'procesar información de manera única y efectiva';
}

function createRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas || !window.Chart) return;
    
    const ctx = canvas.getContext('2d');
    const scores = appState.results.scores;
    
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
    const scores = appState.results.scores;
    
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
        userInfo: appState.userInfo,
        results: appState.results,
        answers: appState.answers
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `resultados-${appState.userInfo.name}-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

function retakeTest() {
    appState.reset();
    showSection('hero');
}

function saveToDatabase() {
    const data = {
        userInfo: appState.userInfo,
        results: appState.results,
        answers: appState.answers
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
        userInfo: appState.userInfo,
        results: appState.results
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
    if (appState.currentStep === 'test') {
        if (confirm('¿Estás seguro de que quieres volver? Perderás tu progreso.')) {
            showSection('userInfo');
        }
    } else {
        showSection('hero');
    }
}

function exitTest() {
    if (confirm('¿Estás seguro de que quieres salir? Perderás todo tu progreso.')) {
        appState.reset();
        showSection('heroSection');
    }
}

function downloadResults() {
    console.log('📥 Descargando resultados...');
    
    const results = {
        userInfo: appState.userInfo,
        results: appState.results,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `resultados-${appState.userInfo.name.replace(/\s+/g, '-')}-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    console.log('✅ Resultados descargados');
}

function shareResults() {
    console.log('🔗 Compartiendo resultados...');
    
    const shareText = `He completado el Test de Inteligencias Múltiples y Estilos de Aprendizaje. Mi inteligencia dominante es: ${appState.results.dominant.intelligence.key}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mis Resultados - Test de Inteligencias',
            text: shareText,
            url: window.location.href
        }).then(() => {
            console.log('✅ Resultados compartidos');
        }).catch(err => {
            console.error('Error al compartir:', err);
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Texto copiado al portapapeles');
}

function restartTest() {
    if (confirm('¿Quieres hacer el test de nuevo?')) {
        appState.reset();
        showSection('heroSection');
    }
}

// Inicialización cuando el DOM está listo
console.log('🔧 Registrando DOMContentLoaded...');
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 DOMContentLoaded disparado');
    try {
        initializeApp();
        console.log('✅ Inicialización completada exitosamente');
    } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
    }
});
