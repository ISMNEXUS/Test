/**
 * Test de Análisis Cognitivo - JavaScript Interactivo
 * Modernización completa del sistema de evaluación cognitiva
 * @author Sistema de Rediseño 2026
 * @version 2.0.0
 */

// ==============================================
// CONFIGURATION & CONSTANTS
// ==============================================
const CONFIG = {
    totalQuestions: 40,
    timePerQuestion: 60, // segundos
    intelligenceTypes: [
        'linguistic',
        'logical',
        'spatial',
        'musical',
        'bodily',
        'interpersonal',
        'intrapersonal',
        'naturalistic'
    ],
    apiEndpoint: 'api.php',
    emailEndpoint: 'correo.php'
};

// ==============================================
// APPLICATION STATE
// ==============================================
class AppState {
    constructor() {
        this.currentStep = 'hero'; // hero, form, test, results
        this.currentQuestion = 0;
        this.answers = [];
        this.userInfo = {};
        this.startTime = null;
        this.questionStartTime = null;
        this.results = {};
        this.timeLeft = CONFIG.timePerQuestion;
        this.timer = null;
    }

    reset() {
        this.currentStep = 'hero';
        this.currentQuestion = 0;
        this.answers = [];
        this.userInfo = {};
        this.results = {};
        this.startTime = null;
        this.questionStartTime = null;
        this.clearTimer();
    }

    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}

