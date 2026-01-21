<?php
/**
 * Prueba de Conexión a Base de Datos MariaDB
 * Script temporal para verificar la conexión
 */

// Configuración de la base de datos
$config = [
    'host' => 'localhost',
    'dbname' => 'u527555083_testenglish',
    'username' => 'u527555083_testmywa',
    'password' => '=P?f?Zd6',
    'charset' => 'utf8mb4'
];

echo "<h2>🔌 Prueba de Conexión a MariaDB</h2>";
echo "<hr>";

try {
    // Construir DSN
    $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}";
    
    echo "<p><strong>Configuración:</strong></p>";
    echo "<ul>";
    echo "<li>Host: {$config['host']}</li>";
    echo "<li>Base de datos: {$config['dbname']}</li>";
    echo "<li>Usuario: {$config['username']}</li>";
    echo "<li>Charset: {$config['charset']}</li>";
    echo "</ul>";
    
    // Intentar conexión
    echo "<p><strong>Intentando conectar...</strong></p>";
    
    $pdo = new PDO($dsn, $config['username'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
    
    echo "<p style='color: green;'>✅ <strong>CONEXIÓN EXITOSA!</strong></p>";
    
    // Verificar versión de la base de datos
    $stmt = $pdo->query('SELECT VERSION() as version');
    $version = $stmt->fetch();
    echo "<p>Versión de la base de datos: <strong>{$version['version']}</strong></p>";
    
    // Verificar si la tabla principal existe
    $stmt = $pdo->query("SHOW TABLES LIKE 'cognitive_tests'");
    $tableExists = $stmt->fetch();
    
    if ($tableExists) {
        echo "<p style='color: green;'>✅ Tabla 'cognitive_tests' existe</p>";
        
        // Contar registros
        $stmt = $pdo->query('SELECT COUNT(*) as total FROM cognitive_tests');
        $count = $stmt->fetch();
        echo "<p>Total de registros en cognitive_tests: <strong>{$count['total']}</strong></p>";
    } else {
        echo "<p style='color: orange;'>⚠️ Tabla 'cognitive_tests' no existe (ejecutar database.sql)</p>";
    }
    
} catch (PDOException $e) {
    echo "<p style='color: red;'>❌ <strong>ERROR DE CONEXIÓN:</strong></p>";
    echo "<p style='color: red;'>{$e->getMessage()}</p>";
    
    // Sugerencias de solución
    echo "<p><strong>Posibles soluciones:</strong></p>";
    echo "<ul>";
    echo "<li>Verificar que el servidor MariaDB esté funcionando</li>";
    echo "<li>Confirmar credenciales de acceso</li>";
    echo "<li>Verificar que la base de datos existe</li>";
    echo "<li>Revisar permisos de usuario</li>";
    echo "</ul>";
}

echo "<hr>";
echo "<p><em>Archivo temporal - eliminar después de verificar la conexión</em></p>";
?>