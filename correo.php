
<?php
/**
 * Sistema de Correo Modernizado para Test Cognitivo
 * Versión mejorada con mejor seguridad y funcionalidad
 * @version 2.0.0
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuración
$config = [
    'admin_emails' => [
        'centerbta@englishmyway.com',
        'sistemas@englishmyway.com',
        'oscarlopez@englishmyway.com'
    ],
    'from_email' => 'test@englishmyway.com',
    'from_name' => 'Test Cognitivo - English My Way',
    'max_file_size' => 1048576, // 1MB
    'rate_limit' => 10, // máximo 10 envíos por hora por IP
    'required_fields' => ['nombre', 'email']
];

/**
 * Clase para manejar el envío de correos
 */
class EmailHandler {
    private $config;
    private $response;
    private $errors = [];

    public function __construct($config) {
        $this->config = $config;
        $this->response = [
            'success' => false,
            'message' => '',
            'timestamp' => date('c')
        ];
    }

    /**
     * Procesar la solicitud
     */
    public function process() {
        try {
            // Validar método
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido', 405);
            }

            // Verificar rate limiting
            $this->checkRateLimit();

            // Obtener y validar datos
            $data = $this->getData();
            $this->validateData($data);

            if (!empty($this->errors)) {
                throw new Exception('Datos inválidos: ' . implode(', ', $this->errors), 400);
            }

            // Enviar correos
            $this->sendEmails($data);

            $this->response['success'] = true;
            $this->response['message'] = 'Datos enviados correctamente. Recibirás una confirmación por email.';

        } catch (Exception $e) {
            $this->handleError($e);
        }

        $this->sendResponse();
    }

    /**
     * Obtener datos del POST
     */
    private function getData() {
        $data = [];
        
        // Campos básicos
        $fields = [
            'nombre', 'email', 'edad', 'profesion', 'celular', 'sede',
            'linguistic_score', 'logical_score', 'spatial_score', 'musical_score',
            'bodily_score', 'interpersonal_score', 'intrapersonal_score', 'naturalistic_score',
            'dominant_intelligence', 'overall_score', 'total_time'
        ];

        foreach ($fields as $field) {
            $data[$field] = $_POST[$field] ?? '';
        }

        // Limpiar y sanitizar
        $data['nombre'] = $this->sanitizeString($data['nombre']);
        $data['email'] = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        $data['profesion'] = $this->sanitizeString($data['profesion']);
        $data['sede'] = $this->sanitizeString($data['sede']);
        
        // Validar números
        $numericFields = ['edad', 'overall_score', 'total_time'];
        foreach ($numericFields as $field) {
            if (!empty($data[$field])) {
                $data[$field] = intval($data[$field]);
            }
        }

        // Validar porcentajes
        $scoreFields = ['linguistic_score', 'logical_score', 'spatial_score', 'musical_score',
                       'bodily_score', 'interpersonal_score', 'intrapersonal_score', 'naturalistic_score'];
        foreach ($scoreFields as $field) {
            if (!empty($data[$field])) {
                $data[$field] = min(100, max(0, intval($data[$field])));
            }
        }

        return $data;
    }

    /**
     * Validar datos
     */
    private function validateData($data) {
        // Campos requeridos
        foreach ($this->config['required_fields'] as $field) {
            if (empty($data[$field])) {
                $this->errors[] = "El campo {$field} es requerido";
            }
        }

        // Validar nombre
        if (!empty($data['nombre'])) {
            if (strlen($data['nombre']) < 2) {
                $this->errors[] = 'El nombre debe tener al menos 2 caracteres';
            }
            if (!preg_match('/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/', $data['nombre'])) {
                $this->errors[] = 'El nombre contiene caracteres inválidos';
            }
        }

        // Validar email
        if (!empty($data['email'])) {
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                $this->errors[] = 'Email inválido';
            }
        }

        // Validar edad si está presente
        if (!empty($data['edad']) && ($data['edad'] < 10 || $data['edad'] > 100)) {
            $this->errors[] = 'La edad debe estar entre 10 y 100 años';
        }

        // Validar celular si está presente
        if (!empty($data['celular'])) {
            if (!preg_match('/^[\d\s\+\-\(\)]{10,15}$/', $data['celular'])) {
                $this->errors[] = 'Número de celular inválido';
            }
        }
    }

    /**
     * Sanitizar string
     */
    private function sanitizeString($string) {
        return htmlspecialchars(trim($string), ENT_QUOTES, 'UTF-8');
    }

    /**
     * Verificar rate limiting
     */
    private function checkRateLimit() {
        $ip = $this->getClientIP();
        $rateFile = __DIR__ . '/logs/email_rate_' . md5($ip) . '.txt';
        
        $now = time();
        $hourAgo = $now - 3600;
        
        // Crear directorio de logs si no existe
        $logDir = dirname($rateFile);
        if (!is_dir($logDir)) {
            mkdir($logDir, 0755, true);
        }

        // Leer intentos existentes
        $attempts = [];
        if (file_exists($rateFile)) {
            $lines = file($rateFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $timestamp = intval($line);
                if ($timestamp > $hourAgo) {
                    $attempts[] = $timestamp;
                }
            }
        }

        // Verificar límite
        if (count($attempts) >= $this->config['rate_limit']) {
            throw new Exception('Demasiados intentos de envío. Inténtalo más tarde.', 429);
        }

        // Registrar intento actual
        $attempts[] = $now;
        file_put_contents($rateFile, implode("\n", $attempts));
    }

    /**
     * Enviar correos
     */
    private function sendEmails($data) {
        // Email al usuario
        $this->sendUserEmail($data);
        
        // Email a administradores
        $this->sendAdminEmail($data);
        
        // Log de la actividad
        $this->logActivity($data);
    }

    /**
     * Enviar email al usuario
     */
    private function sendUserEmail($data) {
        $subject = "Confirmación - Test de Análisis Cognitivo Recibido";
        
        $html = $this->generateUserEmailHTML($data);
        $text = $this->generateUserEmailText($data);

        $headers = $this->getEmailHeaders();

        $sent = mail($data['email'], $subject, $html, $headers);
        
        if (!$sent) {
            error_log("Error enviando email de confirmación a: " . $data['email']);
        }
    }

    /**
     * Enviar email a administradores
     */
    private function sendAdminEmail($data) {
        $subject = "Nuevo Test Cognitivo - " . $data['nombre'];
        
        $body = $this->generateAdminEmailContent($data);
        $headers = $this->getEmailHeaders();

        foreach ($this->config['admin_emails'] as $adminEmail) {
            $sent = mail($adminEmail, $subject, $body, $headers);
            if (!$sent) {
                error_log("Error enviando email admin a: " . $adminEmail);
            }
        }
    }
