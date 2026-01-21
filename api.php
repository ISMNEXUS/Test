<?php
/**
 * API Moderna para Test de Análisis Cognitivo
 * Modernización completa del backend PHP
 * @version 2.0.0
 * @author Sistema de Rediseño 2026
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuración de errores
error_reporting(E_ALL);
ini_set('display_errors', 0); // No mostrar errores en producción
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/logs/error.log');

// Configuración de la aplicación
$config = [
    'database' => [
        'host' => 'localhost',
        'dbname' => 'cognitive_test',
        'username' => 'db_user',
        'password' => 'db_password',
        'charset' => 'utf8mb4'
    ],
    'email' => [
        'smtp_host' => 'smtp.gmail.com',
        'smtp_port' => 587,
        'smtp_user' => 'test@englishmyway.com',
        'smtp_pass' => 'app_password',
        'from_email' => 'test@englishmyway.com',
        'from_name' => 'Test Cognitivo - English My Way',
        'admin_email' => 'admin@englishmyway.com'
    ],
    'security' => [
        'max_attempts_per_ip' => 10,
        'rate_limit_window' => 3600, // 1 hora
        'csrf_token_lifetime' => 1800, // 30 minutos
        'allowed_origins' => ['https://englishmyway.online', 'https://test.englishmyway.online']
    ]
];

/**
 * Clase principal para manejar el API del test cognitivo
 */
class CognitiveTestAPI {
    private $config;
    private $db;
    private $response;

    public function __construct($config) {
        $this->config = $config;
        $this->response = [
            'success' => false,
            'message' => '',
            'data' => null,
            'timestamp' => date('c')
        ];
        
        // Crear directorio de logs si no existe
        $logDir = __DIR__ . '/logs';
        if (!is_dir($logDir)) {
            mkdir($logDir, 0755, true);
        }
    }

    /**
     * Punto de entrada principal
     */
    public function handleRequest() {
        try {
            // Validar método de request
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido', 405);
            }

            // Validar rate limiting
            $this->checkRateLimit();

            // Validar origen
            $this->validateOrigin();

            // Obtener y validar datos
            $inputData = $this->getInputData();
            $validatedData = $this->validateTestData($inputData);

            // Procesar los datos
            $result = $this->processTestSubmission($validatedData);

            // Enviar por email
            $this->sendResultsByEmail($validatedData, $result);

            // Guardar en base de datos (opcional)
            $this->saveToDatabase($validatedData, $result);

            $this->response['success'] = true;
            $this->response['message'] = 'Test procesado correctamente';
            $this->response['data'] = [
                'test_id' => $result['test_id'],
                'submission_time' => $result['submission_time']
            ];

        } catch (Exception $e) {
            $this->handleError($e);
        }

