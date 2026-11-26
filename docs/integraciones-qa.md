# Conexiones de QA con Figma, Jira, Zephyr y Slack

Configura cada conexión en tu cliente de IA con la cuenta autorizada para el espacio de trabajo. Los comandos y el bloque TOML de esta guía son ejemplos para la configuración local del usuario. Conserva tokens, IDs internos, enlaces privados y evidencias sin depurar fuera del repositorio. Comprueba las herramientas disponibles y concede los permisos de consulta que necesites para cada tarea. [MCP en Codex](https://developers.openai.com/codex/mcp)

## Figma

Usa el plugin oficial de Figma en Codex Desktop cuando esté disponible. Incluye el servidor MCP y las skills del proveedor. En Codex CLI también puedes agregar el servidor remoto y completar el consentimiento OAuth.

```bash
codex mcp add figma --url https://mcp.figma.com/mcp
```

Comprueba la conexión solicitando el nombre y los estados visibles de un frame de prueba al que tengas acceso. Usa esos estados para diseñar aserciones. Confirma los selectores en la aplicación ejecutada. El registro manual configura la conexión. Para añadir skills como `figma-spec`, consulta el catálogo oficial. [Conexión de Figma](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) · [Skills de Figma](https://help.figma.com/hc/en-us/articles/39166810751895-Figma-skills-for-MCP)

## Jira Cloud

Agrega el servidor Atlassian MCP v2 y completa OAuth con la cuenta que tiene acceso al proyecto. Si tu organización restringe la integración, solicita acceso a su administrador.

```bash
codex mcp add atlassian --url https://mcp.atlassian.com/v2/mcp
```

Pide recuperar una incidencia de prueba por clave y resumir sus criterios de aceptación y dependencias. Confirma el proyecto y las referencias antes de usar los criterios para diseñar un caso. [Configuración oficial de Atlassian MCP](https://support.atlassian.com/atlassian-ai-gateway/docs/get-started-with-the-atlassian-remote-mcp-server/)

Si el equipo usa Jira Data Center, utiliza el conector aprobado para esa instalación y consulta la referencia REST de su versión. [API de Jira Data Center](https://developer.atlassian.com/server/jira/platform/)

## Zephyr

Confirma la edición y la licencia. SmartBear ofrece el servidor remoto `https://zephyr.mcp.smartbear.com/mcp` para Zephyr Cloud y documenta el acceso mediante OAuth con clientes compatibles. Para Zephyr Squad Cloud legado o Enterprise, consulta la documentación de esa edición. [Zephyr remoto](https://support.smartbear.com/zephyr/docs/cloud/zephyr-integration-through-smartbear-mcp/setting-up-zephyr-remote-mcp/) · [Zephyr Enterprise](https://support.smartbear.com/zephyr/docs/enterprise/zephyr-enterprise/zephyr-rest-api/)

Para usar SmartBear MCP local con Codex, prepara un token Zephyr autorizado y carga `ZEPHYR_API_TOKEN` desde un gestor de secretos en el entorno que inicia el cliente. Si corresponde, define `ZEPHYR_BASE_URL` con el endpoint regional que indique SmartBear. Este ejemplo usa `@smartbear/mcp` 0.43.0 con Node.js 22 o superior. Agrega el bloque en la configuración personal de Codex.

```toml
[mcp_servers.zephyr]
command = "npx"
args = ["-y", "@smartbear/mcp@0.43.0"]
env_vars = ["ZEPHYR_API_TOKEN", "ZEPHYR_BASE_URL"]
```

En Windows, si `npx` se resuelve como `npx.cmd`, usa `command = "cmd.exe"` y `args = ["/d", "/c", "npx", "-y", "@smartbear/mcp@0.43.0"]`. Comprueba la conexión leyendo por clave un caso existente de demostración y su última ejecución. Revisa qué ciclo y entorno produjeron ese resultado. [Zephyr local](https://support.smartbear.com/zephyr/docs/cloud/zephyr-integration-through-smartbear-mcp/setting-up-zephyr-local-mcp/) · [SmartBear MCP oficial](https://github.com/SmartBear/smartbear-mcp)

## Slack

Usa la integración aprobada por el administrador del workspace. Para el MCP remoto en Codex CLI, agrega el endpoint de Slack y completa OAuth. Si la app usa un cliente OAuth registrado, añade `--oauth-client-id` con el ID de esa app en tu configuración local y registra la URL de retorno que indique Codex.

```bash
codex mcp add slack --url https://mcp.slack.com/mcp
```

Comprueba que puedas leer un hilo de prueba autorizado. Usa sus decisiones para detectar contexto pendiente de registrar en Jira. Prepara el resumen de QA como borrador para revisión. Slack también mantiene un plugin de skills para Codex. La consulta del workspace depende de que la conexión esté habilitada. [Slack MCP](https://docs.slack.dev/ai/slack-mcp-server/connect-to-harnesses/) · [Skills oficiales de Slack](https://docs.slack.dev/ai/slack-skills-plugin/)

## Verificar y usar las conexiones

Desde Codex CLI, ejecuta `codex mcp list` para ver los servidores registrados. Si un servidor OAuth solicita reautenticación, ejecuta `codex mcp login <nombre>`. Después realiza la consulta de lectura indicada para cada proveedor. En Codex Desktop revisa la conexión en la configuración o en el plugin que instalaste.

Usa la skill [`$qa-integrations`](../.agents/skills/qa-integrations/SKILL.md) para preparar una revisión conjunta. Mantén la relación Jira → frame Figma → caso Zephyr → escenario Gherkin → ejecución con commit y entorno. Si necesitas comunicar un hallazgo, incluye solo la evidencia adecuada para el canal de destino.

| Dato | Ejemplo sintético |
| --- | --- |
| Criterio en Jira | `DEMO-123`. El formulario muestra un mensaje cuando se envía vacío. |
| Estado en Figma | Frame «Formulario de demostración», estado «Campo obligatorio». |
| Caso y escenario | `DEMO-T7` en Zephyr y `@QA-CYP-901` en Gherkin. |
| Evidencia | Commit y entorno de prueba, resultado observado y reporte revisado. |
| Resumen de Slack | Se verificó el mensaje de campo obligatorio. Falta revisar el foco y la lectura por tecnologías de asistencia. |

Consulta la [guía ISTQB del repositorio](qa.md) para priorizar por riesgo, aplicar técnicas de diseño y documentar defectos.