// ==============================================
// QUESTIONS DATABASE
// ==============================================
const QUESTIONS = [
    // Inteligencia Lingüística
    {
        type: 'linguistic',
        category: 'Comprensión Verbal',
        question: '¿Cuál de las siguientes palabras tiene un significado más similar a "PERSPICAZ"?',
        options: [
            'Confundido',
            'Agudo',
            'Lento', 
            'Distraído'
        ],
        correct: 1,
        difficulty: 'medium'
    },
    {
        type: 'linguistic',
        category: 'Analogías Verbales',
        question: 'LIBRO es a BIBLIOTECA como CUADRO es a:',
        options: [
            'Marco',
            'Pincel',
            'Museo',
            'Color'
        ],
        correct: 2,
        difficulty: 'medium'
    },
    {
        type: 'linguistic',
        category: 'Sinónimos',
        question: '¿Cuál es el sinónimo de "EFÍMERO"?',
        options: [
            'Duradero',
            'Transitorio',
            'Permanente',
            'Eterno'
        ],
        correct: 1,
        difficulty: 'hard'
    },
    {
        type: 'linguistic',
        category: 'Comprensión Lectora',
        question: 'Si "Todos los días llueve en abril" y "Hoy es 15 de abril", entonces:',
        options: [
            'Puede que llueva',
            'No llueve',
            'Llueve',
            'No se puede determinar'
        ],
        correct: 2,
        difficulty: 'medium'
    },
    {
        type: 'linguistic',
        category: 'Vocabulario',
        question: '¿Qué significa "UBICUO"?',
        options: [
            'Que está en un solo lugar',
            'Que está en todas partes',
            'Que no está en ningún lugar',
            'Que cambia de lugar'
        ],
        correct: 1,
        difficulty: 'hard'
    },

    // Inteligencia Lógico-Matemática
    {
        type: 'logical',
        category: 'Secuencias Numéricas',
        question: '¿Cuál es el siguiente número en la secuencia? 2, 6, 18, 54, ?',
        options: [
            '108',
            '162',
            '180',
            '216'
        ],
        correct: 1,
        difficulty: 'medium'
    },
    {
        type: 'logical',
        category: 'Razonamiento Lógico',
        question: 'Si A > B y B > C, entonces:',
        options: [
            'C > A',
            'A < C',
            'A > C',
            'No se puede determinar'
        ],
        correct: 2,
        difficulty: 'easy'
    },
    {
        type: 'logical',
        category: 'Problemas Matemáticos',
        question: 'Un tren viaja a 80 km/h. ¿Cuánto tiempo tardará en recorrer 240 km?',
        options: [
            '2 horas',
            '3 horas',
            '4 horas',
            '5 horas'
        ],
        correct: 1,
        difficulty: 'medium'
    },
    {
        type: 'logical',
        category: 'Patrones',
        question: '¿Cuál es el patrón? 1, 1, 2, 3, 5, 8, ?',
        options: [
            '11',
            '13',
            '15',
            '16'
        ],
        correct: 1,
        difficulty: 'hard'
    },
    {
        type: 'logical',
        category: 'Álgebra Simple',
        question: 'Si x + 5 = 12, entonces x =',
        options: [
            '6',
            '7',
            '8',
            '9'
        ],
        correct: 1,
        difficulty: 'easy'
    },

    // Inteligencia Espacial
    {
        type: 'spatial',
        category: 'Rotación Mental',
        question: 'Si rotas un cubo 90° hacia la derecha, ¿qué cara queda al frente?',
        options: [
            'La cara izquierda original',
            'La cara derecha original',
            'La cara superior original',
            'La cara posterior original'
        ],
        correct: 0,
        difficulty: 'medium'
    },
    {
        type: 'spatial',
        category: 'Visualización',
        question: '¿Cuántos cubos pequeños forman un cubo de 3x3x3?',
        options: [
            '9',
            '18',
            '27',
            '36'
        ],
        correct: 2,
        difficulty: 'medium'
    },
    {
        type: 'spatial',
        category: 'Orientación',
        question: 'Si caminas 3 pasos al norte, 4 al este, ¿cuál es la distancia directa al punto inicial?',
        options: [
            '5 pasos',
            '6 pasos',
            '7 pasos',
            '8 pasos'
        ],
        correct: 0,
        difficulty: 'hard'
    },
    {
        type: 'spatial',
        category: 'Geometría',
        question: '¿Cuántos lados tiene un octágono?',
        options: [
            '6',
            '7',
            '8',
            '9'
        ],
        correct: 2,
        difficulty: 'easy'
    },
    {
        type: 'spatial',
        category: 'Perspectiva',
        question: 'Desde arriba, ¿qué forma tendría un cilindro?',
        options: [
            'Cuadrado',
            'Rectángulo',
            'Círculo',
            'Triángulo'
        ],
        correct: 2,
        difficulty: 'easy'
    },

    // Inteligencia Musical
    {
        type: 'musical',
        category: 'Ritmo',
        question: '¿Cuál es el patrón rítmico más común en música occidental?',
        options: [
            '2/4',
            '3/4',
            '4/4',
            '6/8'
        ],
        correct: 2,
        difficulty: 'medium'
    },
    {
        type: 'musical',
        category: 'Escalas',
        question: '¿Cuántas notas tiene la escala cromática?',
        options: [
            '7',
            '10',
            '12',
            '15'
        ],
        correct: 2,
        difficulty: 'medium'
    },
    {
        type: 'musical',
        category: 'Instrumentos',
        question: '¿Qué instrumento NO pertenece a la familia de viento?',
        options: [
            'Flauta',
            'Trompeta',
            'Violín',
            'Clarinete'
        ],
        correct: 2,
        difficulty: 'easy'
    },
    {
        type: 'musical',
        category: 'Teoría Musical',
        question: '¿Qué intervalo forman DO y SOL?',
        options: [
            'Tercera',
            'Cuarta',
            'Quinta',
            'Sexta'
        ],
        correct: 2,
        difficulty: 'hard'
    },
    {
        type: 'musical',
        category: 'Compositores',
        question: '¿Quién compuso "Las Cuatro Estaciones"?',
        options: [
            'Bach',
            'Vivaldi',
            'Mozart',
            'Beethoven'
        ],
        correct: 1,
        difficulty: 'medium'
    },

    // Inteligencia Corporal-Kinestésica
    {
        type: 'bodily',
        category: 'Coordinación',
        question: '¿Qué habilidad requiere mayor coordinación ojo-mano?',
        options: [
            'Correr',
            'Saltar',
            'Lanzar una pelota a un objetivo',
            'Caminar en línea recta'
        ],
        correct: 2,
        difficulty: 'easy'
    },
    {
        type: 'bodily',
        category: 'Deportes',
        question: 'En el fútbol, ¿qué parte del cuerpo NO se puede usar para tocar la pelota?',
        options: [
            'Cabeza',
            'Pecho',
            'Manos',
            'Pies'
        ],
        correct: 2,
        difficulty: 'easy'
    },
    {
        type: 'bodily',
        category: 'Equilibrio',
        question: '¿Qué sistema del cuerpo es responsable principalmente del equilibrio?',
        options: [
            'Sistema nervioso',
            'Sistema vestibular',
            'Sistema muscular',
            'Sistema óseo'
        ],
        correct: 1,
        difficulty: 'hard'
    },
    {
        type: 'bodily',
        category: 'Movimiento',
        question: '¿Cuál es el músculo más grande del cuerpo humano?',
        options: [
            'Bíceps',
            'Glúteo mayor',
            'Cuádriceps',
            'Dorsal ancho'
        ],
        correct: 1,
        difficulty: 'medium'
    },
    {
        type: 'bodily',
        category: 'Reflejos',
        question: '¿Qué reflejo es automático en los bebés?',
        options: [
            'Reflejo de Moro',
            'Reflejo de conducir',
            'Reflejo de escribir',
            'Reflejo de caminar'
        ],
        correct: 0,
        difficulty: 'hard'
    },

    // Inteligencia Interpersonal
    {
        type: 'interpersonal',
        category: 'Empatía',
        question: '¿Cuál es la mejor manera de responder a alguien que está triste?',
        options: [
            'Ignorar sus sentimientos',
            'Decirle que se anime',
            'Escuchar y validar sus emociones',
            'Cambiar de tema'
        ],
        correct: 2,
        difficulty: 'medium'
    },
    {
        type: 'interpersonal',
        category: 'Comunicación',
        question: '¿Qué porcentaje de la comunicación es no verbal?',
        options: [
            '25%',
            '45%',
            '65%',
            '85%'
        ],
        correct: 2,
        difficulty: 'hard'
    },
    {
        type: 'interpersonal',
        category: 'Liderazgo',
        question: '¿Cuál es la característica más importante de un buen líder?',
        options: [
            'Autoridad',
            'Inteligencia',
            'Capacidad de inspirar',
            'Experiencia'
        ],
        correct: 2,
        difficulty: 'medium'
    },
    {
        type: 'interpersonal',
        category: 'Resolución de Conflictos',
        question: 'Ante un conflicto, ¿cuál es el primer paso?',
        options: [
            'Imponer tu punto de vista',
            'Escuchar todas las perspectivas',
            'Evitar la confrontación',
            'Buscar un mediador'
        ],
        correct: 1,
        difficulty: 'medium'
    },
    {
        type: 'interpersonal',
        category: 'Trabajo en Equipo',
        question: '¿Qué favorece más el trabajo en equipo?',
        options: [
            'Competencia interna',
            'Objetivos comunes claros',
            'Jerarquías rígidas',
            'Trabajo individual'
        ],
        correct: 1,
        difficulty: 'easy'
    },

    // Inteligencia Intrapersonal
    {
        type: 'intrapersonal',
        category: 'Autoconocimiento',
        question: '¿Qué significa tener inteligencia intrapersonal?',
        options: [
            'Ser sociable',
            'Conocerse a uno mismo',
            'Ser intelectual',
            'Tener muchos amigos'
        ],
        correct: 1,
        difficulty: 'easy'
    },
    {
        type: 'intrapersonal',
        category: 'Autorregulación',
        question: '¿Cuál es la mejor estrategia para manejar el estrés?',
        options: [
            'Evitar las situaciones difíciles',
            'Respiración profunda y mindfulness',
            'Trabajar más duro',
            'Ignorar los síntomas'
        ],
        correct: 1,
        difficulty: 'medium'
    },
    {
        type: 'intrapersonal',
        category: 'Motivación',
        question: '¿Qué tipo de motivación es más duradero?',
        options: [
            'Motivación externa (premios)',
            'Motivación interna (satisfacción personal)',
            'Motivación por competencia',
            'Motivación por presión'
        ],
        correct: 1,
        difficulty: 'hard'
    },
    {
        type: 'intrapersonal',
        category: 'Reflexión',
        question: '¿Cuál es el beneficio principal de la autorreflexión?',
        options: [
            'Criticarse a uno mismo',
            'Compararse con otros',
            'Aprender y crecer',
            'Justificar errores'
        ],
        correct: 2,
        difficulty: 'medium'
    },
    {
        type: 'intrapersonal',
        category: 'Valores',
        question: '¿Qué son los valores personales?',
        options: [
            'Lo que otros esperan de ti',
            'Principios que guían tus decisiones',
            'Metas profesionales',
            'Habilidades técnicas'
        ],
        correct: 1,
        difficulty: 'medium'
    },

    // Inteligencia Naturalista
    {
        type: 'naturalistic',
        category: 'Ecosistemas',
        question: '¿Cuál es el ecosistema con mayor biodiversidad?',
        options: [
            'Desierto',
            'Bosque templado',
            'Selva tropical',
            'Tundra'
        ],
        correct: 2,
        difficulty: 'medium'
    },
    {
        type: 'naturalistic',
        category: 'Clasificación',
        question: '¿A qué reino pertenecen los hongos?',
        options: [
            'Plantae',
            'Animalia',
            'Fungi',
            'Protista'
        ],
        correct: 2,
        difficulty: 'hard'
    },
    {
        type: 'naturalistic',
        category: 'Comportamiento Animal',
        question: '¿Qué comportamiento es instintivo en las aves migratorias?',
        options: [
            'Construir nidos',
            'Seguir rutas de migración',
            'Buscar comida',
            'Todas las anteriores'
        ],
        correct: 3,
        difficulty: 'medium'
    },
    {
        type: 'naturalistic',
        category: 'Botánica',
        question: '¿Qué proceso realizan las plantas para producir oxígeno?',
        options: [
            'Respiración',
            'Fotosíntesis',
            'Transpiración',
            'Germinación'
        ],
        correct: 1,
        difficulty: 'easy'
    },
    {
        type: 'naturalistic',
        category: 'Conservación',
        question: '¿Cuál es la principal causa de extinción de especies?',
        options: [
            'Cambio climático',
            'Destrucción del hábitat',
            'Caza excesiva',
            'Enfermedades'
        ],
        correct: 1,
        difficulty: 'hard'
    }
];

