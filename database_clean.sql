-- ============================================
-- BASE DE DATOS PARA TEST COGNITIVO
-- Versión optimizada para hosting compartido
-- ============================================

-- Usar la base de datos existente
USE u527555083_testenglish;

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
    total_time INT NOT NULL COMMENT 'Tiempo total en milisegundos',
    completed_questions INT DEFAULT 0,
    submission_date DATETIME NOT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_submission_date (submission_date),
    INDEX idx_dominant_intelligence (dominant_intelligence),
    INDEX idx_overall_score (overall_score),
    INDEX idx_email (email)
) ENGINE=InnoDB;

-- Tabla para almacenar las puntuaciones detalladas por tipo de inteligencia
CREATE TABLE IF NOT EXISTS intelligence_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    test_id VARCHAR(50) NOT NULL,
    intelligence_type ENUM(
        'linguistic', 
        'logical', 
        'spatial', 
        'musical', 
        'bodily', 
        'interpersonal', 
        'intrapersonal', 
        'naturalistic'
    ) NOT NULL,
    correct_answers INT NOT NULL DEFAULT 0,
    total_questions INT NOT NULL DEFAULT 0,
    percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    average_response_time INT DEFAULT 0 COMMENT 'Tiempo promedio de respuesta en milisegundos',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES cognitive_tests(test_id) ON DELETE CASCADE,
    UNIQUE KEY unique_test_intelligence (test_id, intelligence_type),
    INDEX idx_intelligence_type (intelligence_type),
    INDEX idx_percentage (percentage)
) ENGINE=InnoDB;

-- Tabla para almacenar respuestas individuales (opcional, para análisis detallado)
CREATE TABLE IF NOT EXISTS test_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    test_id VARCHAR(50) NOT NULL,
    question_index INT NOT NULL,
    question_type ENUM(
        'linguistic', 
        'logical', 
        'spatial', 
        'musical', 
        'bodily', 
        'interpersonal', 
        'intrapersonal', 
        'naturalistic'
    ) NOT NULL,
    question_category VARCHAR(50) NULL,
    question_difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    selected_option INT NOT NULL,
    correct_option INT NOT NULL,
    is_correct BOOLEAN AS (selected_option = correct_option) STORED,
    response_time INT DEFAULT 0 COMMENT 'Tiempo de respuesta en milisegundos',
    answered_at DATETIME NOT NULL,
    FOREIGN KEY (test_id) REFERENCES cognitive_tests(test_id) ON DELETE CASCADE,
    INDEX idx_question_type (question_type),
    INDEX idx_is_correct (is_correct),
    INDEX idx_response_time (response_time)
) ENGINE=InnoDB;

-- Tabla para estadísticas agregadas (para reportes rápidos)
CREATE TABLE IF NOT EXISTS daily_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stat_date DATE NOT NULL UNIQUE,
    total_tests INT DEFAULT 0,
    completed_tests INT DEFAULT 0,
    average_score DECIMAL(5,2) DEFAULT 0.00,
    average_time INT DEFAULT 0 COMMENT 'Tiempo promedio en milisegundos',
    most_common_intelligence VARCHAR(20) NULL,
    unique_users INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_stat_date (stat_date)
) ENGINE=InnoDB;

-- Tabla para registro de logs importantes
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    log_type ENUM('test_started', 'test_completed', 'email_sent', 'error', 'security') NOT NULL,
    test_id VARCHAR(50) NULL,
    user_email VARCHAR(150) NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    message TEXT NULL,
    additional_data JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_log_type (log_type),
    INDEX idx_created_at (created_at),
    INDEX idx_test_id (test_id),
    FOREIGN KEY (test_id) REFERENCES cognitive_tests(test_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Insertar datos de ejemplo para testing (opcional)
INSERT IGNORE INTO cognitive_tests (
    test_id, nombre, email, edad, profesion, celular,
    overall_score, dominant_intelligence, total_time, completed_questions,
    submission_date, ip_address
) VALUES 
('CT_20260121_TEST001', 'Usuario de Prueba', 'test@example.com', 25, 'Estudiante', '+57 300 123 4567',
 85.5, 'logical', 1800000, 40, NOW(), '127.0.0.1');

-- Insertar puntuaciones de ejemplo
INSERT IGNORE INTO intelligence_scores (test_id, intelligence_type, correct_answers, total_questions, percentage, average_response_time) VALUES 
('CT_20260121_TEST001', 'linguistic', 4, 5, 80.00, 45000),
('CT_20260121_TEST001', 'logical', 5, 5, 100.00, 35000),
('CT_20260121_TEST001', 'spatial', 4, 5, 80.00, 50000),
('CT_20260121_TEST001', 'musical', 3, 5, 60.00, 40000),
('CT_20260121_TEST001', 'bodily', 3, 5, 60.00, 38000),
('CT_20260121_TEST001', 'interpersonal', 4, 5, 80.00, 42000),
('CT_20260121_TEST001', 'intrapersonal', 4, 5, 80.00, 47000),
('CT_20260121_TEST001', 'naturalistic', 3, 5, 60.00, 43000);

-- Índices adicionales para optimización
CREATE INDEX idx_submission_month ON cognitive_tests (YEAR(submission_date), MONTH(submission_date));
CREATE INDEX idx_age_group ON cognitive_tests (FLOOR(edad/10)*10);
CREATE INDEX idx_score_range ON cognitive_tests (FLOOR(overall_score/10)*10);

-- Mensaje de confirmación
SELECT 'Base de datos configurada exitosamente para Test Cognitivo' as mensaje;