import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const directory = process.argv[2] ?? 'allure-results';
const statuses = ['passed', 'failed', 'broken', 'skipped', 'unknown'];
const counts = Object.fromEntries(statuses.map((status) => [status, 0]));
const signals = {
  'tiempo de espera': /\btimeout\b|timed out|tiempo de espera/i,
  'selector o elemento': /selector|locator|no such element|element not found/i,
  'red o dispositivo': /econnrefused|enotfound|device offline|no connected devices/i,
  'sin clasificar': /[\s\S]*/,
};
const issues = Object.fromEntries(Object.keys(signals).map((signal) => [signal, 0]));
const caseIds = new Set();
let attachments = 0;
let unreadable = 0;

try {
  const files = (await readdir(directory, { withFileTypes: true }))
    .filter((file) => file.isFile() && file.name.endsWith('-result.json'));

  for (const file of files) {
    try {
      const result = JSON.parse(await readFile(join(directory, file.name), 'utf8'));
      if (!result || !statuses.includes(result.status)) {
        throw new Error('Resultado sin estado válido');
      }
      counts[result.status]++;
      if (result.status !== 'failed' && result.status !== 'broken') continue;
      const message = result.statusDetails?.message;
      const description = typeof message === 'string' ? message.split(/\r?\n\s+at\s/)[0] : '';
      const signal = Object.entries(signals).find(([, pattern]) => pattern.test(description))[0];
      issues[signal]++;
      for (const label of Array.isArray(result.labels) ? result.labels : []) {
        if (label?.name === 'tag' && /^@?QA-[A-Z]{3}-\d{3,}$/.test(label.value)) {
          caseIds.add(label.value.replace(/^@/, ''));
        }
      }
      const steps = [result];
      while (steps.length) {
        const step = steps.pop();
        attachments += Array.isArray(step?.attachments) ? step.attachments.length : 0;
        if (Array.isArray(step?.steps)) steps.push(...step.steps);
      }
    } catch {
      unreadable++;
    }
  }
} catch (error) {
  console.error(error.code === 'ENOENT'
    ? 'Ejecuta la suite para generar un directorio de resultados Allure.'
    : 'No se pudo leer el directorio de resultados Allure.');
  process.exit(1);
}

const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
if (!total) {
  console.error('No se encontraron resultados Allure válidos.');
  process.exit(1);
}

console.log('# Resumen de resultados Allure');
console.log(`Entradas válidas: ${total}. Archivos inválidos: ${unreadable}.`);
for (const [status, count] of Object.entries(counts)) console.log(`- ${status}: ${count}`);
console.log('\n## Señales en fallos');
for (const [signal, count] of Object.entries(issues)) console.log(`- ${signal}: ${count}`);
console.log(`- Adjuntos en fallos: ${attachments}`);
if (caseIds.size) console.log(`- Casos con etiqueta: ${[...caseIds].sort().join(', ')}`);
console.log('\nCada entrada representa un resultado emitido. Los reintentos pueden generar entradas adicionales.');
console.log('Las señales son hipótesis basadas en el mensaje. Confirma la causa con la evidencia original.');
if (unreadable) process.exitCode = 1;