// ==============================================
// APPLICATION CONTROLLER
// ==============================================
class CognitiveTestApp {
    constructor() {
        this.state = new AppState();
        this.initializeEventListeners();
        this.showSection('hero');
    }

    initializeEventListeners() {
        // Navigation responsive
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const isActive = navLinks.classList.contains('active');
                navToggle.setAttribute('aria-expanded', isActive.toString());
                navToggle.innerHTML = isActive ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
            });

            // Close menu when clicking on links
            navLinks.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }

        // Hero section
        document.getElementById('startTestBtn').addEventListener('click', () => this.startTest());
        
        // Form section
        document.getElementById('personalInfoForm').addEventListener('submit', (e) => this.handleFormSubmit(e));
        document.getElementById('backToHero').addEventListener('click', () => this.showSection('hero'));
        
        // Test navigation
        document.getElementById('prevQuestion').addEventListener('click', () => this.prevQuestion());
        document.getElementById('nextQuestion').addEventListener('click', () => this.nextQuestion());
        document.getElementById('finishTest').addEventListener('click', () => this.finishTest());
        
        // Results section
        document.getElementById('downloadResults').addEventListener('click', () => this.downloadResults());
        document.getElementById('retakeTest').addEventListener('click', () => this.retakeTest());
        document.getElementById('shareResults').addEventListener('click', () => this.shareResults());
        
        // Form validation
        this.setupFormValidation();
    }

    setupFormValidation() {
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        let isValid = true;
        let message = '';

        // Clear previous errors
        this.clearError(field);

        // Required fields validation
        if ((name === 'nombre' || name === 'email') && !value) {
            isValid = false;
            message = 'Este campo es obligatorio';
        }

        // Email validation
        if (name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Por favor ingresa un email válido';
            }
        }

        // Age validation
        if (name === 'edad' && value) {
            const age = parseInt(value);
            if (isNaN(age) || age < 10 || age > 100) {
                isValid = false;
                message = 'La edad debe estar entre 10 y 100 años';
            }
        }

        // Phone validation
        if (name === 'celular' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                message = 'Por favor ingresa un número de teléfono válido';
            }
        }

        if (!isValid) {
            this.showError(field, message);
        }

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        // Add shake animation
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
        this.clearError(field);

        switch (name) {
            case 'nombre':
                if (!value) {
                    message = 'El nombre es obligatorio';
                    isValid = false;
                } else if (value.length < 2) {
                    message = 'El nombre debe tener al menos 2 caracteres';
                    isValid = false;
                } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                    message = 'El nombre solo puede contener letras y espacios';
                    isValid = false;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    message = 'El correo electrónico es obligatorio';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    message = 'Ingresa un correo electrónico válido';
                    isValid = false;
                }
                break;
                
            case 'edad':
                if (value && (parseInt(value) < 10 || parseInt(value) > 100)) {
                    message = 'La edad debe estar entre 10 y 100 años';
                    isValid = false;
                }
                break;
                
            case 'celular':
                if (value && !/^[\d\s\+\-\(\)]+$/.test(value)) {
                    message = 'Ingresa un número de teléfono válido';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showError(field, message);
        }

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }

    startTest() {
        this.showSection('userForm');
        this.animateSection('userForm');
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const form = e.target;
        const formData = new FormData(form);
        let isValid = true;
        
        // Validate required fields
        const requiredFields = ['nombre', 'email'];
        requiredFields.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Store user information
            this.state.userInfo = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                edad: formData.get('edad'),
                profesion: formData.get('profesion'),
                celular: formData.get('celular'),
                sede: formData.get('sede')
            };
            
            this.showSection('testSection');
            this.startCognitiveTest();
        }
    }

    startCognitiveTest() {
        this.state.currentQuestion = 0;
        this.state.startTime = new Date();
        this.loadQuestion();
        this.updateProgress();
    }

    loadQuestion() {
        const question = QUESTIONS[this.state.currentQuestion];
        const testContent = document.getElementById('testContent');
        
        if (!question) {
            this.finishTest();
            return;
        }

        this.state.questionStartTime = new Date();
        
        testContent.innerHTML = `
            <div class="question-card">
                <div class="question-category">
                    <span class="category-badge">${question.category}</span>
                    <span class="difficulty-badge difficulty-${question.difficulty}">${question.difficulty}</span>
                </div>
                <h3 class="question-title">${question.question}</h3>
                <div class="question-options">
                    ${question.options.map((option, index) => `
                        <button class="option-button" data-option="${index}">
                            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                            <span class="option-text">${option}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="question-info">
                    <div class="question-type">
                        <i class="fas fa-brain"></i>
                        Inteligencia: ${this.getIntelligenceLabel(question.type)}
                    </div>
                </div>
            </div>
        `;

        // Add event listeners to options
        const optionButtons = testContent.querySelectorAll('.option-button');
        optionButtons.forEach(button => {
            button.addEventListener('click', () => this.selectOption(button));
        });

        this.updateNavigationButtons();
    }

    selectOption(button) {
        // Clear previous selection
        const allOptions = document.querySelectorAll('.option-button');
        allOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Select current option
        button.classList.add('selected');
        
        const questionIndex = this.state.currentQuestion;
        const selectedOption = parseInt(button.dataset.option);
        const responseTime = new Date() - this.state.questionStartTime;
        
        // Store answer
        this.state.answers[questionIndex] = {
            questionIndex,
            selectedOption,
            responseTime,
            question: QUESTIONS[questionIndex]
        };
    }

    prevQuestion() {
        if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.loadQuestion();
            this.updateProgress();
        }
    }

    nextQuestion() {
        if (this.state.currentQuestion < CONFIG.totalQuestions - 1) {
            this.state.currentQuestion++;
            this.loadQuestion();
            this.updateProgress();
        }
    }

    updateProgress() {
        const progress = ((this.state.currentQuestion + 1) / CONFIG.totalQuestions) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `Pregunta ${this.state.currentQuestion + 1} de ${CONFIG.totalQuestions}`;
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevQuestion');
        const nextBtn = document.getElementById('nextQuestion');
        const finishBtn = document.getElementById('finishTest');
        
        prevBtn.style.display = this.state.currentQuestion > 0 ? 'flex' : 'none';
        
        if (this.state.currentQuestion === CONFIG.totalQuestions - 1) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            finishBtn.style.display = 'none';
        }
    }

    finishTest() {
        this.showLoadingSpinner(true);
        
        // Calculate results
        this.calculateResults();
        
        // Send data to server
        this.submitTestData().then(() => {
            this.showLoadingSpinner(false);
            this.showResults();
        }).catch(error => {
            console.error('Error submitting test data:', error);
            this.showLoadingSpinner(false);
            this.showResults(); // Show results anyway
        });
    }

    calculateResults() {
        const intelligenceScores = {};
        
        // Initialize scores
        CONFIG.intelligenceTypes.forEach(type => {
            intelligenceScores[type] = {
                correct: 0,
                total: 0,
                percentage: 0,
                responseTime: 0
            };
        });

        // Calculate scores for each intelligence type
        this.state.answers.forEach(answer => {
            if (answer && answer.question) {
                const type = answer.question.type;
                const isCorrect = answer.selectedOption === answer.question.correct;
                
                intelligenceScores[type].total++;
                if (isCorrect) {
                    intelligenceScores[type].correct++;
                }
                intelligenceScores[type].responseTime += answer.responseTime;
            }
        });

        // Calculate percentages and average response times
        Object.keys(intelligenceScores).forEach(type => {
            const score = intelligenceScores[type];
            score.percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
            score.averageResponseTime = score.total > 0 ? Math.round(score.responseTime / score.total) : 0;
        });

        // Find dominant intelligence
        let dominantIntelligence = '';
        let maxScore = 0;
        
        Object.entries(intelligenceScores).forEach(([type, score]) => {
            if (score.percentage > maxScore) {
                maxScore = score.percentage;
                dominantIntelligence = type;
            }
        });

        this.state.results = {
            intelligenceScores,
            dominantIntelligence,
            overallScore: Math.round(Object.values(intelligenceScores).reduce((sum, score) => sum + score.percentage, 0) / CONFIG.intelligenceTypes.length),
            totalTime: new Date() - this.state.startTime,
            completedQuestions: this.state.answers.filter(a => a).length
        };
    }

    async submitTestData() {
        const testData = {
            userInfo: this.state.userInfo,
            answers: this.state.answers,
            results: this.state.results,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch(CONFIG.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.warn('Could not submit to API, trying email fallback');
            // Fallback to email submission
            return this.submitViaEmail(testData);
        }
    }

    async submitViaEmail(testData) {
        const formData = new FormData();
        
        // Add user info
        Object.entries(testData.userInfo).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Add results
        Object.entries(testData.results.intelligenceScores).forEach(([type, score]) => {
            formData.append(`${type}_score`, score.percentage);
            formData.append(`${type}_correct`, score.correct);
            formData.append(`${type}_total`, score.total);
        });

        formData.append('dominant_intelligence', testData.results.dominantIntelligence);
        formData.append('overall_score', testData.results.overallScore);
        formData.append('total_time', Math.round(testData.results.totalTime / 1000));

        const response = await fetch(CONFIG.emailEndpoint, {
            method: 'POST',
            body: formData
        });

        return response;
    }

    showResults() {
        this.showSection('resultsSection');
        this.renderResults();
        this.createChart();
    }

    renderResults() {
        const resultsDetails = document.getElementById('resultsDetails');
        const results = this.state.results;
        
        const intelligenceLabels = {
            linguistic: 'Inteligencia Lingüística',
            logical: 'Inteligencia Lógico-Matemática', 
            spatial: 'Inteligencia Espacial',
            musical: 'Inteligencia Musical',
            bodily: 'Inteligencia Corporal-Kinestésica',
            interpersonal: 'Inteligencia Interpersonal',
            intrapersonal: 'Inteligencia Intrapersonal',
            naturalistic: 'Inteligencia Naturalista'
        };

        let html = `
            <div class="results-summary">
                <h3>Resumen General</h3>
                <div class="summary-item">
                    <span class="summary-label">Puntuación Global:</span>
                    <span class="summary-value">${results.overallScore}%</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Inteligencia Dominante:</span>
                    <span class="summary-value">${intelligenceLabels[results.dominantIntelligence]}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Tiempo Total:</span>
                    <span class="summary-value">${Math.round(results.totalTime / 60000)} minutos</span>
                </div>
            </div>
            
            <div class="intelligence-breakdown">
                <h3>Desglose por Inteligencias</h3>
        `;

        Object.entries(results.intelligenceScores).forEach(([type, score]) => {
            const label = intelligenceLabels[type];
            const color = this.getIntelligenceColor(type);
            
            html += `
                <div class="intelligence-item" style="border-left-color: ${color}">
                    <div class="intelligence-info">
                        <span class="intelligence-name">${label}</span>
                        <div class="intelligence-details">
                            <span class="correct-answers">${score.correct}/${score.total} correctas</span>
                            <span class="avg-time">${Math.round(score.averageResponseTime/1000)}s promedio</span>
                        </div>
                    </div>
                    <div class="intelligence-score">${score.percentage}%</div>
                </div>
            `;
        });

        html += `
            </div>
            
            <div class="recommendations">
                <h3>Recomendaciones Personalizadas</h3>
                <div class="recommendation-content">
                    ${this.getRecommendations(results.dominantIntelligence)}
                </div>
            </div>
        `;

        resultsDetails.innerHTML = html;
    }

    createChart() {
        const ctx = document.getElementById('resultsChart').getContext('2d');
        const results = this.state.results;
        
        const labels = Object.keys(results.intelligenceScores).map(type => 
            this.getIntelligenceLabel(type)
        );
        
        const data = Object.values(results.intelligenceScores).map(score => score.percentage);
        const colors = Object.keys(results.intelligenceScores).map(type => 
            this.getIntelligenceColor(type)
        );

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Puntuación (%)',
                    data: data,
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: colors,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(37, 99, 235, 1)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.r + '% de aciertos';
                            }
                        }
                    }
                }
            }
        });
    }

    getIntelligenceLabel(type) {
        const labels = {
            linguistic: 'Lingüística',
            logical: 'Lógico-Matemática',
            spatial: 'Espacial',
            musical: 'Musical',
            bodily: 'Corporal-Kinestésica',
            interpersonal: 'Interpersonal',
            intrapersonal: 'Intrapersonal',
            naturalistic: 'Naturalista'
        };
        return labels[type] || type;
    }

    getIntelligenceColor(type) {
        const colors = {
            linguistic: '#3b82f6',
            logical: '#10b981',
            spatial: '#8b5cf6',
            musical: '#f59e0b',
            bodily: '#ef4444',
            interpersonal: '#ec4899',
            intrapersonal: '#6366f1',
            naturalistic: '#059669'
        };
        return colors[type] || '#6b7280';
    }

    getRecommendations(dominantType) {
        const recommendations = {
            linguistic: `
                <h4>📚 Inteligencia Lingüística Dominante</h4>
                <p>Tienes una excelente capacidad para el lenguaje y la comunicación. Te recomendamos:</p>
                <ul>
                    <li>Explorar la escritura creativa o periodística</li>
                    <li>Practicar idiomas adicionales</li>
                    <li>Participar en debates y presentaciones</li>
                    <li>Leer géneros literarios diversos</li>
                </ul>
            `,
            logical: `
                <h4>🔬 Inteligencia Lógico-Matemática Dominante</h4>
                <p>Destacas en el pensamiento lógico y análisis. Te sugerimos:</p>
                <ul>
                    <li>Explorar programación y ciencias de la computación</li>
                    <li>Practicar matemáticas avanzadas y estadística</li>
                    <li>Resolver puzzles y acertijos complejos</li>
                    <li>Considerar carreras en ingeniería o ciencias</li>
                </ul>
            `,
            spatial: `
                <h4>🎨 Inteligencia Espacial Dominante</h4>
                <p>Posees una gran capacidad visual y espacial. Recomendamos:</p>
                <ul>
                    <li>Desarrollar habilidades en diseño gráfico o arquitectura</li>
                    <li>Practicar dibujo técnico y artístico</li>
                    <li>Explorar la geometría y el arte 3D</li>
                    <li>Jugar juegos que requieran orientación espacial</li>
                </ul>
            `,
            musical: `
                <h4>🎵 Inteligencia Musical Dominante</h4>
                <p>Tienes un talento natural para la música. Te aconsejamos:</p>
                <ul>
                    <li>Aprender a tocar instrumentos musicales</li>
                    <li>Estudiar teoría musical y composición</li>
                    <li>Participar en coros o grupos musicales</li>
                    <li>Explorar la producción musical digital</li>
                </ul>
            `,
            bodily: `
                <h4>🏃 Inteligencia Corporal-Kinestésica Dominante</h4>
                <p>Excelente coordinación y control corporal. Sugerimos:</p>
                <ul>
                    <li>Practicar deportes y actividades físicas</li>
                    <li>Explorar danza y artes escénicas</li>
                    <li>Desarrollar habilidades manuales y artesanías</li>
                    <li>Considerar fisioterapia o educación física</li>
                </ul>
            `,
            interpersonal: `
                <h4>🤝 Inteligencia Interpersonal Dominante</h4>
                <p>Tienes gran habilidad para relacionarte con otros. Recomendamos:</p>
                <ul>
                    <li>Desarrollar habilidades de liderazgo</li>
                    <li>Considerar carreras en psicología o trabajo social</li>
                    <li>Participar en actividades grupales y voluntariado</li>
                    <li>Practicar la mediación y resolución de conflictos</li>
                </ul>
            `,
            intrapersonal: `
                <h4>🧘 Inteligencia Intrapersonal Dominante</h4>
                <p>Excelente autoconocimiento y reflexión. Te sugerimos:</p>
                <ul>
                    <li>Practicar meditación y mindfulness</li>
                    <li>Llevar un diario de reflexión personal</li>
                    <li>Explorar la filosofía y psicología</li>
                    <li>Desarrollar metas de crecimiento personal</li>
                </ul>
            `,
            naturalistic: `
                <h4>🌱 Inteligencia Naturalista Dominante</h4>
                <p>Tienes una conexión especial con la naturaleza. Recomendamos:</p>
                <ul>
                    <li>Estudiar biología, botánica o zoología</li>
                    <li>Participar en actividades de conservación</li>
                    <li>Explorar la jardinería y agricultura</li>
                    <li>Realizar actividades al aire libre y senderismo</li>
                </ul>
            `
        };

        return recommendations[dominantType] || `
            <h4>🌟 Perfil Equilibrado</h4>
            <p>Muestras un desarrollo equilibrado en múltiples inteligencias. Te sugerimos explorar diferentes áreas para descubrir tus verdaderas pasiones.</p>
        `;
    }

    downloadResults() {
        const results = this.state.results;
        const userInfo = this.state.userInfo;
        
        const reportContent = `
REPORTE DE ANÁLISIS COGNITIVO
=============================

INFORMACIÓN PERSONAL
-------------------
Nombre: ${userInfo.nombre}
Email: ${userInfo.email}
Edad: ${userInfo.edad || 'No especificada'}
Profesión: ${userInfo.profesion || 'No especificada'}
Ciudad: ${userInfo.sede || 'No especificada'}
Fecha: ${new Date().toLocaleDateString()}

RESULTADOS GENERALES
-------------------
Puntuación Global: ${results.overallScore}%
Inteligencia Dominante: ${this.getIntelligenceLabel(results.dominantIntelligence)}
Tiempo Total: ${Math.round(results.totalTime / 60000)} minutos
Preguntas Completadas: ${results.completedQuestions}/${CONFIG.totalQuestions}

DESGLOSE POR INTELIGENCIAS
-------------------------
${Object.entries(results.intelligenceScores).map(([type, score]) => 
    `${this.getIntelligenceLabel(type)}: ${score.percentage}% (${score.correct}/${score.total} correctas)`
).join('\n')}

RECOMENDACIONES
--------------
${this.getRecommendations(results.dominantIntelligence).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')}

---
Generado por English My Way - Test de Análisis Cognitivo
        `;

        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte-cognitivo-${userInfo.nombre.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    shareResults() {
        const results = this.state.results;
        const shareText = `¡Acabo de completar el Test de Análisis Cognitivo! 🧠\n\nMi puntuación global: ${results.overallScore}%\nInteligencia dominante: ${this.getIntelligenceLabel(results.dominantIntelligence)}\n\n¡Prueba tú también! #TestCognitivo #EnglishMyWay`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Mis Resultados del Test Cognitivo',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('¡Resultados copiados al portapapeles! Puedes pegarlos donde quieras compartirlos.');
            });
        }
    }

    retakeTest() {
        if (confirm('¿Estás seguro de que quieres volver a tomar el test? Se perderán los resultados actuales.')) {
            this.state.reset();
            this.showSection('hero');
        }
    }

    showSection(sectionId) {
        const sections = ['hero', 'userForm', 'testSection', 'resultsSection'];
        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = id === sectionId ? 'block' : 'none';
            }
        });
        
        this.state.currentStep = sectionId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    animateSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    showLoadingSpinner(show) {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = show ? 'flex' : 'none';
        }
    }
}

