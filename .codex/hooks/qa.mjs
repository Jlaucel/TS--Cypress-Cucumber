import { readFileSync } from 'node:fs';

let input;
try {
  input = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  process.exit(0);
}
if (!input || typeof input !== 'object') process.exit(0);

const event = input.hook_event_name;
let additionalContext;
if (event === 'SessionStart') {
  additionalContext = 'Para tareas de pruebas, consulta docs/qa.md. Usa $qa-design para cobertura y $qa-triage para fallos. npm run qa:check verifica sintaxis y trazabilidad localmente.';
}
if (event === 'PostToolUse' &&
    /(?:^|[\s;&|])npm(?:\.cmd)?\s+(?:run\s+)?test(?:\s|$)/.test(input.tool_input?.command ?? '')) {
  additionalContext = 'Comprueba el estado real de npm test. Si la ejecución falló y generó resultados Allure, usa npm run qa:triage para preparar el diagnóstico. Confirma con la evidencia local.';
}
if (additionalContext) {
  console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: event, additionalContext } }));
}
