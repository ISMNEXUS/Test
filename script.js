/**
 * TEST DE INTELIGENCIAS MÚLTIPLES Y ESTILOS DE APRENDIZAJE
 * 80 preguntas - Versión 3.0
 * @version 3.0.0
 */

console.log('🚀 Script cargado correctamente');

// ==============================================
// CONFIGURACIÓN
// ==============================================
const CONFIG = {
    totalQuestions: 40,
    originalQuestions: 80,
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
        this.selectedQuestions = []; // Preguntas seleccionadas aleatoriamente
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
        this.selectedQuestions = [];
    }
}

// Función para seleccionar preguntas aleatorias balanceadas
function selectBalancedQuestions() {
    console.log('Seleccionando preguntas balanceadas...');
    
    // Si no hay preguntas definidas, usar algunas de ejemplo
    if (!QUESTIONS || QUESTIONS.length === 0) {
        console.warn('No hay preguntas definidas, usando preguntas de ejemplo');
        return [];
    }
    
    // Categorizar preguntas por tipo de inteligencia
    const questionsByIntelligence = {
        linguistic: [],
        logical: [],
        spatial: [],
        musical: [],
        bodily: [],
        interpersonal: [],
        intrapersonal: [],
        naturalist: [],
        learning: [] // Para preguntas de estilos de aprendizaje
    };
    
    // Agrupar preguntas por categoría
    QUESTIONS.forEach((q, index) => {
        if (q.intelligence && questionsByIntelligence[q.intelligence]) {
            questionsByIntelligence[q.intelligence].push({...q, originalIndex: index});
        } else if (q.type === 'yesno') {
            questionsByIntelligence.learning.push({...q, originalIndex: index});
        }
    });
    
    const selectedQuestions = [];
    
    // Seleccionar proporcionalmente de cada categoría
    const intelligenceKeys = Object.keys(questionsByIntelligence).filter(key => key !== 'learning');
    const questionsPerIntelligence = Math.floor(30 / intelligenceKeys.length); // 30 para inteligencias
    const learningQuestions = 10; // 10 para estilos de aprendizaje
    
    // Seleccionar preguntas de inteligencias múltiples
    intelligenceKeys.forEach(intelligence => {
        const available = questionsByIntelligence[intelligence];
        if (available.length > 0) {
            const shuffled = available.sort(() => Math.random() - 0.5);
            selectedQuestions.push(...shuffled.slice(0, Math.min(questionsPerIntelligence, available.length)));
        }
    });
    
    // Seleccionar preguntas de estilos de aprendizaje
    const learningAvailable = questionsByIntelligence.learning;
    if (learningAvailable.length > 0) {
        const learningShuffled = learningAvailable.sort(() => Math.random() - 0.5);
        selectedQuestions.push(...learningShuffled.slice(0, Math.min(learningQuestions, learningAvailable.length)));
    }
    
    // Si no se seleccionaron suficientes preguntas, completar con preguntas aleatorias
    if (selectedQuestions.length < CONFIG.totalQuestions) {
        const remaining = QUESTIONS.filter(q => !selectedQuestions.find(sq => sq.originalIndex === QUESTIONS.indexOf(q)));
        const shuffledRemaining = remaining.sort(() => Math.random() - 0.5);
        selectedQuestions.push(...shuffledRemaining.slice(0, CONFIG.totalQuestions - selectedQuestions.length));
    }
    
    // Mezclar el orden final y limitar a totalQuestions
    const finalQuestions = selectedQuestions.sort(() => Math.random() - 0.5).slice(0, CONFIG.totalQuestions);
    
    console.log(`Seleccionadas ${finalQuestions.length} preguntas de ${QUESTIONS.length} disponibles`);
    return finalQuestions;
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
    console.log('🔧 Inicializando aplicación...');
    try {
        initializeApp();
        console.log('✅ Inicialización completada exitosamente');
    } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
        alert('Error al inicializar la aplicación. Por favor, recarga la página.');
    }
});