// ==============================================
// INITIALIZATION
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    try {
        const app = new CognitiveTestApp();
        
        // Make app globally accessible for debugging
        window.cognitiveTestApp = app;
        
        console.log('🧠 Test de Análisis Cognitivo cargado correctamente');
        console.log('📊 Total de preguntas:', CONFIG.totalQuestions);
        console.log('🎯 Tipos de inteligencia:', CONFIG.intelligenceTypes);
        
        // Test button functionality immediately
        const startBtn = document.getElementById('startTestBtn');
        if (startBtn) {
            console.log('✅ Botón Comenzar Test encontrado');
        } else {
            console.error('❌ Botón Comenzar Test no encontrado');
        }
        
    } catch (error) {
        console.error('❌ Error al inicializar la aplicación:', error);
        
        // Fallback simple si hay error
        initSimpleFallback();
    }
});

// Fallback simple si hay problemas con la clase principal
function initSimpleFallback() {
    console.log('🔄 Iniciando modo fallback simple...');
    
    const startBtn = document.getElementById('startTestBtn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log('👆 Click en Comenzar Test - Modo Fallback');
            showSection('userForm');
        });
    }
    
    function showSection(sectionId) {
        const sections = ['hero', 'userForm', 'testSection', 'resultsSection'];
        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = id === sectionId ? 'block' : 'none';
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('📍 Mostrando sección:', sectionId);
    }
}

// ==============================================
// SERVICE WORKER REGISTRATION (Optional)
// ==============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}