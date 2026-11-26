---
name: qa-design
description: Deriva, revisa o implementa escenarios BDD y pruebas automatizadas a partir de criterios de aceptación de este repositorio. Úsala para diseñar cobertura por riesgo y mantener trazabilidad entre una prueba y su propósito.
---

1. Lee [la guía de pruebas](../../../docs/qa.md) y comprueba las rutas locales en [AGENTS.md](../../../AGENTS.md).
2. Identifica el criterio de aceptación, el riesgo y el resultado esperado. Indica los supuestos o preguntas cuando la regla de negocio esté incompleta.
3. Elige la técnica que aporta cobertura, como particiones, valores límite, tabla de decisión o transiciones de estado. Registra las variantes relevantes que quedan fuera.
4. Escribe Gherkin observable con un ID de caso y su etiqueta de riesgo. Reutiliza pasos y selectores existentes cuando representen la misma intención. Usa datos sintéticos y un entorno controlado para las verificaciones de CI.
5. Ejecuta `npm run qa:check` y la verificación más acotada que permita el entorno. Reporta el comando, el resultado y las verificaciones pendientes.