function initializeApp() {
    console.log('📦 Iniciando aplicación...');
    
    // Cargar datos guardados
    loadUserData();
    
    // Registrar funciones globalmente
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
    
    console.log('✅ Aplicación inicializada correctamente');
    console.log('✅ Total de preguntas:', QUESTIONS.length);
    console.log('✅ window.startTest definida:', typeof window.startTest);
    
    // Verificar que todas las funciones críticas estén disponibles
    const criticalFunctions = ['startTest', 'showSection', 'submitUserForm'];
    criticalFunctions.forEach(func => {
        if (typeof window[func] !== 'function') {
            console.error(`❌ Función crítica no disponible: ${func}`);
        } else {
            console.log(`✅ Función disponible: ${func}`);
        }
    });
}

function loadUserData() {
    const saved = localStorage.getItem('userInfo');
    if (saved) {
        appState.userInfo = JSON.parse(saved);
    }
}

// ==============================================
// FUNCIONES DE NAVEGACIÓN
// ==============================================
function showSection(sectionId) {
    console.log('📍 Mostrando sección:', sectionId);
    try {
        const allSections = document.querySelectorAll('section');
        console.log('   Total secciones encontradas:', allSections.length);
        
        allSections.forEach(s => s.style.display = 'none');
        
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
            console.log('✅ Sección mostrada correctamente:', sectionId);
        } else {
            console.error('❌ Sección no encontrada:', sectionId);
            console.log('   Secciones disponibles:', Array.from(allSections).map(s => s.id));
        }
    } catch (error) {
        console.error('❌ Error en showSection:', error);
    }
}

function goBack() {
    if (appState && appState.currentStep === 'form') {
        showSection('heroSection');
        if (appState) appState.currentStep = 'hero';
    } else if (confirm('¿Deseas cancelar el test?')) {
        if (appState) appState.reset();
        showSection('heroSection');
    }
}

function exitTest() {
    if (confirm('¿Deseas cancelar el test? Se perderá todo el progreso.')) {
        if (appState) appState.reset();
        showSection('heroSection');
    }
}

