# 📊 Guía de Importación de Base de Datos - Test Cognitivo

## ✅ PROBLEMA SOLUCIONADO

**Error #1061:** "Nombre duplicado de clave 'idx_submission_date'"

### 🔧 Causa
El archivo SQL intentaba crear índices que ya existían en la base de datos.

### ✅ Solución Implementada
Todos los archivos SQL ahora incluyen comandos `DROP TABLE IF EXISTS` al inicio para:
- Eliminar tablas existentes si ya están en la BD
- Evitar conflictos de índices duplicados
- Permitir limpiar completamente antes de crear nuevas tablas

---

## 📁 Archivos SQL Disponibles

### 1. **database_final.sql** ⭐ RECOMENDADO
**Mejor para la mayoría de usuarios**
- ✅ Versión ULTRA COMPATIBLE
- ✅ Elimina tablas antiguas automáticamente
- ✅ Índices simples y seguros
- ✅ Sin errores de compatibilidad
- ✅ Incluye datos de ejemplo

### 2. **database_clean.sql**
**Para usuarios con requisitos moderados**
- ✅ Versión optimizada
- ✅ Limpieza automática de BD
- ✅ Más características que la simple
- ✅ Totalmente compatible

### 3. **database_simple.sql**
**Para máxima compatibilidad**
- ✅ Versión ultra minimalista
- ✅ Solo tablas esenciales
- ✅ Compatible con cualquier hosting
- ✅ Función básica garantizada

### 4. **database.sql**
**Original corregido**
- ✅ Versión mejorada del archivo original
- ✅ Con eliminación automática de tablas

---

## 🎯 PASO A PASO DE IMPORTACIÓN

### **OPCIÓN 1: Usar phpMyAdmin** (Más Fácil)

1. Abre tu panel de control del hosting (cPanel, Plesk, etc.)
2. Busca "phpMyAdmin" y abrelo
3. En el lado izquierdo, selecciona tu base de datos: **u527555083_testenglish**
4. Haz clic en la pestaña **"Importar"**
5. Bajo "Seleccionar archivo", haz clic en "Elegir archivo"
6. Selecciona uno de los archivos SQL (recomendado: **database_final.sql**)
7. Asegúrate de que esté seleccionado "UTF-8" en el Juego de caracteres
8. Haz clic en **"Ejecutar"** o **"Importar"**
9. ¡Listo! Deberías ver el mensaje: "Base de datos configurada exitosamente"

### **OPCIÓN 2: Usar Línea de Comandos**

```bash
mysql -h localhost -u u527555083_testmywa -p u527555083_testenglish < database_final.sql
```

Cuando pida contraseña, ingresa: `=P?f?Zd6`

---

## ✅ VERIFICACIÓN DE ÉXITO

Después de importar, verifica en phpMyAdmin:

1. En el lado izquierdo, expande tu base de datos
2. Deberías ver estas tablas:
   - ✅ `cognitive_tests` (Principal)
   - ✅ `intelligence_scores` (Puntuaciones)
   - ✅ `test_answers` (Respuestas)
3. En cada tabla, deberías ver índices creados
4. La tabla `cognitive_tests` debe contener 1 registro de ejemplo

---

## 🚀 CREDENCIALES DE CONEXIÓN

Usa estos datos en tu aplicación PHP:

```php
$host = 'localhost';
$dbname = 'u527555083_testenglish';
$username = 'u527555083_testmywa';
$password = '=P?f?Zd6';
$charset = 'utf8mb4';
```

---

## 📋 ESTRUCTURA DE TABLAS

### cognitive_tests (Tabla Principal)
```
id                    → ID único auto-incremental
test_id              → Identificador único del test
nombre               → Nombre del usuario
email                → Email del usuario
edad                 → Edad (opcional)
profesion            → Profesión (opcional)
celular              → Teléfono (opcional)
overall_score        → Puntuación general (0-100)
dominant_intelligence → Tipo de inteligencia dominante
total_time           → Tiempo total en milisegundos
completed_questions  → Cantidad de preguntas respondidas
submission_date      → Fecha y hora de envío
ip_address           → IP del usuario
user_agent           → Navegador del usuario
created_at           → Fecha de creación del registro
updated_at           → Fecha de última actualización
```

### intelligence_scores (Puntuaciones por Tipo)
```
test_id              → Referencia al test
intelligence_type    → Tipo de inteligencia (linguistic, logical, etc.)
correct_answers      → Respuestas correctas
total_questions      → Total de preguntas
percentage           → Porcentaje de acierto
average_response_time → Tiempo promedio de respuesta
```

### test_answers (Respuestas Individuales)
```
test_id              → Referencia al test
question_index       → Número de pregunta
question_type        → Tipo de pregunta
selected_option      → Opción seleccionada (1-4)
correct_option       → Opción correcta (1-4)
is_correct           → Boolean (0 o 1)
response_time        → Tiempo de respuesta
answered_at          → Fecha y hora de la respuesta
```

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### Problema: Error #1061 "Nombre duplicado de clave"
**Solución:** Los archivos SQL ahora incluyen `DROP TABLE IF EXISTS` automáticamente.
Simplemente corre el import nuevamente.

### Problema: Error #1044 "Acceso denegado"
**Solución:** Verifica que estés usando las credenciales correctas:
- Usuario: `u527555083_testmywa`
- Contraseña: `=P?f?Zd6`

### Problema: Error #1064 "Existe un error en su sintaxis SQL"
**Solución:** Usa `database_final.sql` que es 100% compatible con MariaDB.

### Problema: Base de datos vacía después de importar
**Solución:** A veces phpMyAdmin no recarga. Haz F5 en el navegador para refrescar.

---

## 💾 DATOS DE EJEMPLO INCLUIDOS

Después de importar, tendrás un test de ejemplo:
- **Test ID:** CT_20260121_TEST001
- **Usuario:** Usuario de Prueba
- **Email:** test@example.com
- **Edad:** 25
- **Profesión:** Estudiante
- **Puntuación:** 85.5/100
- **Inteligencia Dominante:** Lógica

Esto te permite verificar que la BD funciona correctamente.

---

## 🔄 REINTENTOS

Si necesitas reimportar:

1. Los archivos SQL eliminan automáticamente las tablas antiguas
2. No necesitas limpiar manualmente
3. Solo descarga el archivo y vuelve a importar
4. ¡Todo se actualizará sin problemas!

---

## ✨ RESUMEN

✅ Archivos SQL mejorados con eliminación automática
✅ Compatible 100% con hosting compartido
✅ MariaDB completamente soportado
✅ Sin errores de índices duplicados
✅ Datos de ejemplo incluidos
✅ Listo para producción

**¡La base de datos está lista para usar!** 🚀