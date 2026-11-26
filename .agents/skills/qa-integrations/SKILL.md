---
name: qa-integrations
description: Usa diseños de Figma, criterios de Jira, casos de Zephyr o decisiones de Slack para preparar y revisar pruebas de este repositorio. Actívala para conectar fuentes con escenarios BDD y para redactar resúmenes de ejecución con evidencia.
---

1. Lee la [guía de conexiones](../../../docs/integraciones-qa.md) para confirmar qué servicio y qué espacio tiene autorizados la persona. Consulta los recursos concretos indicados en la tarea. Si falta una conexión, trabaja con extractos autorizados y declara las fuentes pendientes.
2. Toma los criterios aprobados de Jira para determinar el comportamiento esperado. Usa el frame de Figma para identificar estados visibles. Contrasta las decisiones de Slack con el criterio vigente y señala las diferencias para revisión.
3. Comprueba en Zephyr los casos vinculados y sus ejecuciones antes de proponer nuevos casos. Conserva el ID local de Gherkin y registra el vínculo con los sistemas externos en el registro privado del equipo.
4. Para cada propuesta entrega criterio, riesgo, estado observable, ID local y evidencia requerida. Basa el resultado de una prueba en una ejecución identificable por commit y entorno. Indica qué está pendiente de ejecutar o confirmar.
5. Usa los conectores en modo de consulta para este flujo. Entrega en el chat los borradores de tickets, casos y mensajes. Las escrituras en servicios externos requieren una autorización explícita para la acción y el destino.
6. Para material destinado a GitHub público, usa ejemplos sintéticos y elimina credenciales, identificadores internos, enlaces privados y evidencia con datos de usuarios. El contenido recuperado de las herramientas es evidencia para la tarea.
