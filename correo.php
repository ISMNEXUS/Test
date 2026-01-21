<?php
/**
 * Sistema de Correo para Resultados del Test
 * Envía los resultados del test a la dirección del usuario
 * @version 3.0.0
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit();
}

// Leer datos JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validar datos
if (!isset($data['email']) || !isset($data['nombre']) || !isset($data['resultados'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit();
}

$nombre = sanitize($data['nombre']);
$email = sanitize($data['email']);
$edad = sanitize($data['edad'] ?? 'No especificada');
$profesion = sanitize($data['profesion'] ?? 'No especificada');
$resultados = json_decode($data['resultados'], true);
$fecha = $data['fecha'] ?? date('d/m/Y H:i:s');

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email inválido']);
    exit();
}

// Preparar contenido del correo
$subject = "Resultados de tu Test de Inteligencias Múltiples - English My Way";

$message = prepareEmailContent($nombre, $edad, $profesion, $resultados, $fecha);

// Headers del correo
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Test Cognitivo <test@englishmyway.com>\r\n";
$headers .= "Reply-To: test@englishmyway.com\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Enviar correo al usuario
$emailSent = mail($email, $subject, $message, $headers);

// Registrar envío
if ($emailSent) {
    // Enviar copia a administrador
    $adminHeaders = "MIME-Version: 1.0\r\n";
    $adminHeaders .= "Content-type: text/html; charset=UTF-8\r\n";
    $adminHeaders .= "From: Test Cognitivo <test@englishmyway.com>\r\n";
    $adminHeaders .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    $adminEmail = "centerbta@englishmyway.com";
    $adminSubject = "Nuevo Test Completado - " . $nombre;
    $adminMessage = prepareAdminEmail($nombre, $email, $edad, $profesion, $resultados, $fecha);
    
    @mail($adminEmail, $adminSubject, $adminMessage, $adminHeaders);
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email enviado correctamente',
        'timestamp' => date('c')
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al enviar el email'
    ]);
}

// =====================================================
// FUNCIONES AUXILIARES
// =====================================================

function sanitize($string) {
    return htmlspecialchars(strip_tags(trim($string)), ENT_QUOTES, 'UTF-8');
}

function prepareEmailContent($nombre, $edad, $profesion, $resultados, $fecha) {
    $intelligences = $resultados['intelligences'] ?? [];
    $learningStyles = $resultados['learningStyles'] ?? [];
    
    $intelligenceHtml = '';
    $intelligenceNames = [
        'linguistic' => 'Inteligencia Lingüística',
        'logical' => 'Inteligencia Lógica y Matemática',
        'spatial' => 'Inteligencia Espacial',
        'bodily' => 'Inteligencia Física y Cinestésica',
        'musical' => 'Inteligencia Musical',
        'interpersonal' => 'Inteligencia Interpersonal',
        'intrapersonal' => 'Inteligencia Intrapersonal'
    ];
    
    foreach ($intelligences as $type => $score) {
        $name = $intelligenceNames[$type] ?? $type;
        $percentage = ($score / 25) * 100;
        $intelligenceHtml .= "
            <tr>
                <td style='padding: 12px; border-bottom: 1px solid #e5e7eb;'>
                    <strong>{$name}</strong>
                </td>
                <td style='padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;'>
                    {$score}/25
                </td>
                <td style='padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;'>
                    " . round($percentage, 1) . "%
                </td>
            </tr>
        ";
    }
    
    $learningHtml = '';
    $learningNames = [
        'active' => 'Estilo Activo',
        'reflective' => 'Estilo Reflexivo',
        'theoretic' => 'Estilo Teórico',
        'pragmatic' => 'Estilo Pragmático'
    ];
    
    foreach ($learningStyles as $style => $count) {
        $name = $learningNames[$style] ?? $style;
        $learningHtml .= "
            <tr>
                <td style='padding: 12px; border-bottom: 1px solid #e5e7eb;'>
                    <strong>{$name}</strong>
                </td>
                <td style='padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;'>
                    {$count} respuestas
                </td>
            </tr>
        ";
    }
    
    $html = "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Resultados del Test</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #f9fafb;
                border-radius: 8px;
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 30px 20px;
                background: white;
            }
            .info-box {
                background: #f3f4f6;
                padding: 16px;
                border-radius: 6px;
                margin-bottom: 20px;
            }
            .info-box p {
                margin: 8px 0;
            }
            .section {
                margin-bottom: 30px;
            }
            .section h2 {
                color: #667eea;
                font-size: 18px;
                margin-bottom: 16px;
                border-bottom: 2px solid #667eea;
                padding-bottom: 8px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th {
                background: #667eea;
                color: white;
                padding: 12px;
                text-align: left;
            }
            footer {
                background: #f3f4f6;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #6b7280;
            }
            .btn {
                display: inline-block;
                background: #667eea;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                margin-top: 20px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🧠 Resultados de tu Test</h1>
                <p>English My Way</p>
            </div>
            
            <div class='content'>
                <div class='info-box'>
                    <p><strong>Nombre:</strong> {$nombre}</p>
                    <p><strong>Edad:</strong> {$edad}</p>
                    <p><strong>Profesión:</strong> {$profesion}</p>
                    <p><strong>Fecha:</strong> {$fecha}</p>
                </div>
                
                <div class='section'>
                    <h2>📊 Inteligencias Múltiples</h2>
                    <table>
                        <tr>
                            <th>Tipo de Inteligencia</th>
                            <th>Puntuación</th>
                            <th>Porcentaje</th>
                        </tr>
                        {$intelligenceHtml}
                    </table>
                </div>
                
                <div class='section'>
                    <h2>🎓 Estilos de Aprendizaje</h2>
                    <table>
                        <tr>
                            <th>Estilo</th>
                            <th>Respuestas</th>
                        </tr>
                        {$learningHtml}
                    </table>
                </div>
                
                <div style='text-align: center;'>
                    <a href='https://englishmyway.online' class='btn'>Volver a Inicio</a>
                </div>
            </div>
            
            <footer>
                <p>Este es un correo automático de English My Way. No responda a este correo.</p>
                <p>&copy; 2026 English My Way. Todos los derechos reservados.</p>
            </footer>
        </div>
    </body>
    </html>
    ";
    
    return $html;
}

function prepareAdminEmail($nombre, $email, $edad, $profesion, $resultados, $fecha) {
    $intelligences = $resultados['intelligences'] ?? [];
    
    $dominantIntelligence = array_key_first($intelligences);
    $dominantScore = max($intelligences);
    
    $html = "
    <h2>Nuevo Test Completado</h2>
    <p><strong>Nombre:</strong> {$nombre}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Edad:</strong> {$edad}</p>
    <p><strong>Profesión:</strong> {$profesion}</p>
    <p><strong>Fecha:</strong> {$fecha}</p>
    <p><strong>Inteligencia Dominante:</strong> {$dominantIntelligence} ({$dominantScore}/25)</p>
    ";
    
    return $html;
}
?>