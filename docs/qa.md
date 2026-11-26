# Guía de automatización de pruebas con Cypress

## Diseño basado en riesgo

1. Identifica el criterio de aceptación y prioriza el riesgo según probabilidad e impacto. Usa `@risk-high`, `@risk-medium` o `@risk-low`.
2. Elige la técnica según el comportamiento. Usa particiones para clases de entradas, valores límite para rangos ordenados, tablas de decisión para combinaciones y transiciones de estado para secuencias.
3. Nombra el resultado que un usuario puede observar. Etiqueta cada escenario con un ID único `@QA-CYP-NNN` y una etiqueta de riesgo. Por cada ID, vincula el criterio y el entorno en el PR o en el registro de pruebas.
4. Revisa diseño, datos y aserciones antes de automatizar. Prioriza verificaciones repetibles y ejecuta solo los casos compatibles con el entorno.

El caso `QA-CYP-001` demuestra la integración del framework con un sitio externo. La etiqueta `@external` identifica esa dependencia. La respuesta de Google puede variar según región, consentimiento o controles de tráfico. Un cambio allí no confirma un defecto en el framework.

## Ejecución y evidencias

- Ejecuta `npm ci` al preparar el entorno. `npm run qa:check` verifica sintaxis de escenarios, IDs, etiquetas de riesgo e integridad del hook. CI valida este repositorio sin abrir el sitio externo.
- Para la ejecución funcional y la instalación del entorno, sigue el [README](../README.md). `npm run report` abre el reporte Allure. Conserva la evidencia de una ejecución por separado para identificar reintentos y comparar cambios.
- `npm run qa:triage` imprime un resumen de estados y señales preliminares sin nombres de pruebas, mensajes originales, trazas ni contenido de adjuntos. Puedes cambiar el directorio con `npm run qa:triage -- ruta/allure-results`. Revisa las capturas y logs antes de compartirlos.
- Registra commit y entorno, casos ejecutados y pendientes, fallos por riesgo y bloqueos. Reabre una prueba inestable cuando tengas un resultado reproducible. Un reintento exitoso no elimina la primera observación.

## IA y revisión

Abre el proyecto en Codex y revisa `.codex/hooks.json` antes de aprobar sus hooks con `/hooks` o el control de revisión del cliente. `SessionStart` carga contexto del repositorio y `PostToolUse` orienta el diagnóstico después de `npm test`. Funcionan con Node.js y Git locales. El repositorio no configura credenciales ni una llamada automática a modelos.

- `$qa-design`. Pide escenarios para un criterio concreto, con ID, riesgo, técnica, datos sintéticos y aserciones verificables.
- `$qa-triage`. Pide hipótesis para una ejecución concreta, sustentadas en el resumen y la evidencia pertinente.

Revisa manualmente los escenarios, selectores y conclusiones sugeridos por IA. Comparte datos mínimos y elimina secretos y datos personales. El estado de CI se determina por verificaciones reproducibles.

## Registro de defecto

Incluye título, commit y entorno, caso y criterio asociado, pasos y datos reproducibles, resultado esperado y observado, frecuencia, severidad, prioridad y evidencia revisada. Indica si la causa sigue abierta y qué prueba podría confirmarla.

## Referencias

- Diseño de pruebas, riesgo, trazabilidad y gestión de defectos. [ISTQB CTFL v4.0.1](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf)
- Arquitectura, mantenibilidad, integración continua y reportes de automatización. [ISTQB CTAL-TAE v2.0](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTAL-TAE_Syllabus_v2.0.pdf)
- Uso de IA generativa, privacidad, fiabilidad y revisión humana. [ISTQB CT-GenAI v1.1](https://istqb.org/certifications/gen-ai/)
- Configuración de habilidades y hooks locales. [Skills de Codex](https://developers.openai.com/codex/skills) · [Hooks de Codex](https://developers.openai.com/codex/hooks)