// ==============================================
// FLUJO DEL TEST
// ==============================================
function startTest() {
    console.log('🚀 Iniciando test...');
    try {
        if (!appState) {
            console.error('❌ appState no está definido');
            alert('Error: La aplicación no se inicializó correctamente. Por favor, recarga la página.');
            return;
        }
        
        appState.currentStep = 'form';
        showSection('userFormSection');
        console.log('✅ Test iniciado correctamente - Mostrando formulario');
    } catch (error) {
        console.error('❌ Error en startTest:', error);
        alert('Error al iniciar el test. Por favor, recarga la página.');
    }
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
    
    // Debug: verificar preguntas disponibles
    console.log('Total de preguntas disponibles:', QUESTIONS.length);
    console.log('Primeras 3 preguntas:', QUESTIONS.slice(0, 3));
    
    // Seleccionar preguntas aleatorias balanceadas
    appState.selectedQuestions = selectBalancedQuestions();
    
    console.log('Preguntas seleccionadas:', appState.selectedQuestions.length);
    console.log('Primera pregunta seleccionada:', appState.selectedQuestions[0]);
    
    appState.currentStep = 'test';
    appState.startTime = Date.now();
    appState.currentQuestion = 0;
    
    showSection('testSection');
    
    // Esperar un momento antes de renderizar para asegurar que la sección esté visible
    setTimeout(() => {
        renderQuestion();
    }, 100);
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
    const selectedQuestions = appState.selectedQuestions.length > 0 ? appState.selectedQuestions : QUESTIONS;
    
    if (appState.currentQuestion >= selectedQuestions.length) {
        finishTest();
        return;
    }
    
    const question = selectedQuestions[appState.currentQuestion];
    const container = document.getElementById('questionContainer');
    
    if (!container) {
        console.error('Question container not found');
        return;
    }
    
    // Actualizar barra de progreso
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        const percentage = ((appState.currentQuestion + 1) / selectedQuestions.length) * 100;
        progressBar.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `Pregunta ${appState.currentQuestion + 1} de ${selectedQuestions.length}`;
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
                <div class="scale-option">
                    <input type="radio" id="scale_${value}" name="scaleAnswer" value="${value}" onchange="selectScaleAnswer(${value})">
                    <label for="scale_${value}">${value}</label>
                </div>
            `;
        });
        html += '</div>';
    } else if (question.type === 'yesno') {
        // SI/NO
        html += `
            <div class="boolean-options">
                <div class="boolean-option">
                    <input type="radio" id="yes_option" name="booleanAnswer" value="si" onchange="selectYesNoAnswer('si')">
                    <label for="yes_option"><i class="fas fa-check"></i> SÍ</label>
                </div>
                <div class="boolean-option">
                    <input type="radio" id="no_option" name="booleanAnswer" value="no" onchange="selectYesNoAnswer('no')">
                    <label for="no_option"><i class="fas fa-times"></i> NO</label>
                </div>
            </div>
        `;
    }
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Debug: verificar que la pregunta se renderizó
    console.log('Pregunta renderizada:', appState.currentQuestion + 1, question.question);
}

function selectScaleAnswer(value) {
    appState.scaleAnswers[appState.currentQuestion] = value;
    
    // Debug
    console.log('Respuesta escala:', value, 'para pregunta:', appState.currentQuestion + 1);
    
    // Avanzar automáticamente después de un pequeño delay
    setTimeout(() => {
        nextQuestion();
    }, 500);
}

function selectYesNoAnswer(value) {
    appState.learningAnswers[appState.currentQuestion] = value;
    
    // Debug
    console.log('Respuesta SI/NO:', value, 'para pregunta:', appState.currentQuestion + 1);
    
    // Avanzar automáticamente después de un pequeño delay
    setTimeout(() => {
        nextQuestion();
    }, 500);
}

function nextQuestion() {
    const selectedQuestions = appState.selectedQuestions.length > 0 ? appState.selectedQuestions : QUESTIONS;
    
    if (appState.currentQuestion < selectedQuestions.length - 1) {
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
    const selectedQuestions = appState.selectedQuestions.length > 0 ? appState.selectedQuestions : QUESTIONS;
    
    // Inicializar contadores
    const intelligences = {
        linguistic: { score: 0, count: 0, questions: [] },
        logical: { score: 0, count: 0, questions: [] },
        spatial: { score: 0, count: 0, questions: [] },
        musical: { score: 0, count: 0, questions: [] },
        bodily: { score: 0, count: 0, questions: [] },
        interpersonal: { score: 0, count: 0, questions: [] },
        intrapersonal: { score: 0, count: 0, questions: [] },
        naturalist: { score: 0, count: 0, questions: [] }
    };
    
    const learningStyles = {
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        reading: 0
    };
    
    // Procesar respuestas de escala (1-5)
    selectedQuestions.forEach((question, idx) => {
        if (question.type === 'scale' && appState.scaleAnswers[idx]) {
            const intelligence = question.intelligence;
            if (intelligence && intelligences[intelligence]) {
                intelligences[intelligence].score += appState.scaleAnswers[idx];
                intelligences[intelligence].count++;
                intelligences[intelligence].questions.push({
                    question: question.question,
                    answer: appState.scaleAnswers[idx]
                });
            }
        } else if (question.type === 'yesno' && appState.learningAnswers[idx]) {
            // Mapear respuestas SI/NO a estilos de aprendizaje
            if (appState.learningAnswers[idx] === 'si') {
                if (question.question.includes('VER') || question.question.includes('VISUAL')) {
                    learningStyles.visual++;
                } else if (question.question.includes('ESCUCHAR') || question.question.includes('OÍR')) {
                    learningStyles.auditory++;
                } else if (question.question.includes('MOVER') || question.question.includes('TOCAR')) {
                    learningStyles.kinesthetic++;
                } else {
                    learningStyles.reading++;
                }
            }
        }
    });
    
    // Calcular promedios y porcentajes
    const processedIntelligences = {};
    Object.entries(intelligences).forEach(([key, data]) => {
        if (data.count > 0) {
            const average = data.score / data.count;
            processedIntelligences[key] = {
                average: average,
                percentage: (average / 5) * 100,
                total: data.score,
                questions: data.count,
                details: data.questions
            };
        }
    });
    
    // Identificar fortalezas principales
    const sortedIntelligences = Object.entries(processedIntelligences)
        .sort(([,a], [,b]) => b.average - a.average)
        .slice(0, 3);
    
    const dominantLearningStyle = Object.entries(learningStyles)
        .sort(([,a], [,b]) => b - a)[0];
    
    appState.results = {
        intelligences: processedIntelligences,
        learningStyles,
        topIntelligences: sortedIntelligences,
        dominantStyle: dominantLearningStyle,
        totalTime: Date.now() - appState.startTime,
        completionDate: new Date().toLocaleDateString('es-ES')
    };
    
    displayResults();
}

function displayResults() {
    const container = document.getElementById('resultsContent');
    const { topIntelligences, dominantStyle, completionDate } = appState.results;
    
    let html = `
        <div class="results-summary">
            <div class="user-info">
                <div class="avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-details">
                    <h3>${appState.userInfo.nombre}</h3>
                    <p>${appState.userInfo.profesion || 'Participante'} • ${completionDate}</p>
                </div>
            </div>
        </div>
        
        <div class="strengths-section">
            <h3 class="section-title">
                <i class="fas fa-star"></i>
                Tus Principales Fortalezas
            </h3>
            <div class="strengths-grid">
    `;
    
    // Top 3 inteligencias
    topIntelligences.forEach(([intelligence, data], index) => {
        const rank = index + 1;
        const icon = getIntelligenceIcon(intelligence);
        const name = formatIntelligenceName(intelligence);
        const description = getIntelligenceDescription(intelligence);
        
        html += `
            <div class="strength-card rank-${rank}">
                <div class="strength-rank">${rank}</div>
                <div class="strength-icon">
                    <i class="${icon}"></i>
                </div>
                <div class="strength-content">
                    <h4>${name}</h4>
                    <p>${description}</p>
                    <div class="strength-score">
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${data.percentage}%"></div>
                        </div>
                        <span class="score-value">${data.average.toFixed(1)}/5</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
        
        <div class="learning-section">
            <h3 class="section-title">
                <i class="fas fa-graduation-cap"></i>
                Tu Estilo de Aprendizaje Dominante
            </h3>
            <div class="learning-card">
                <div class="learning-icon">
                    <i class="${getLearningStyleIcon(dominantStyle[0])}"></i>
                </div>
                <div class="learning-content">
                    <h4>${formatLearningStyle(dominantStyle[0])}</h4>
                    <p>${getLearningStyleDescription(dominantStyle[0])}</p>
                    <div class="learning-percentage">
                        ${Math.round((dominantStyle[1] / 10) * 100)}% de preferencia
                    </div>
                </div>
            </div>
        </div>
        
        <div class="detailed-analysis">
            <h3 class="section-title">
                <i class="fas fa-chart-bar"></i>
                Análisis Detallado
            </h3>
            <div class="analysis-grid">
    `;
    
    // Mostrar todas las inteligencias evaluadas
    Object.entries(appState.results.intelligences).forEach(([intelligence, data]) => {
        if (data.questions > 0) {
            const name = formatIntelligenceName(intelligence);
            const icon = getIntelligenceIcon(intelligence);
            
            html += `
                <div class="analysis-item">
                    <div class="analysis-header">
                        <i class="${icon}"></i>
                        <span>${name}</span>
                    </div>
                    <div class="analysis-bar">
                        <div class="bar-fill" style="width: ${data.percentage}%"></div>
                    </div>
                    <div class="analysis-score">${data.average.toFixed(1)}</div>
                </div>
            `;
        }
    });
    
    html += `
            </div>
        </div>
        
        <div class="recommendations">
            <h3 class="section-title">
                <i class="fas fa-lightbulb"></i>
                Recomendaciones Personalizadas
            </h3>
            <div class="recommendations-content">
                ${generateRecommendations()}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Animar las barras de progreso
    setTimeout(() => {
        document.querySelectorAll('.score-fill, .bar-fill').forEach(bar => {
            bar.style.transition = 'width 1.5s ease-out';
        });
    }, 100);
}
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

