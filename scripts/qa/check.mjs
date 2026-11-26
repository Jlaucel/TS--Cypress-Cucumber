import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { AstBuilder, GherkinClassicTokenMatcher, Parser } from '@cucumber/gherkin';
import { IdGenerator } from '@cucumber/messages';

const parser = new Parser(new AstBuilder(IdGenerator.incrementing()), new GherkinClassicTokenMatcher());
const cases = new Set();
const rows = [];
const errors = [];

async function featureFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return featureFiles(path);
    return entry.isFile() && path.endsWith('.feature') ? [path] : [];
  }));
  return paths.flat().sort();
}

function* scenarios(children) {
  for (const child of children) {
    if (child.scenario) yield child.scenario;
    if (child.rule) yield* scenarios(child.rule.children);
  }
}

for (const file of await featureFiles('cypress/e2e')) {
  try {
    const { feature } = parser.parse(await readFile(file, 'utf8'));
    for (const scenario of scenarios(feature?.children ?? [])) {
      const location = `${file}:${scenario.location.line}`;
      const tags = scenario.tags.map((tag) => tag.name);
      const ids = tags.filter((tag) => /^@QA-CYP-\d{3,}$/.test(tag));
      const risks = tags.filter((tag) => /^@risk-(high|medium|low)$/.test(tag));
      if (ids.length !== 1 || risks.length !== 1) {
        errors.push(`${location}: se requiere un ID @QA-CYP-NNN y un nivel @risk.`);
        continue;
      }
      const [id] = ids;
      if (cases.has(id)) errors.push(`${location}: ID duplicado ${id}.`);
      cases.add(id);
      rows.push(`- ${id} · ${risks[0]} · ${location}`);
    }
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
  }
}
if (!cases.size) errors.push('No se encontraron escenarios con trazabilidad.');

try {
  const { hooks } = JSON.parse(await readFile('.codex/hooks.json', 'utf8'));
  for (const event of ['SessionStart', 'PostToolUse']) {
    if (!hooks?.[event]?.some((group) => group.hooks?.some((hook) => hook.type === 'command' &&
        hook.command?.includes('.codex/hooks/qa.mjs') && hook.commandWindows?.includes('.codex/hooks/qa.mjs')))) {
      errors.push(`Falta el hook local ${event} para macOS/Linux y Windows.`);
    }
  }
  execFileSync(process.execPath, ['--check', '.codex/hooks/qa.mjs']);
} catch (error) {
  errors.push(`Configuración de hooks inválida: ${error.message}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`# Trazabilidad de pruebas · ${cases.size} caso(s)\n\n${rows.join('\n')}`);
}
