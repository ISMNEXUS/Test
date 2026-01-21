-- ============================================
-- VERSIÓN MÍNIMA PARA HOSTING COMPARTIDO
-- Solo tablas esenciales sin funciones avanzadas
-- ============================================

-- Tabla principal para almacenar información de los tests
CREATE TABLE IF NOT EXISTS cognitive_tests (
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

-- Tabla para puntuaciones por tipo de inteligencia
CREATE TABLE IF NOT EXISTS intelligence_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    test_id VARCHAR(50) NOT NULL,
    intelligence_type VARCHAR(20) NOT NULL,
    correct_answers INT NOT NULL DEFAULT 0,
    total_questions INT NOT NULL DEFAULT 0,
    percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    average_response_time INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabla para respuestas individuales
CREATE TABLE IF NOT EXISTS test_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    test_id VARCHAR(50) NOT NULL,
    question_index INT NOT NULL,
    question_type VARCHAR(20) NOT NULL,
    selected_option INT NOT NULL,
    correct_option INT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    response_time INT DEFAULT 0,
    answered_at DATETIME NOT NULL
) ENGINE=InnoDB;

-- Datos de ejemplo
INSERT IGNORE INTO cognitive_tests (
    test_id, nombre, email, edad, profesion, celular,
    overall_score, dominant_intelligence, total_time, completed_questions,
    submission_date, ip_address
) VALUES 
('CT_20260121_TEST001', 'Usuario de Prueba', 'test@example.com', 25, 'Estudiante', '+57 300 123 4567',
 85.5, 'logical', 1800000, 40, NOW(), '127.0.0.1');