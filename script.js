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
        // === RESULTADOS COMPLETOS (TEXTO DEL DOM) ===
        const resultsSection = document.getElementById('resultsSection');
        const resultsText = resultsSection ? resultsSection.innerText.replace(/\n{3,}/g, '\n\n') : '';
        
        if (resultsText) {
            const addTextWithPagination = (text, startY) => {
                const lines = doc.splitTextToSize(text, contentWidth);
                const lineHeight = 6;
                const pageHeight = doc.internal.pageSize.getHeight();
                let y = startY;
                
                lines.forEach(line => {
                    if (y + lineHeight > pageHeight - 25) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.text(line, margin, y);
                    y += lineHeight;
                });
                return y;
            };
            
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Resultados completos', margin, yPos);
            
            yPos += 10;
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            yPos = addTextWithPagination(resultsText, yPos);
        }
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
    async function downloadResults() {
        console.log('📥 Generando PDF de resultados...');
    
        try {
            // Verificar que jsPDF esté disponible
            if (!window.jspdf || !window.jspdf.jsPDF) {
                console.error('❌ jsPDF no está cargado');
                alert('Error: No se pudo cargar la librería de PDF. Por favor, recarga la página e intenta de nuevo.');
                return;
            }
        
            const resultsSection = document.getElementById('resultsSection');
            if (!resultsSection) {
                alert('No se encontró la sección de resultados.');
                return;
            }
        
            // Clonar la sección para renderizarla en PDF sin afectar la UI
            const clone = resultsSection.cloneNode(true);
            clone.style.display = 'block';
            clone.style.position = 'fixed';
            clone.style.left = '-10000px';
            clone.style.top = '0';
            clone.style.width = '800px';
            clone.style.maxWidth = '800px';
            clone.style.background = '#ffffff';
            clone.style.padding = '20px';
            document.body.appendChild(clone);
        
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'pt', 'a4');
            const fileName = 'Resultados-Test-' + (appState.userInfo?.name || 'Usuario').replace(/\s+/g, '-') + '.pdf';
        
            await doc.html(clone, {
                x: 20,
                y: 20,
                width: 555,
                windowWidth: 800,
                autoPaging: 'text',
                html2canvas: {
                    scale: 0.75,
                    useCORS: true
                },
                callback: (docInstance) => {
                    docInstance.save(fileName);
                }
            });
        
            document.body.removeChild(clone);
            console.log('✅ PDF generado y descargado: ' + fileName);
        
        } catch (error) {
            console.error('❌ Error al generar PDF:', error);
            const errorMessage = error && error.message ? error.message : 'Error desconocido';
            alert('Hubo un error al generar el PDF: ' + errorMessage + '. Por favor, intenta de nuevo.');
        }
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
    const city = document.getElementById('ciudad').value.trim();
    
    if (!name || !email) {
        alert('Por favor, completa al menos el nombre y email');
        return;
    }
    
    console.log('✅ Datos del formulario válidos');
    const phone = document.getElementById('telefono')?.value?.trim() || '';
    appState.userInfo = { name, email, age, profession, city, phone };
    
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
    
    // Inicializar contadores para inteligencias
    const intelligenceScores = {
        linguistic: { total: 0, count: 0, percentage: 0, maxPossible: 0 },
        logical: { total: 0, count: 0, percentage: 0, maxPossible: 0 },
        spatial: { total: 0, count: 0, percentage: 0, maxPossible: 0 },
        bodily: { total: 0, count: 0, percentage: 0, maxPossible: 0 },
        musical: { total: 0, count: 0, percentage: 0, maxPossible: 0 },
        interpersonal: { total: 0, count: 0, percentage: 0, maxPossible: 0 },
        intrapersonal: { total: 0, count: 0, percentage: 0, maxPossible: 0 }
    };
    
    // Estilos de aprendizaje VAK (Visual, Auditivo, Kinestésico)
    const learningScores = {
        visual: { total: 0, count: 0, percentage: 0, description: 'Visual' },
        auditivo: { total: 0, count: 0, percentage: 0, description: 'Auditivo' },
        kinestesico: { total: 0, count: 0, percentage: 0, description: 'Kinestésico' }
    };
    
    // Procesar respuestas
    appState.answers.forEach((answer, index) => {
        if (!answer) return;
        
        console.log(`Procesando respuesta ${index + 1}:`, answer);
        
        // Asignar a inteligencia (preguntas de escala 1-5)
        if (answer.intelligence && intelligenceScores[answer.intelligence]) {
            const value = parseFloat(answer.answer) || 0;
            intelligenceScores[answer.intelligence].total += value;
            intelligenceScores[answer.intelligence].count++;
            intelligenceScores[answer.intelligence].maxPossible += 5; // Máximo posible por pregunta
        }
        
        // Asignar a estilo de aprendizaje (preguntas sí/no)
        if (answer.learning && learningScores[answer.learning]) {
            // Para preguntas sí/no, contamos las respuestas "sí" (1)
            const value = answer.answer === 1 || answer.answer === true ? 1 : 0;
            learningScores[answer.learning].total += value;
            learningScores[answer.learning].count++;
        }
    });
    
    // Calcular porcentajes REALES para inteligencias (basado en puntuación máxima posible)
    for (let key in intelligenceScores) {
        const intel = intelligenceScores[key];
        if (intel.count > 0) {
            intel.average = intel.total / intel.count;
            // Porcentaje real: (puntuación obtenida / puntuación máxima) * 100
            intel.percentage = (intel.total / intel.maxPossible) * 100;
        } else {
            intel.average = 0;
            intel.percentage = 0;
        }
    }
    
    // Calcular porcentajes REALES para estilos de aprendizaje
    // Porcentaje = (respuestas "sí" / total preguntas del estilo) * 100
    let totalLearningResponses = 0;
    let totalYesResponses = 0;
    for (let key in learningScores) {
        totalLearningResponses += learningScores[key].count;
        totalYesResponses += learningScores[key].total;
    }
    
    for (let key in learningScores) {
        const style = learningScores[key];
        if (style.count > 0) {
            // Porcentaje de respuestas "sí" para este estilo sobre el total de preguntas de ese estilo
            style.percentage = (style.total / style.count) * 100;
            // También calcular el peso relativo respecto al total de respuestas "sí"
            style.relativeWeight = totalYesResponses > 0 ? (style.total / totalYesResponses) * 100 : 0;
            style.average = style.percentage / 100 * 5; // Normalizar a escala 0-5 para consistencia
        } else {
            style.percentage = 0;
            style.relativeWeight = 0;
            style.average = 0;
        }
    }
    
    console.log('📊 Estilos de aprendizaje calculados:', learningScores);
    
    // Ordenar inteligencias por porcentaje real
    const sortedIntelligences = Object.entries(intelligenceScores)
        .map(([key, data]) => ({ key, ...data }))
        .filter(intel => intel.count > 0) // Solo incluir las que tienen respuestas
        .sort((a, b) => b.percentage - a.percentage);
    
    // Ordenar estilos de aprendizaje por número de respuestas "sí" (total) y luego por porcentaje
    const sortedLearning = Object.entries(learningScores)
        .map(([key, data]) => ({ key, ...data }))
        .sort((a, b) => {
            // Primero ordenar por total de respuestas "sí" (descendente)
            if (b.total !== a.total) return b.total - a.total;
            // Si empatan, ordenar por porcentaje
            return b.percentage - a.percentage;
        });
    
    console.log('📊 Estilos ordenados:', sortedLearning);
    
    appState.results = {
        intelligences: intelligenceScores,
        learning: learningScores,
        dominant: {
            intelligence: sortedIntelligences[0] || { key: 'unknown', percentage: 0 },
            learning: sortedLearning[0] || { key: 'unknown', percentage: 0 }
        },
        top3: {
            intelligences: sortedIntelligences.slice(0, 3),
            learning: sortedLearning.slice(0, 4) // Mostrar los 4 estilos
        },
        allIntelligences: sortedIntelligences,
        allLearning: sortedLearning,
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
    
    // Definir nombres y descripciones en español para INTELIGENCIAS
    const intelligenceNames = {
        linguistic: { name: 'Lingüística-Verbal', icon: '📝', description: 'Habilidad para usar palabras de manera efectiva, tanto oral como escrita.' },
        logical: { name: 'Lógico-Matemática', icon: '🔢', description: 'Capacidad para el razonamiento lógico, la resolución de problemas y el pensamiento matemático.' },
        spatial: { name: 'Espacial-Visual', icon: '🎨', description: 'Habilidad para percibir el mundo visual con precisión y recrear experiencias visuales.' },
        bodily: { name: 'Corporal-Cinestésica', icon: '🤸', description: 'Capacidad para usar el cuerpo para expresar ideas y sentimientos.' },
        musical: { name: 'Musical-Rítmica', icon: '🎵', description: 'Habilidad para percibir, discriminar, transformar y expresar formas musicales.' },
        interpersonal: { name: 'Interpersonal-Social', icon: '👥', description: 'Capacidad para entender y relacionarse efectivamente con otras personas.' },
        intrapersonal: { name: 'Intrapersonal-Reflexiva', icon: '🧘', description: 'Habilidad para comprenderse a uno mismo y actuar en consecuencia.' }
    };
    
    // ESTILOS DE APRENDIZAJE VAK (Visual, Auditivo, Kinestésico)
    const learningNames = {
        visual: { 
            name: 'Visual', 
            icon: '👁️', 
            description: 'Aprendes mejor viendo imágenes, videos, gráficos y texto escrito. Tu mente procesa mejor la información cuando la puedes visualizar.',
            activities: ['📖 Read and Write', '🎬 Showtime'],
            tips: [
                '📖 READ AND WRITE: Lee libros, artículos y usa tarjetas de vocabulario',
                '🎬 SHOWTIME: Ve películas, series y tutoriales en inglés con subtítulos'
            ]
        },
        auditivo: { 
            name: 'Auditivo', 
            icon: '👂', 
            description: 'Aprendes mejor escuchando explicaciones, música, podcasts y conversaciones. Tu oído es tu mejor herramienta de aprendizaje.',
            activities: ['🎧 Jukebox', '💬 Wordmadness'],
            tips: [
                '🎧 JUKEBOX: Escucha podcasts, canciones y audiolibros en inglés',
                '💬 WORDMADNESS: Participa en conversaciones y practica la pronunciación'
            ]
        },
        kinestesico: { 
            name: 'Kinestésico', 
            icon: '🤸', 
            description: 'Aprendes mejor haciendo, practicando y experimentando. Necesitas movimiento y actividad física para procesar información.',
            activities: ['🎬 Showtime', '💬 Wordmadness'],
            tips: [
                '🎬 SHOWTIME: Participa en role-plays, dramatizaciones y actividades interactivas',
                '💬 WORDMADNESS: Practica conversaciones reales y juegos de vocabulario activos'
            ]
        }
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
    
    // Renderizar los 3 estilos de aprendizaje VAK ordenados por relevancia
    const learningData = results.allLearning || results.top3.learning || [];
    
    console.log('📊 Datos de aprendizaje para mostrar:', learningData);
    
    const learningHTML = learningData.slice(0, 3).map((style, index) => {
        const info = learningNames[style.key] || { name: style.key, icon: '🎯', description: '', tips: [], activities: [] };
        // Mostrar el porcentaje de respuestas afirmativas
        const percentage = style.percentage ? style.percentage.toFixed(0) : 0;
        const position = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
        const isDominant = index === 0;
        const totalResponses = style.total || 0;
        const totalQuestions = style.count || 0;
        
        return `
            <div class="learning-card ${isDominant ? 'dominant' : ''} learning-rank-${index + 1}">
                <div class="learning-position">${position}</div>
                <div class="learning-icon">${info.icon}</div>
                <h3>Aprendizaje ${info.name}</h3>
                <div class="learning-percentage">${percentage}%</div>
                <div class="learning-bar-container">
                    <div class="learning-bar-fill" style="width: ${percentage}%; background: ${getColorForIndex(index + 3)}"></div>
                </div>
                <p class="learning-description">${info.description}</p>
                <div class="learning-stats">
                    <span>✓ ${totalResponses} afirmativas de ${totalQuestions} preguntas</span>
                </div>
                ${isDominant && info.activities ? `
                    <div class="learning-activities">
                        <strong>🎯 Actividades recomendadas para ti:</strong>
                        <div class="activities-badges">
                            ${info.activities.map(act => `<span class="activity-badge">${act}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                ${isDominant && info.tips ? `
                    <div class="learning-tips">
                        <strong>💡 Consejos de English My Way:</strong>
                        <ul>
                            ${info.tips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
    
    // Generar recomendaciones personalizadas MEJORADAS
    const recommendations = generateIntelligentRecommendations(results);
    
    // Actualizar el DOM con botones FUNCIONALES
    const resultsContainer = document.getElementById('resultsSection');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="results-container">
                <div class="results-header">
                    <div class="results-logo">
                        <img src="logo-english-myway.png" alt="English My Way" class="results-logo-img">
                    </div>
                    <h1>✨ Tus Resultados Personalizados</h1>
                    <p>Hola <strong>${appState.userInfo.name}</strong>, aquí está tu análisis completo:</p>
                    <div class="test-info">
                        <span>⏱️ Tiempo: ${Math.floor(results.duration / 60)}m ${results.duration % 60}s</span>
                        <span>✅ ${results.totalAnswers} respuestas</span>
                        <span>📅 ${new Date().toLocaleDateString('es-ES')}</span>
                    </div>
                </div>
                
                <div class="section">
                    <h2>🧠 Tus Inteligencias Múltiples Más Desarrolladas</h2>
                    <p class="section-subtitle">Según la teoría de Howard Gardner, todos poseemos múltiples inteligencias en diferentes grados.</p>
                    <div class="results-grid">
                        ${intelligencesHTML}
                    </div>
                </div>
                
                <div class="section">
                    <h2>📚 Tus Estilos de Aprendizaje (${appState.userInfo.name})</h2>
                    <p class="section-subtitle">Conocer tu estilo de aprendizaje te ayudará a estudiar inglés de manera más efectiva en English My Way.</p>
                    <div class="learning-grid">
                        ${learningHTML}
                    </div>
                </div>
                
                <div class="section recommendations">
                    <h2>💡 Recomendaciones Personalizadas</h2>
                    ${recommendations}
                </div>
                
                <div class="actions">
                    <button id="downloadResultsBtnFinal" class="btn-primary">📥 Descargar Resultados</button>
                    <button id="shareResultsBtnFinal" class="btn-secondary">🔗 Compartir</button>
                    <button id="retakeTestBtnFinal" class="btn-outline">🔄 Hacer de nuevo</button>
                </div>
                
                <div class="email-notice">
                    <i class="fas fa-envelope"></i>
                    <p>Se ha enviado una copia de tus resultados a <strong>${appState.userInfo.email}</strong></p>
                </div>
            </div>
        `;
        
        // Agregar event listeners a los botones DESPUÉS de crear el HTML
        setTimeout(() => {
            const downloadBtn = document.getElementById('downloadResultsBtnFinal');
            const shareBtn = document.getElementById('shareResultsBtnFinal');
            const retakeBtn = document.getElementById('retakeTestBtnFinal');
            
            if (downloadBtn) {
                downloadBtn.addEventListener('click', downloadResults);
                console.log('✅ Event listener agregado: downloadResultsBtnFinal');
            }
            if (shareBtn) {
                shareBtn.addEventListener('click', shareResults);
                console.log('✅ Event listener agregado: shareResultsBtnFinal');
            }
            if (retakeBtn) {
                retakeBtn.addEventListener('click', restartTest);
                console.log('✅ Event listener agregado: retakeTestBtnFinal');
            }
            
            // Enviar correo automáticamente al mostrar resultados
            sendResultsEmail();
        }, 100);
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
        ]
    };
    
    // RECOMENDACIONES para estilos de aprendizaje VAK con actividades English My Way
    const learningRecommendations = {
        visual: [
            '📖 READ AND WRITE: Lee libros y artículos en inglés diariamente',
            '📖 READ AND WRITE: Usa tarjetas de vocabulario con imágenes',
            '🎬 SHOWTIME: Ve películas y series en inglés con subtítulos',
            '🎬 SHOWTIME: Aprende con videos tutoriales y demostraciones',
            'Usa mapas mentales y diagramas para organizar vocabulario'
        ],
        auditivo: [
            '🎧 JUKEBOX: Escucha podcasts en inglés diariamente',
            '🎧 JUKEBOX: Aprende canciones en inglés y canta',
            '🎧 JUKEBOX: Usa audiolibros para reforzar tu aprendizaje',
            '💬 WORDMADNESS: Practica conversaciones en inglés regularmente',
            '💬 WORDMADNESS: Participa en clubs de conversación'
        ],
        kinestesico: [
            '🎬 SHOWTIME: Participa en role-plays y dramatizaciones',
            '🎬 SHOWTIME: Aprende con actividades prácticas e interactivas',
            '💬 WORDMADNESS: Practica el inglés en situaciones reales',
            '💬 WORDMADNESS: Haz juegos de vocabulario activos',
            'Aprende inglés mientras haces ejercicio o caminas'
        ]
    };
    
    const intelRecs = intelligenceRecommendations[dominantIntel?.key] || [];
    const learnRecs = learningRecommendations[dominantLearning?.key] || [];
    
    // Nombres para mostrar
    const intelligenceDisplayNames = {
        linguistic: 'Lingüística',
        logical: 'Lógico-Matemática',
        spatial: 'Espacial',
        bodily: 'Corporal-Cinestésica',
        musical: 'Musical',
        interpersonal: 'Interpersonal',
        intrapersonal: 'Intrapersonal'
    };
    
    const learningDisplayNames = {
        visual: 'Visual',
        auditivo: 'Auditivo',
        kinestesico: 'Kinestésico'
    };
    
    // Actividades recomendadas por estilo
    const activityRecommendations = {
        visual: ['📖 Read and Write', '🎬 Showtime'],
        auditivo: ['🎧 Jukebox', '💬 Wordmadness'],
        kinestesico: ['🎬 Showtime', '💬 Wordmadness']
    };
    
    const activities = activityRecommendations[dominantLearning?.key] || [];
    
    const intelName = intelligenceDisplayNames[dominantIntel?.key] || dominantIntel?.key || 'desconocida';
    const learnName = learningDisplayNames[dominantLearning?.key] || dominantLearning?.key || 'desconocido';
    
    return `
        <div class="recommendations-grid">
            <div class="rec-column">
                <h3>🎯 Para potenciar tu inteligencia ${intelName}:</h3>
                <ul>
                    ${intelRecs.slice(0, 4).map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            <div class="rec-column">
                <h3>📖 Según tu estilo ${learnName}:</h3>
                <ul>
                    ${learnRecs.slice(0, 4).map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="insight-box">
            <h4>💫 Tu perfil de aprendizaje único:</h4>
            <p>
                Eres una persona con una inteligencia <strong>${intelName}</strong> destacada, 
                con un estilo de aprendizaje <strong>${learnName}</strong>. 
                ${getPersonalizedInsight(dominantIntel?.key, dominantLearning?.key)}
            </p>
            <div class="activities-recommendation">
                <h4>🎯 Actividades English My Way recomendadas para ti:</h4>
                <div class="activities-badges-large">
                    ${activities.map(act => `<span class="activity-badge-large">${act}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function getPersonalizedInsight(intelligence, learning) {
    const insights = {
        // Combinaciones con Visual
        linguistic_visual: 'Lee libros, artículos y usa tarjetas de vocabulario con imágenes. Ve películas con subtítulos en inglés.',
        logical_visual: 'Usa diagramas y mapas mentales para organizar reglas gramaticales. Los tutoriales en video son perfectos para ti.',
        spatial_visual: 'Tu perfil es ideal: aprende con videos, imágenes, infografías y contenido visual rico.',
        bodily_visual: 'Ve demostraciones en video y luego practica. Combina lo visual con la acción.',
        musical_visual: 'Ve videos musicales con letras en pantalla. Los musicales son perfectos para ti.',
        interpersonal_visual: 'Aprende viendo presentaciones grupales y videos de conversaciones reales.',
        intrapersonal_visual: 'Crea mapas mentales personales y ve videos a tu propio ritmo.',
        
        // Combinaciones con Auditivo
        linguistic_auditivo: 'Escucha podcasts, audiolibros y canciones. Repite en voz alta lo que aprendes.',
        logical_auditivo: 'Escucha explicaciones paso a paso y podcasts educativos sobre gramática.',
        spatial_auditivo: 'Escucha descripciones detalladas mientras visualizas mentalmente las escenas.',
        bodily_auditivo: 'Escucha música o podcasts mientras caminas o haces ejercicio.',
        musical_auditivo: 'Tu perfil es ideal: aprende con canciones, podcasts musicales y contenido auditivo.',
        interpersonal_auditivo: 'Participa en conversaciones, escucha entrevistas y podcasts de debates.',
        intrapersonal_auditivo: 'Escucha podcasts de reflexión y desarrollo personal en inglés.',
        
        // Combinaciones con Kinestésico
        linguistic_kinestesico: 'Practica escribiendo mientras te mueves. Haz role-plays de conversaciones.',
        logical_kinestesico: 'Aprende gramática con juegos interactivos y actividades prácticas.',
        spatial_kinestesico: 'Construye modelos, usa gestos y movimientos para recordar vocabulario.',
        bodily_kinestesico: 'Tu perfil es ideal: aprende haciendo, con dramatizaciones y actividades físicas.',
        musical_kinestesico: 'Baila mientras escuchas música en inglés. Canta y muévete con las canciones.',
        interpersonal_kinestesico: 'Aprende en grupo con juegos, competencias y actividades colaborativas.',
        intrapersonal_kinestesico: 'Practica solo con actividades interactivas y apps de aprendizaje activo.'
    };
    
    const key = `${intelligence}_${learning}`;
    return insights[key] || 'Tu combinación única te permite procesar información de manera efectiva según tu propio estilo de English My Way.';
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

function retakeTest() {
    appState.reset();
    showSection('hero');
}

function saveToDatabase() {
    // Mapear los campos del userInfo al formato esperado por la API
    const mappedUserInfo = {
        nombre: appState.userInfo.name,
        email: appState.userInfo.email,
        edad: appState.userInfo.age,
        profesion: appState.userInfo.profession,
        ciudad: appState.userInfo.city,
        celular: appState.userInfo.phone
    };
    
    const data = {
        userInfo: mappedUserInfo,
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

// Nueva función para enviar resultados por correo automáticamente
function sendResultsEmail() {
    console.log('📧 Enviando resultados por correo...');
    
    const results = appState.results;
    const userInfo = appState.userInfo;
    
    // Preparar datos de inteligencias
    const intelligencesData = {};
    if (results.allIntelligences) {
        results.allIntelligences.forEach(intel => {
            intelligencesData[intel.key] = {
                total: intel.total,
                count: intel.count,
                percentage: intel.percentage.toFixed(1),
                average: intel.average.toFixed(2)
            };
        });
    }
    
    // Preparar datos de estilos de aprendizaje
    const learningData = {};
    if (results.allLearning) {
        results.allLearning.forEach(style => {
            learningData[style.key] = {
                total: style.total,
                count: style.count,
                percentage: style.percentage.toFixed(1)
            };
        });
    }
    
    const emailData = {
        nombre: userInfo.name,
        email: userInfo.email,
        edad: userInfo.age || 'No especificada',
        profesion: userInfo.profession || 'No especificada',
        ciudad: userInfo.city || 'No especificada',
        telefono: userInfo.phone || 'No especificado',
        fecha: new Date().toLocaleString('es-ES'),
        resultados: JSON.stringify({
            intelligences: intelligencesData,
            learningStyles: learningData,
            dominant: {
                intelligence: results.dominant.intelligence?.key || 'unknown',
                learning: results.dominant.learning?.key || 'unknown'
            },
            duration: results.duration,
            totalAnswers: results.totalAnswers
        })
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
        if (data.success) {
            console.log('✅ Correo enviado correctamente:', data);
        } else {
            console.error('❌ Error al enviar correo:', data.message);
        }
    })
    .catch(error => {
        console.error('❌ Error de red al enviar correo:', error);
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

// Nombres de estilos de aprendizaje para PDF
const LEARNING_NAMES_PDF = {
    visual: { name: 'Visual', icon: '👁️' },
    auditivo: { name: 'Auditivo', icon: '👂' },
    kinestesico: { name: 'Kinestésico', icon: '🤸' }
};

function downloadResults() {
    console.log('📥 Generando PDF de resultados...');
    
    try {
        // Verificar que jsPDF esté disponible
        if (!window.jspdf || !window.jspdf.jsPDF) {
            console.error('❌ jsPDF no está cargado');
            alert('Error: No se pudo cargar la librería de PDF. Por favor, recarga la página e intenta de nuevo.');
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const userName = appState.userInfo?.name || 'Usuario';
        const userEmail = appState.userInfo?.email || '';
        const results = appState.results || {};
        const date = new Date().toLocaleDateString('es-ES');
        
        // Colores
        const primaryColor = [37, 99, 235]; // #2563eb
        const textColor = [51, 51, 51];
        const grayColor = [100, 100, 100];
        
        let yPos = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);
        
        // === ENCABEZADO ===
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.rect(0, 0, pageWidth, 45, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('English My Way', pageWidth / 2, 18, { align: 'center' });
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text('Test de Inteligencias Multiples', pageWidth / 2, 28, { align: 'center' });
        
        doc.setFontSize(10);
        doc.text('Fecha: ' + date, pageWidth / 2, 38, { align: 'center' });
        
        yPos = 60;
        
        // === INFORMACIÓN DEL USUARIO ===
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Informacion del Usuario', margin, yPos);
        
        yPos += 10;
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('Nombre: ' + userName, margin, yPos);
        yPos += 7;
        doc.text('Email: ' + userEmail, margin, yPos);
        yPos += 7;
        const userCity = appState.userInfo.city || 'No especificada';
        doc.text('Ciudad: ' + userCity, margin, yPos);
        yPos += 7;
        const userPhone = appState.userInfo.phone || 'No especificado';
        doc.text('Telefono: ' + userPhone, margin, yPos);
        yPos += 7;
        doc.text('Respuestas completadas: ' + (results.totalAnswers || 40), margin, yPos);
        
        yPos += 15;
        
        // === INTELIGENCIAS MÚLTIPLES ===
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Tus Inteligencias Multiples', margin, yPos);
        
        yPos += 10;
        
        const topIntelligences = results.top3?.intelligences || [];
        if (topIntelligences.length) {
            topIntelligences.forEach((intel, index) => {
                const intelName = intel?.name || 'Sin datos';
                const intelPercentage = Number.isFinite(intel?.percentage) ? intel.percentage : 0;
                const medal = index === 0 ? '1ro' : index === 1 ? '2do' : '3ro';
                const barWidth = (intelPercentage / 100) * (contentWidth - 60);
                
                // Fondo de la barra
                doc.setFillColor(230, 230, 230);
                doc.roundedRect(margin, yPos, contentWidth - 40, 10, 2, 2, 'F');
                
                // Barra de progreso
                doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
                doc.roundedRect(margin, yPos, barWidth, 10, 2, 2, 'F');
                
                // Texto
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text(medal + ' - ' + intelName, margin + 3, yPos + 7);
                
                // Porcentaje
                doc.setFont('helvetica', 'normal');
                doc.text(Math.round(intelPercentage) + '%', contentWidth, yPos + 7);
                
                yPos += 15;
            });
        }
        
        yPos += 10;
        
        // === ESTILOS DE APRENDIZAJE ===
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Tus Estilos de Aprendizaje', margin, yPos);
        
        yPos += 10;
        
        const learningStyles = results.allLearning || [];
        if (learningStyles.length) {
            learningStyles.forEach((style, index) => {
                const medal = index === 0 ? '1ro' : index === 1 ? '2do' : '3ro';
                const info = LEARNING_NAMES_PDF[style.key] || { name: style.key };
                const percentage = Number.isFinite(style?.percentage) ? style.percentage : 0;
                const barWidth = (percentage / 100) * (contentWidth - 60);
                
                // Fondo de la barra
                doc.setFillColor(230, 230, 230);
                doc.roundedRect(margin, yPos, contentWidth - 40, 10, 2, 2, 'F');
                
                // Barra de progreso
                doc.setFillColor(76, 175, 80); // Verde para estilos de aprendizaje
                doc.roundedRect(margin, yPos, barWidth, 10, 2, 2, 'F');
                
                // Texto
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text(medal + ' - Aprendizaje ' + info.name, margin + 3, yPos + 7);
                
                // Porcentaje
                doc.setFont('helvetica', 'normal');
                doc.text(percentage.toFixed(0) + '%', contentWidth, yPos + 7);
                
                yPos += 15;
            });
        }
        
        // Verificar si necesitamos nueva página
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        yPos += 15;
        
        // === RECOMENDACIONES ===
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Recomendaciones', margin, yPos);
        
        yPos += 10;
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        // Recomendación basada en inteligencia dominante
        if (topIntelligences[0]) {
            const dominant = topIntelligences[0];
            const recommendations = [
                'Aprovecha tu inteligencia ' + (dominant.name || 'principal').toLowerCase() + ' para aprender ingles.',
                'Busca actividades que combinen tus fortalezas con el aprendizaje del idioma.',
                'En English My Way tenemos metodos adaptados a tu estilo de aprendizaje.'
            ];
            
            recommendations.forEach(rec => {
                const lines = doc.splitTextToSize('- ' + rec, contentWidth);
                doc.text(lines, margin, yPos);
                yPos += lines.length * 6;
            });
        }
        
        // === PIE DE PÁGINA ===
        const footerY = doc.internal.pageSize.getHeight() - 20;
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
        
        doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
        doc.setFontSize(9);
        doc.text('Generado por English My Way - Test de Inteligencias Multiples', pageWidth / 2, footerY, { align: 'center' });
        doc.text('(c) ' + new Date().getFullYear() + ' Todos los derechos reservados', pageWidth / 2, footerY + 5, { align: 'center' });
        
        // Descargar el PDF
        const fileName = 'Resultados-Test-' + userName.replace(/\s+/g, '-') + '.pdf';
        doc.save(fileName);
        
        console.log('✅ PDF generado y descargado: ' + fileName);
        
    } catch (error) {
        console.error('❌ Error al generar PDF:', error);
        
        try {
            if (window.jspdf && window.jspdf.jsPDF) {
                const { jsPDF } = window.jspdf;
                const fallbackDoc = new jsPDF();
                fallbackDoc.setFont('helvetica', 'bold');
                fallbackDoc.setFontSize(16);
                fallbackDoc.text('Resultados del Test', 20, 20);
                fallbackDoc.setFont('helvetica', 'normal');
                fallbackDoc.setFontSize(11);
                fallbackDoc.text('No se pudo generar el PDF completo.', 20, 35);
                fallbackDoc.text('Intenta de nuevo o recarga la página.', 20, 45);
                const fallbackName = 'Resultados-Test-' + (appState.userInfo?.name || 'Usuario').replace(/\s+/g, '-') + '.pdf';
                fallbackDoc.save(fallbackName);
                return;
            }
        } catch (fallbackError) {
            console.error('❌ Error al generar PDF de respaldo:', fallbackError);
        }
        
        const errorMessage = error && error.message ? error.message : 'Error desconocido';
        alert('Hubo un error al generar el PDF: ' + errorMessage + '. Por favor, intenta de nuevo.');
    }
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