// Funciones auxiliares para resultados
function getIntelligenceIcon(intelligence) {
    const icons = {
        linguistic: 'fas fa-book',
        logical: 'fas fa-calculator',
        spatial: 'fas fa-cube',
        musical: 'fas fa-music',
        bodily: 'fas fa-running',
        interpersonal: 'fas fa-users',
        intrapersonal: 'fas fa-user-circle',
        naturalist: 'fas fa-leaf'
    };
    return icons[intelligence] || 'fas fa-brain';
}

function getLearningStyleIcon(style) {
    const icons = {
        visual: 'fas fa-eye',
        auditory: 'fas fa-ear-listen',
        kinesthetic: 'fas fa-hand',
        reading: 'fas fa-book-open'
    };
    return icons[style] || 'fas fa-graduation-cap';
}

function getIntelligenceDescription(intelligence) {
    const descriptions = {
        linguistic: 'Facilidad con las palabras, lectura y comunicación',
        logical: 'Habilidad para resolver problemas lógicos y matemáticos',
        spatial: 'Capacidad para visualizar y manipular espacios',
        musical: 'Sensibilidad hacia ritmos, tonos y melodías',
        bodily: 'Habilidad para usar el cuerpo y movimiento',
        interpersonal: 'Facilidad para relacionarse con otros',
        intrapersonal: 'Conocimiento y comprensión de uno mismo',
        naturalist: 'Conexión con la naturaleza y seres vivos'
    };
    return descriptions[intelligence] || 'Habilidad cognitiva especial';
}

