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

-- Trigger para actualizar estadísticas diarias
DELIMITER //
CREATE TRIGGER update_daily_stats 
AFTER INSERT ON cognitive_tests
FOR EACH ROW
BEGIN
    INSERT INTO daily_stats (
        stat_date, 
        total_tests, 
        completed_tests, 
        average_score, 
        average_time,
        unique_users
    ) VALUES (
        DATE(NEW.submission_date), 
        1, 
        IF(NEW.completed_questions >= 40, 1, 0), 
        NEW.overall_score, 
        NEW.total_time,
        1
    ) ON DUPLICATE KEY UPDATE 
        total_tests = total_tests + 1,
        completed_tests = completed_tests + IF(NEW.completed_questions >= 40, 1, 0),
        average_score = (average_score * (total_tests - 1) + NEW.overall_score) / total_tests,
        average_time = (average_time * (total_tests - 1) + NEW.total_time) / total_tests,
        unique_users = (
            SELECT COUNT(DISTINCT email) 
            FROM cognitive_tests 
            WHERE DATE(submission_date) = DATE(NEW.submission_date)
        ),
        updated_at = CURRENT_TIMESTAMP;
END//
DELIMITER ;

-- Insertar datos de ejemplo para testing (opcional)
INSERT IGNORE INTO cognitive_tests (
    test_id, nombre, email, edad, profesion, celular, sede,
    overall_score, dominant_intelligence, total_time, completed_questions,
    submission_date, ip_address
) VALUES 
('CT_20260121_TEST001', 'Usuario de Prueba', 'test@example.com', 25, 'Estudiante', '+57 300 123 4567', 'Bogotá',
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

-- Vistas útiles para reportes
CREATE OR REPLACE VIEW v_test_summary AS
SELECT 
    ct.test_id,
    ct.nombre,
    ct.email,
    ct.edad,
    ct.profesion,
    ct.sede,
    ct.overall_score,
    ct.dominant_intelligence,
    ROUND(ct.total_time / 60000, 2) as total_time_minutes,
    ct.completed_questions,
    ct.submission_date,
    COUNT(is1.intelligence_type) as intelligence_types_evaluated,
    GROUP_CONCAT(
        CONCAT(is1.intelligence_type, ':', is1.percentage, '%') 
        ORDER BY is1.percentage DESC 
        SEPARATOR ', '
    ) as intelligence_breakdown
FROM cognitive_tests ct
LEFT JOIN intelligence_scores is1 ON ct.test_id = is1.test_id
GROUP BY ct.test_id;

-- Vista para estadísticas por inteligencia
CREATE OR REPLACE VIEW v_intelligence_stats AS
SELECT 
    intelligence_type,
    COUNT(*) as total_tests,
    ROUND(AVG(percentage), 2) as average_percentage,
    ROUND(MIN(percentage), 2) as min_percentage,
    ROUND(MAX(percentage), 2) as max_percentage,
    ROUND(AVG(average_response_time / 1000), 2) as avg_response_time_seconds
FROM intelligence_scores 
GROUP BY intelligence_type
ORDER BY average_percentage DESC;

-- Vista para estadísticas demográficas
CREATE OR REPLACE VIEW v_demographic_stats AS
SELECT 
    sede,
    COUNT(*) as total_tests,
    ROUND(AVG(overall_score), 2) as average_score,
    ROUND(AVG(edad), 1) as average_age,
    COUNT(DISTINCT profesion) as unique_professions,
    dominant_intelligence as most_common_intelligence
FROM cognitive_tests 
WHERE sede IS NOT NULL
GROUP BY sede, dominant_intelligence
ORDER BY total_tests DESC;

-- Procedimiento almacenado para generar reporte diario
DELIMITER //
CREATE PROCEDURE GenerateDailyReport(IN report_date DATE)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_total_tests INT DEFAULT 0;
    DECLARE v_completed_tests INT DEFAULT 0;
    DECLARE v_avg_score DECIMAL(5,2) DEFAULT 0.00;
    DECLARE v_avg_time INT DEFAULT 0;
    DECLARE v_most_common VARCHAR(20) DEFAULT NULL;
    
    -- Obtener estadísticas del día
    SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN completed_questions >= 40 THEN 1 ELSE 0 END) as completed,
        AVG(overall_score) as avg_score,
        AVG(total_time) as avg_time
    INTO v_total_tests, v_completed_tests, v_avg_score, v_avg_time
    FROM cognitive_tests 
    WHERE DATE(submission_date) = report_date;
    
    -- Obtener inteligencia más común
    SELECT dominant_intelligence 
    INTO v_most_common
    FROM cognitive_tests 
    WHERE DATE(submission_date) = report_date
    GROUP BY dominant_intelligence 
    ORDER BY COUNT(*) DESC 
    LIMIT 1;
    
    -- Mostrar reporte
    SELECT 
        report_date as fecha_reporte,
        v_total_tests as tests_iniciados,
        v_completed_tests as tests_completados,
        ROUND(v_completed_tests * 100.0 / v_total_tests, 2) as tasa_completion,
        ROUND(v_avg_score, 2) as puntuacion_promedio,
        ROUND(v_avg_time / 60000, 2) as tiempo_promedio_minutos,
        v_most_common as inteligencia_mas_comun;
        
END//
DELIMITER ;

-- Función para calcular percentil de un usuario
DELIMITER //
CREATE FUNCTION GetUserPercentile(user_score DECIMAL(5,2)) 
RETURNS DECIMAL(5,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE total_count INT;
    DECLARE lower_count INT;
    DECLARE percentile DECIMAL(5,2);
    
    SELECT COUNT(*) INTO total_count FROM cognitive_tests WHERE completed_questions >= 40;
    SELECT COUNT(*) INTO lower_count FROM cognitive_tests WHERE overall_score < user_score AND completed_questions >= 40;
    
    IF total_count > 0 THEN
        SET percentile = (lower_count * 100.0) / total_count;
    ELSE
        SET percentile = 0.00;
    END IF;
    
    RETURN percentile;
END//
DELIMITER ;

-- Crear usuario para la aplicación (opcional - ajustar credenciales)
-- CREATE USER 'cognitive_app'@'localhost' IDENTIFIED BY 'secure_password_here';
-- GRANT SELECT, INSERT, UPDATE ON cognitive_test.* TO 'cognitive_app'@'localhost';
-- FLUSH PRIVILEGES;

-- Índices adicionales para optimización
CREATE INDEX idx_submission_month ON cognitive_tests (YEAR(submission_date), MONTH(submission_date));
CREATE INDEX idx_age_group ON cognitive_tests (FLOOR(edad/10)*10); -- Grupos de edad por década
CREATE INDEX idx_score_range ON cognitive_tests (FLOOR(overall_score/10)*10); -- Grupos de puntuación

-- Comentarios de documentación
ALTER TABLE cognitive_tests COMMENT = 'Tabla principal que almacena información básica de cada test realizado';
ALTER TABLE intelligence_scores COMMENT = 'Puntuaciones detalladas por tipo de inteligencia para cada test';
ALTER TABLE test_answers COMMENT = 'Respuestas individuales a cada pregunta (opcional para análisis detallado)';
ALTER TABLE daily_stats COMMENT = 'Estadísticas agregadas por día para reportes rápidos';
ALTER TABLE activity_logs COMMENT = 'Log de actividades importantes del sistema para auditoría';

-- Mostrar estructura creada
SHOW TABLES;
SELECT 'Base de datos creada exitosamente. Tablas disponibles:' as mensaje;
SELECT TABLE_NAME, TABLE_COMMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'cognitive_test';