$imusicala=$_REQUEST["imusicala"];

$imusicalr=$_REQUEST["imusicalr"];

$imusicalt=$_REQUEST["imusicalt"];

$imusicalp=$_REQUEST["imusicalp"];

$iintera=$_REQUEST["iintera"];







$totalauditiva=$_REQUEST["totalauditiva"];



         function form1_mail($sPara, $sAsunto, $sTexto, $sDe){ 



         if ($sDe)$sDe = "From:".$sDe; 



         foreach ($_POST as $nombre => $valor) 

              $sTexto = $sTexto."\n".$nombre." = ".$valor; 



         return(mail($sPara, $sAsunto, $sTexto, $sDe)); 

     } 



 

     if (form1_mail("jofaco1916@hotmail.com",

				 "Test Perfil de Aprendizaje", 

                 "El resultado del Test del Perfil de Aprendizaje es: ", 

                 "Test-de-Personalidad-de-:- $nombre" 

                 ) 

         ) 

		 

   // $gracias_defecto="http://www.englishmyway.com/nacional/Gracias por su inter�s.htm";    

// header( "Location: $gracias_defecto" );



?> 

<html>

<BODY bgColor=#FFFFFF background="fondo.JPG" text=#000000>

<TABLE cellSpacing=0 cellPadding=2 width="100%" border=0>

  <TBODY>

  <TR>

    <TD colspan="3">

      <HR>

      <p>&nbsp;      </p></TD></TR>

  <TR>

    <TD colspan="3" align=middle bgcolor="#FFFF00"><div align="center"><FONT face="Arial, Helvetica, sans-serif" color=#0000cc 

      size=6><B>SU TEST  HA SIDO ENVIADO CON EXITO</B></FONT></div></TD>

  </TR>

  <TR>

    <TD width="23%" align=middle><div align="center"><FONT face="Arial, Helvetica, sans-serif" size=3>      <BR>

      <BR>

    </FONT></div>      <font face="Arial, Helvetica, sans-serif" size=3>&nbsp;</font></TD>

    <TD width="55%" align=middle><div align="center">

      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>

      <p><font face="Arial, Helvetica, sans-serif" size=3>El Resultado de este Test ser&aacute; anexado a su visa. <font size=2><br>

        <br>

        Este Test fue dise&ntilde;ado con el fin de ayudarle a desarrollar</font></font> <font size="2" face="Arial, Helvetica, sans-serif">la metodolog&iacute;a</font></p>

      <p><font size="2" face="Arial, Helvetica, sans-serif"> English My Way de acuerdo a su ritmo y estilo de Aprendizaje. </font><font face="Arial, Helvetica, sans-serif" size=3><br>

        <br>

        <font color=#006600 size=5>��� Welcome to the World of English My Way!!!</font></font></p>

    </div></TD>

    <TD width="22%" align=middle><div align="center">

      <p>&nbsp;</p>

      </div></TD>

  </TR>

  <TR>

    <TD colspan="3" align=middle><div align="center"><strong><A href="http://www.englishmyway.com" target="_parent">Intro</A></strong></div></TD></TR>

  <TR>

    <TD colspan="3">

      <HR>

    </TD></TR></TBODY></TABLE>

<p>&nbsp;</p>

</BODY></HTML>