function getLearningStyleDescription(style) {
    const descriptions = {
        visual: 'Aprendes mejor viendo imágenes, diagramas y contenido visual',
        auditory: 'Aprendes mejor escuchando explicaciones y discusiones',
        kinesthetic: 'Aprendes mejor haciendo y experimentando',
        reading: 'Aprendes mejor leyendo y escribiendo información'
    };
    return descriptions[style] || 'Estilo de aprendizaje preferido';
}

function generateRecommendations() {
    const { topIntelligences, dominantStyle } = appState.results;
    const topIntelligence = topIntelligences[0][0];
    
    const recommendations = {
        linguistic: '• Practica escritura creativa\n• Lee libros variados\n• Participa en debates',
        logical: '• Resuelve puzzles matemáticos\n• Aprende programación\n• Analiza datos y patrones',
        spatial: '• Practica dibujo y diseño\n• Usa mapas mentales\n• Juega juegos de construcción',
        musical: '• Aprende un instrumento\n• Escucha música variada\n• Crea ritmos y melodías',
        bodily: '• Realiza actividad física regular\n• Aprende haciendo\n• Usa material manipulativo',
        interpersonal: '• Participa en actividades grupales\n• Practica liderazgo\n• Desarrolla empatía',
        intrapersonal: '• Practica mindfulness\n• Lleva un diario personal\n• Reflexiona sobre tus metas',
        naturalist: '• Pasa tiempo en la naturaleza\n• Estudia ciencias naturales\n• Cultiva plantas'
    };
    
    return `
        <div class="recommendation-card">
            <h4>Para potenciar tu ${formatIntelligenceName(topIntelligence)}</h4>
            <div class="recommendation-text">
                ${recommendations[topIntelligence] || '• Continúa explorando tus fortalezas'}
            </div>
        </div>
    `;
}

function retakeTest() {
    if (confirm('¿Estás seguro de que quieres realizar el test de nuevo?')) {
        appState.reset();
        showSection('heroSection');
    }
}