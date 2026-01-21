-- ============================================
-- BASE DE DATOS PARA TEST COGNITIVO
-- Versión ULTRA COMPATIBLE para hosting compartido
-- Sin funciones avanzadas que puedan causar errores
-- ============================================

-- Usar la base de datos existente
USE u527555083_testenglish;

-- Eliminar tablas existentes si existen (para evitar duplicados)
DROP TABLE IF EXISTS test_answers;
DROP TABLE IF EXISTS intelligence_scores;
DROP TABLE IF EXISTS cognitive_tests;

-- Tabla principal para almacenar información de los tests
CREATE TABLE cognitive_tests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    test_id VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    edad INT NULL,
    profesion VARCHAR(100) NULL,
    celular VARCHAR(20) NULL,
    overall_score DECIMAL(5,2) NOT NULL,
    dominant_intelligence VARCHAR(20) NOT NULL,
    total_time INT NOT NULL,
    completed_questions INT DEFAULT 0,
    submission_date DATETIME NOT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Índices simples para la tabla principal
CREATE INDEX idx_submission_date ON cognitive_tests (submission_date);
CREATE INDEX idx_dominant_intelligence ON cognitive_tests (dominant_intelligence);
CREATE INDEX idx_overall_score ON cognitive_tests (overall_score);
CREATE INDEX idx_email ON cognitive_tests (email);

-- Tabla para almacenar las puntuaciones detalladas por tipo de inteligencia
CREATE TABLE intelligence_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    test_id VARCHAR(50) NOT NULL,
    intelligence_type VARCHAR(30) NOT NULL,
    correct_answers INT NOT NULL DEFAULT 0,
    total_questions INT NOT NULL DEFAULT 0,
    percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    average_response_time INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Índices para la tabla de puntuaciones
CREATE INDEX idx_test_id_scores ON intelligence_scores (test_id);
CREATE INDEX idx_intelligence_type ON intelligence_scores (intelligence_type);
CREATE INDEX idx_percentage ON intelligence_scores (percentage);

-- Tabla para almacenar respuestas individuales
CREATE TABLE test_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    test_id VARCHAR(50) NOT NULL,
    question_index INT NOT NULL,
    question_type VARCHAR(30) NOT NULL,
    question_category VARCHAR(50) NULL,
    selected_option INT NOT NULL,
    correct_option INT NOT NULL,
    is_correct TINYINT(1) NOT NULL,
    response_time INT DEFAULT 0,
    answered_at DATETIME NOT NULL
) ENGINE=InnoDB;

-- Índices para la tabla de respuestas
CREATE INDEX idx_test_id_answers ON test_answers (test_id);
CREATE INDEX idx_question_type ON test_answers (question_type);
CREATE INDEX idx_is_correct ON test_answers (is_correct);

-- Insertar datos de ejemplo para testing
INSERT INTO cognitive_tests (
    test_id, nombre, email, edad, profesion, celular,
    overall_score, dominant_intelligence, total_time, completed_questions,
    submission_date, ip_address
) VALUES 
('CT_20260121_TEST001', 'Usuario de Prueba', 'test@example.com', 25, 'Estudiante', '+57 300 123 4567',
 85.5, 'logical', 1800000, 40, NOW(), '127.0.0.1');

-- Insertar puntuaciones de ejemplo
INSERT INTO intelligence_scores (test_id, intelligence_type, correct_answers, total_questions, percentage, average_response_time) VALUES 
('CT_20260121_TEST001', 'linguistic', 4, 5, 80.00, 45000),
('CT_20260121_TEST001', 'logical', 5, 5, 100.00, 35000),
('CT_20260121_TEST001', 'spatial', 4, 5, 80.00, 50000),
('CT_20260121_TEST001', 'musical', 3, 5, 60.00, 40000),
('CT_20260121_TEST001', 'bodily', 3, 5, 60.00, 38000),
('CT_20260121_TEST001', 'interpersonal', 4, 5, 80.00, 42000),
('CT_20260121_TEST001', 'intrapersonal', 4, 5, 80.00, 47000),
('CT_20260121_TEST001', 'naturalistic', 3, 5, 60.00, 43000);

-- Mensaje de confirmación
SELECT 'Base de datos configurada exitosamente para Test Cognitivo' as mensaje;