        $this->sendResponse();
    }

    /**
     * Validar rate limiting por IP
     */
    private function checkRateLimit() {
        $ip = $this->getClientIP();
        $attemptsFile = __DIR__ . '/logs/rate_limit_' . md5($ip) . '.json';
        
        $now = time();
        $windowStart = $now - $this->config['security']['rate_limit_window'];
        
        // Leer intentos existentes
        $attempts = [];
        if (file_exists($attemptsFile)) {
            $data = json_decode(file_get_contents($attemptsFile), true);
            if ($data && is_array($data)) {
                // Filtrar intentos dentro de la ventana de tiempo
                $attempts = array_filter($data, function($timestamp) use ($windowStart) {
                    return $timestamp > $windowStart;
                });
            }
        }

        // Verificar límite
        if (count($attempts) >= $this->config['security']['max_attempts_per_ip']) {
            throw new Exception('Demasiados intentos. Inténtalo más tarde.', 429);
        }

        // Registrar intento actual
        $attempts[] = $now;
        file_put_contents($attemptsFile, json_encode($attempts));
    }

    /**
     * Validar origen de la request
     */
    private function validateOrigin() {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $allowedOrigins = $this->config['security']['allowed_origins'];
        
        // En desarrollo, permitir localhost
        if (strpos($origin, 'localhost') !== false || strpos($origin, '127.0.0.1') !== false) {
            return;
        }

        if (!empty($allowedOrigins) && !in_array($origin, $allowedOrigins)) {
            throw new Exception('Origen no autorizado', 403);
        }
    }

    /**
     * Obtener datos de entrada
     */
    private function getInputData() {
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        
        if (strpos($contentType, 'application/json') !== false) {
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('JSON inválido: ' . json_last_error_msg(), 400);
            }
            
            return $data;
        } else {
            return $_POST;
        }
    }

    /**
     * Validar datos del test
     */
    private function validateTestData($data) {
        $errors = [];

        // Validar información del usuario
        if (empty($data['userInfo'])) {
            $errors[] = 'Información del usuario requerida';
        } else {
            $userInfo = $data['userInfo'];
            
            // Nombre
            if (empty($userInfo['nombre'])) {
                $errors[] = 'Nombre es requerido';
            } elseif (!preg_match('/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/', $userInfo['nombre'])) {
                $errors[] = 'Nombre inválido';
            }

            // Email
            if (empty($userInfo['email'])) {
                $errors[] = 'Email es requerido';
            } elseif (!filter_var($userInfo['email'], FILTER_VALIDATE_EMAIL)) {
                $errors[] = 'Email inválido';
            }

            // Edad (opcional pero si está presente debe ser válida)
            if (!empty($userInfo['edad'])) {
                $edad = intval($userInfo['edad']);
                if ($edad < 10 || $edad > 100) {
                    $errors[] = 'Edad debe estar entre 10 y 100 años';
                }
            }

            // Celular (opcional pero si está presente debe ser válido)
            if (!empty($userInfo['celular'])) {
                if (!preg_match('/^[\d\s\+\-\(\)]{10,15}$/', $userInfo['celular'])) {
                    $errors[] = 'Número de celular inválido';
                }
            }
        }

        // Validar respuestas
        if (empty($data['answers'])) {
            $errors[] = 'Respuestas requeridas';
        } elseif (!is_array($data['answers'])) {
            $errors[] = 'Formato de respuestas inválido';
        }

        // Validar resultados
        if (empty($data['results'])) {
            $errors[] = 'Resultados requeridos';
        }

        if (!empty($errors)) {
            throw new Exception('Datos inválidos: ' . implode(', ', $errors), 400);
        }

        // Sanitizar datos
        return $this->sanitizeData($data);
    }

    /**
     * Sanitizar datos de entrada
     */
    private function sanitizeData($data) {
        // Sanitizar información del usuario
        if (isset($data['userInfo'])) {
            $data['userInfo']['nombre'] = $this->sanitizeString($data['userInfo']['nombre']);
            $data['userInfo']['email'] = filter_var($data['userInfo']['email'], FILTER_SANITIZE_EMAIL);
            
            if (isset($data['userInfo']['profesion'])) {
                $data['userInfo']['profesion'] = $this->sanitizeString($data['userInfo']['profesion']);
            }
            
            if (isset($data['userInfo']['celular'])) {
                $data['userInfo']['celular'] = preg_replace('/[^\d\s\+\-\(\)]/', '', $data['userInfo']['celular']);
            }
            
            if (isset($data['userInfo']['sede'])) {
                $data['userInfo']['sede'] = $this->sanitizeString($data['userInfo']['sede']);
            }
            
            if (isset($data['userInfo']['edad'])) {
                $data['userInfo']['edad'] = intval($data['userInfo']['edad']);
            }
        }

        return $data;
    }

    /**
     * Sanitizar string
     */
    private function sanitizeString($string) {
        return htmlspecialchars(trim($string), ENT_QUOTES, 'UTF-8');
    }

    /**
     * Procesar envío del test
     */
    private function processTestSubmission($data) {
        $testId = $this->generateTestId();
        $submissionTime = date('Y-m-d H:i:s');
        
        // Generar estadísticas adicionales
        $statistics = $this->generateStatistics($data);
        
        return [
            'test_id' => $testId,
            'submission_time' => $submissionTime,
            'statistics' => $statistics
        ];
    }

    /**
     * Generar ID único para el test
     */
    private function generateTestId() {
        return 'CT_' . date('Ymd') . '_' . strtoupper(substr(uniqid(), -8));
    }

    /**
     * Generar estadísticas adicionales
     */
    private function generateStatistics($data) {
        $answers = $data['answers'] ?? [];
        $results = $data['results'] ?? [];
        
        $stats = [
            'total_questions_answered' => count($answers),
            'completion_rate' => 0,
            'average_response_time' => 0,
            'difficulty_analysis' => [],
            'category_performance' => []
        ];

        // Calcular tasa de completación
        if (isset($results['completedQuestions'])) {
            $stats['completion_rate'] = round(($results['completedQuestions'] / 40) * 100, 2);
        }

        // Calcular tiempo promedio de respuesta
        $totalTime = 0;
        $validAnswers = array_filter($answers);
        
        foreach ($validAnswers as $answer) {
            if (isset($answer['responseTime'])) {
                $totalTime += $answer['responseTime'];
            }
        }
        
        if (count($validAnswers) > 0) {
            $stats['average_response_time'] = round($totalTime / count($validAnswers));
        }

        return $stats;
    }

    /**
     * Enviar resultados por email
     */
    private function sendResultsByEmail($data, $result) {
        try {
            $userInfo = $data['userInfo'];
            $results = $data['results'];
            
            // Email al usuario
            $this->sendUserEmail($userInfo, $results, $result);
            
            // Email al administrador
            $this->sendAdminEmail($userInfo, $results, $result);
            
        } catch (Exception $e) {
            // Log error but don't fail the entire request
            error_log("Error enviando emails: " . $e->getMessage());
        }
    }

    /**
     * Enviar email al usuario
     */
    private function sendUserEmail($userInfo, $results, $result) {
        $subject = "Tus Resultados del Test de Análisis Cognitivo - English My Way";
        
        $intelligenceLabels = [
            'linguistic' => 'Inteligencia Lingüística',
            'logical' => 'Inteligencia Lógico-Matemática',
            'spatial' => 'Inteligencia Espacial', 
            'musical' => 'Inteligencia Musical',
            'bodily' => 'Inteligencia Corporal-Kinestésica',
            'interpersonal' => 'Inteligencia Interpersonal',
            'intrapersonal' => 'Inteligencia Intrapersonal',
            'naturalistic' => 'Inteligencia Naturalista'
        ];

        $htmlBody = $this->generateUserEmailTemplate($userInfo, $results, $result, $intelligenceLabels);
        $textBody = $this->generateUserEmailText($userInfo, $results, $result, $intelligenceLabels);

        $this->sendEmail(
            $userInfo['email'],
            $userInfo['nombre'],
            $subject,
            $htmlBody,
            $textBody
        );
    }

    /**
     * Enviar email al administrador
     */
    private function sendAdminEmail($userInfo, $results, $result) {
        $subject = "Nuevo Test Cognitivo Completado - " . $userInfo['nombre'];
        
        $body = "NUEVO TEST COGNITIVO COMPLETADO\n\n";
        $body .= "ID del Test: " . $result['test_id'] . "\n";
        $body .= "Fecha: " . $result['submission_time'] . "\n\n";
        
        $body .= "INFORMACIÓN DEL USUARIO:\n";
        $body .= "Nombre: " . $userInfo['nombre'] . "\n";
        $body .= "Email: " . $userInfo['email'] . "\n";
        $body .= "Edad: " . ($userInfo['edad'] ?? 'No especificada') . "\n";
        $body .= "Profesión: " . ($userInfo['profesion'] ?? 'No especificada') . "\n";
        $body .= "Celular: " . ($userInfo['celular'] ?? 'No especificado') . "\n";
        $body .= "Sede: " . ($userInfo['sede'] ?? 'No especificada') . "\n\n";
        
        $body .= "RESULTADOS:\n";
        $body .= "Puntuación Global: " . $results['overallScore'] . "%\n";
        $body .= "Inteligencia Dominante: " . $results['dominantIntelligence'] . "\n";
        $body .= "Tiempo Total: " . round($results['totalTime'] / 60000) . " minutos\n\n";
        
        if (isset($results['intelligenceScores'])) {
            $body .= "DESGLOSE POR INTELIGENCIAS:\n";
            foreach ($results['intelligenceScores'] as $type => $score) {
                $body .= ucfirst($type) . ": " . $score['percentage'] . "% (" . $score['correct'] . "/" . $score['total'] . ")\n";
            }
        }

        $this->sendEmail(
            $this->config['email']['admin_email'],
            'Administrador',
            $subject,
            nl2br($body),
            $body
        );
    }

    /**
     * Función genérica para enviar emails
     */
    private function sendEmail($to, $toName, $subject, $htmlBody, $textBody) {
        $headers = [
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . $this->config['email']['from_name'] . ' <' . $this->config['email']['from_email'] . '>',
            'Reply-To: ' . $this->config['email']['from_email'],
            'X-Mailer: PHP/' . phpversion()
        ];

        return mail($to, $subject, $htmlBody, implode("\r\n", $headers));
    }

    /**
     * Generar template HTML para email del usuario
     */
    private function generateUserEmailTemplate($userInfo, $results, $result, $intelligenceLabels) {
        $dominantLabel = $intelligenceLabels[$results['dominantIntelligence']] ?? $results['dominantIntelligence'];
        
        $html = '<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tus Resultados del Test Cognitivo</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 24px; }
        .score-card { background: #f8fafc; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .intelligence-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
        .intelligence-name { font-weight: bold; }
        .intelligence-score { color: #2563eb; font-weight: bold; }
        .footer { margin-top: 40px; padding: 20px; background: #f1f5f9; border-radius: 5px; font-size: 14px; color: #64748b; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧠 Tus Resultados del Test Cognitivo</h1>
        <p>English My Way</p>
    </div>
    
    <h2>¡Hola ' . htmlspecialchars($userInfo['nombre']) . '!</h2>
    
    <p>Gracias por completar nuestro Test de Análisis Cognitivo. Aquí están tus resultados personalizados:</p>
    
    <div class="score-card">
        <h3>📊 Resumen de Resultados</h3>
        <div class="intelligence-item">
            <span class="intelligence-name">Puntuación Global</span>
            <span class="intelligence-score">' . $results['overallScore'] . '%</span>
        </div>
        <div class="intelligence-item">
            <span class="intelligence-name">Inteligencia Dominante</span>
            <span class="intelligence-score">' . $dominantLabel . '</span>
        </div>
        <div class="intelligence-item">
            <span class="intelligence-name">Tiempo Total</span>
            <span class="intelligence-score">' . round($results['totalTime'] / 60000) . ' minutos</span>
        </div>
    </div>';

        if (isset($results['intelligenceScores'])) {
            $html .= '<div class="score-card">
                <h3>🎯 Desglose por Inteligencias</h3>';
            
            foreach ($results['intelligenceScores'] as $type => $score) {
                $label = $intelligenceLabels[$type] ?? ucfirst($type);
                $html .= '<div class="intelligence-item">
                    <span class="intelligence-name">' . $label . '</span>
                    <span class="intelligence-score">' . $score['percentage'] . '% (' . $score['correct'] . '/' . $score['total'] . ')</span>
                </div>';
            }
            
            $html .= '</div>';
        }

        $html .= '
    <div class="footer">
        <p><strong>ID del Test:</strong> ' . $result['test_id'] . '</p>
        <p><strong>Fecha:</strong> ' . date('d/m/Y H:i') . '</p>
        <p>Si tienes preguntas sobre tus resultados, no dudes en contactarnos.</p>
        <p>¡Gracias por confiar en English My Way!</p>
    </div>
</body>
</html>';

        return $html;
    }

    /**
     * Generar texto plano para email del usuario
     */
    private function generateUserEmailText($userInfo, $results, $result, $intelligenceLabels) {
        $text = "RESULTADOS DEL TEST DE ANÁLISIS COGNITIVO\n";
        $text .= "=========================================\n\n";
        $text .= "Hola " . $userInfo['nombre'] . ",\n\n";
        $text .= "Gracias por completar nuestro Test de Análisis Cognitivo.\n\n";
        $text .= "TUS RESULTADOS:\n";
        $text .= "---------------\n";
        $text .= "Puntuación Global: " . $results['overallScore'] . "%\n";
        $text .= "Inteligencia Dominante: " . ($intelligenceLabels[$results['dominantIntelligence']] ?? $results['dominantIntelligence']) . "\n";
        $text .= "Tiempo Total: " . round($results['totalTime'] / 60000) . " minutos\n\n";

        if (isset($results['intelligenceScores'])) {
            $text .= "DESGLOSE POR INTELIGENCIAS:\n";
            $text .= "---------------------------\n";
            foreach ($results['intelligenceScores'] as $type => $score) {
                $label = $intelligenceLabels[$type] ?? ucfirst($type);
                $text .= $label . ": " . $score['percentage'] . "% (" . $score['correct'] . "/" . $score['total'] . ")\n";
            }
        }

        $text .= "\n";
        $text .= "ID del Test: " . $result['test_id'] . "\n";
        $text .= "Fecha: " . date('d/m/Y H:i') . "\n\n";
        $text .= "¡Gracias por confiar en English My Way!\n";

        return $text;
    }

    /**
     * Guardar en base de datos (opcional)
     */
    private function saveToDatabase($data, $result) {
        try {
            // Esta función es opcional y solo se ejecuta si hay configuración de BD
            if (empty($this->config['database']['host'])) {
                return;
            }

            $this->initDatabase();
            
            // Insertar registro principal
            $stmt = $this->db->prepare("
                INSERT INTO cognitive_tests 
                (test_id, nombre, email, edad, profesion, celular, sede, overall_score, dominant_intelligence, total_time, completed_questions, submission_date, ip_address)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $result['test_id'],
                $data['userInfo']['nombre'],
                $data['userInfo']['email'],
                $data['userInfo']['edad'] ?? null,
                $data['userInfo']['profesion'] ?? null,
                $data['userInfo']['celular'] ?? null,
                $data['userInfo']['sede'] ?? null,
                $data['results']['overallScore'],
                $data['results']['dominantIntelligence'],
                $data['results']['totalTime'],
                $data['results']['completedQuestions'] ?? 0,
                $result['submission_time'],
                $this->getClientIP()
            ]);

            // Insertar puntuaciones por inteligencia
            if (isset($data['results']['intelligenceScores'])) {
                $stmt = $this->db->prepare("
                    INSERT INTO intelligence_scores 
                    (test_id, intelligence_type, correct_answers, total_questions, percentage, average_response_time)
                    VALUES (?, ?, ?, ?, ?, ?)
                ");

                foreach ($data['results']['intelligenceScores'] as $type => $score) {
                    $stmt->execute([
                        $result['test_id'],
                        $type,
                        $score['correct'],
                        $score['total'],
                        $score['percentage'],
                        $score['averageResponseTime'] ?? 0
                    ]);
                }
            }

        } catch (Exception $e) {
            // Log error but don't fail the entire request
            error_log("Error guardando en BD: " . $e->getMessage());
        }
    }

    /**
     * Inicializar conexión a base de datos
     */
    private function initDatabase() {
        if ($this->db) return;

        $dsn = "mysql:host={$this->config['database']['host']};dbname={$this->config['database']['dbname']};charset={$this->config['database']['charset']}";
        
        $this->db = new PDO($dsn, $this->config['database']['username'], $this->config['database']['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
    }

    /**
     * Obtener IP del cliente
     */
    private function getClientIP() {
        $ipKeys = ['HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'HTTP_CLIENT_IP', 'REMOTE_ADDR'];
        
        foreach ($ipKeys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                $ip = trim($_SERVER[$key]);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
        }

        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }

    /**
     * Manejar errores
     */
    private function handleError($exception) {
        $code = $exception->getCode() ?: 500;
        $message = $exception->getMessage();
        
        // Log del error
        error_log("API Error [{$code}]: {$message} | IP: " . $this->getClientIP());
        
        $this->response['success'] = false;
        $this->response['message'] = $message;
        
        http_response_code($code);
    }

    /**
     * Enviar respuesta
     */
    private function sendResponse() {
        echo json_encode($this->response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    }
}

// Inicializar y ejecutar API
$api = new CognitiveTestAPI($config);
$api->handleRequest();
?>