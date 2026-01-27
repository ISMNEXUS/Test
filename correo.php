<?php
/**
 * Sistema de Correo para Resultados del Test
 * Envía los resultados del test a la dirección del usuario
 * Y con copia a los administradores
 * @version 4.0.0
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
$headers .= "From: English My Way Test <test@englishmyway.online>\r\n";
$headers .= "Reply-To: lucia@englishmyway.online\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Enviar correo al usuario
$emailSent = mail($email, $subject, $message, $headers);

// Registrar envío
if ($emailSent) {
    // Preparar headers para copias a administradores
    $adminHeaders = "MIME-Version: 1.0\r\n";
    $adminHeaders .= "Content-type: text/html; charset=UTF-8\r\n";
    $adminHeaders .= "From: English My Way Test <test@englishmyway.online>\r\n";
    $adminHeaders .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    // CORREOS DE ADMINISTRADORES - Enviar copia a ambos
    $adminEmails = [
        "lucia@englishmyway.online",
        "emwcollegeonline@gmail.com"
    ];
    
    $adminSubject = "📊 Nuevo Test Completado - " . $nombre;
    $adminMessage = prepareAdminEmail($nombre, $email, $edad, $profesion, $resultados, $fecha);
    
    // Enviar a cada administrador
    foreach ($adminEmails as $adminEmail) {
        @mail($adminEmail, $adminSubject, $adminMessage, $adminHeaders);
    }
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email enviado correctamente al usuario y administradores',
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
    $dominant = $resultados['dominant'] ?? [];
    
    $intelligenceHtml = '';
    $intelligenceNames = [
        'linguistic' => 'Inteligencia Lingüística-Verbal',
        'logical' => 'Inteligencia Lógico-Matemática',
        'spatial' => 'Inteligencia Espacial-Visual',
        'bodily' => 'Inteligencia Corporal-Cinestésica',
        'musical' => 'Inteligencia Musical-Rítmica',
        'interpersonal' => 'Inteligencia Interpersonal-Social',
        'intrapersonal' => 'Inteligencia Intrapersonal-Reflexiva'
    ];
    
    // Ordenar inteligencias por porcentaje
    uasort($intelligences, function($a, $b) {
        return ($b['percentage'] ?? 0) - ($a['percentage'] ?? 0);
    });
    
    $position = 1;
    foreach ($intelligences as $type => $data) {
        $name = $intelligenceNames[$type] ?? $type;
        $percentage = $data['percentage'] ?? 0;
        $average = $data['average'] ?? 0;
        $count = $data['count'] ?? 0;
        
        if ($count > 0) {
            $medal = $position <= 3 ? ['🥇', '🥈', '🥉'][$position - 1] : '';
            $intelligenceHtml .= "
                <tr>
                    <td style='padding: 12px; border-bottom: 1px solid #e5e7eb;'>
                        {$medal} <strong>{$name}</strong>
                    </td>
                    <td style='padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;'>
                        {$average}/5
                    </td>
                    <td style='padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;'>
                        <strong>" . round($percentage, 1) . "%</strong>
                    </td>
                </tr>
            ";
            $position++;
        }
    }
    
    // ESTILOS DE APRENDIZAJE English My Way
    $learningHtml = '';
    $learningNames = [
        'readwrite' => ['name' => 'Read and Write', 'icon' => '📖', 'desc' => 'Aprende mejor leyendo y escribiendo, tomando notas y analizando textos'],
        'showtime' => ['name' => 'Showtime', 'icon' => '🎬', 'desc' => 'Aprende mejor con videos, demostraciones visuales y actividades prácticas'],
        'wordmadness' => ['name' => 'Wordmadness', 'icon' => '💬', 'desc' => 'Aprende mejor conversando, debatiendo y expresándose verbalmente'],
        'jukebox' => ['name' => 'Jukebox', 'icon' => '🎧', 'desc' => 'Aprende mejor escuchando podcasts, música y contenido auditivo']
    ];
    
    // Ordenar estilos por porcentaje
    uasort($learningStyles, function($a, $b) {
        return ($b['percentage'] ?? 0) - ($a['percentage'] ?? 0);
    });
    
    $learningPosition = 1;
    foreach ($learningStyles as $style => $data) {
        $info = $learningNames[$style] ?? ['name' => $style, 'icon' => '📊', 'desc' => ''];
        $percentage = $data['percentage'] ?? 0;
        $total = $data['total'] ?? 0;
        $count = $data['count'] ?? 0;
        
        if ($count > 0) {
            $medal = $learningPosition <= 2 ? ['🥇', '🥈'][$learningPosition - 1] : '';
            $learningHtml .= "
                <tr>
                    <td style='padding: 12px; border-bottom: 1px solid #e5e7eb;'>
                        {$medal} {$info['icon']} <strong>{$info['name']}</strong>
                        <br><small style='color: #6b7280;'>{$info['desc']}</small>
                    </td>
                    <td style='padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;'>
                        {$total}/{$count} respuestas
                    </td>
                    <td style='padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;'>
                        <strong>" . round($percentage, 1) . "%</strong>
                    </td>
                </tr>
            ";
            $learningPosition++;
        }
    }
    
    // Información del perfil dominante
    $dominantIntel = $dominant['intelligence'] ?? 'No determinado';
    $dominantLearn = $dominant['learning'] ?? 'No determinado';
    $dominantIntelName = $intelligenceNames[$dominantIntel] ?? $dominantIntel;
    $dominantLearnName = isset($learningNames[$dominantLearn]) ? $learningNames[$dominantLearn]['name'] : $dominantLearn;
    
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
                    <h2>🎓 Estilos de Aprendizaje (English My Way)</h2>
                    <table>
                        <tr>
                            <th>Estilo</th>
                            <th>Respuestas</th>
                            <th>Porcentaje</th>
                        </tr>
                        {$learningHtml}
                    </table>
                </div>
                
                <div class='section' style='background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 20px; border-radius: 8px; margin-top: 20px;'>
                    <h2 style='color: #0369a1; border-color: #0369a1;'>💫 Tu Perfil Dominante</h2>
                    <p style='font-size: 16px;'>
                        <strong>🧠 Inteligencia Dominante:</strong> {$dominantIntelName}<br>
                        <strong>📚 Estilo de Aprendizaje:</strong> {$dominantLearnName}
                    </p>
                    <p style='font-size: 14px; color: #4b5563;'>
                        Tu combinación única de inteligencia y estilo de aprendizaje te permite procesar información de manera efectiva según tu propio estilo.
                    </p>
                </div>
                
                <div style='text-align: center;'>
                    <a href='https://englishmyway.online' class='btn'>Visitar English My Way</a>
                </div>
            </div>
            
            <footer>
                <p>Este es un correo automático de English My Way.</p>
                <p>Para más información, contacta a: lucia@englishmyway.online</p>
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
    $learningStyles = $resultados['learningStyles'] ?? [];
    $dominant = $resultados['dominant'] ?? [];
    
    $intelligenceNames = [
        'linguistic' => 'Lingüística-Verbal',
        'logical' => 'Lógico-Matemática',
        'spatial' => 'Espacial-Visual',
        'bodily' => 'Corporal-Cinestésica',
        'musical' => 'Musical-Rítmica',
        'interpersonal' => 'Interpersonal-Social',
        'intrapersonal' => 'Intrapersonal-Reflexiva'
    ];
    
    $learningNames = [
        'readwrite' => 'Read and Write',
        'showtime' => 'Showtime',
        'wordmadness' => 'Wordmadness',
        'jukebox' => 'Jukebox'
    ];
    
    $dominantIntel = $dominant['intelligence'] ?? 'No determinado';
    $dominantLearn = $dominant['learning'] ?? 'No determinado';
    $dominantIntelName = $intelligenceNames[$dominantIntel] ?? $dominantIntel;
    $dominantLearnName = $learningNames[$dominantLearn] ?? $dominantLearn;
    
    // Crear resumen de inteligencias
    $intelSummary = '';
    foreach ($intelligences as $type => $data) {
        $name = $intelligenceNames[$type] ?? $type;
        $percentage = $data['percentage'] ?? 0;
        if ($data['count'] ?? 0 > 0) {
            $intelSummary .= "<li>{$name}: " . round($percentage, 1) . "%</li>";
        }
    }
    
    // Crear resumen de estilos
    $learnSummary = '';
    foreach ($learningStyles as $style => $data) {
        $name = $learningNames[$style] ?? $style;
        $percentage = $data['percentage'] ?? 0;
        if ($data['count'] ?? 0 > 0) {
            $learnSummary .= "<li>{$name}: " . round($percentage, 1) . "%</li>";
        }
    }
    
    $duration = $resultados['duration'] ?? 0;
    $totalAnswers = $resultados['totalAnswers'] ?? 0;
    
    $html = "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <title>Nuevo Test Completado</title>
    </head>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
            <h2 style='color: #667eea;'>📊 Nuevo Test de Inteligencias Completado</h2>
            
            <div style='background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;'>
                <h3 style='margin-top: 0;'>👤 Datos del Participante</h3>
                <p><strong>Nombre:</strong> {$nombre}</p>
                <p><strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a></p>
                <p><strong>Edad:</strong> {$edad}</p>
                <p><strong>Profesión:</strong> {$profesion}</p>
                <p><strong>Fecha:</strong> {$fecha}</p>
                <p><strong>Tiempo:</strong> " . floor($duration / 60) . "m " . ($duration % 60) . "s</p>
                <p><strong>Respuestas:</strong> {$totalAnswers}</p>
            </div>
            
            <div style='background: #e0f2fe; padding: 20px; border-radius: 8px; margin-bottom: 20px;'>
                <h3 style='margin-top: 0; color: #0369a1;'>⭐ Perfil Dominante</h3>
                <p><strong>Inteligencia:</strong> {$dominantIntelName}</p>
                <p><strong>Estilo de Aprendizaje:</strong> {$dominantLearnName}</p>
            </div>
            
            <div style='margin-bottom: 20px;'>
                <h3>🧠 Inteligencias Múltiples</h3>
                <ul>{$intelSummary}</ul>
            </div>
            
            <div style='margin-bottom: 20px;'>
                <h3>📚 Estilos de Aprendizaje</h3>
                <ul>{$learnSummary}</ul>
            </div>
            
            <hr style='border: 1px solid #e5e7eb;'>
            <p style='font-size: 12px; color: #6b7280;'>
                Este correo fue enviado automáticamente desde el sistema de Test de English My Way.
            </p>
        </div>
    </body>
    </html>
    ";
    
    return $html;
}
?>