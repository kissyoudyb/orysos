# Five Core Capabilities

The five capabilities are what the runtime kernel delivers. Together they cover "run one Agent well"; governance capabilities (multi-tenancy, SSO, full audit) arrive in the extension stage.

## 1. LLM Provider

A thin wrapper over Spring AI / Spring AI Alibaba. Agents never know which vendor they are talking to; switching is a config change.

- Explicit provider-name → `ChatModel` mapping (no bean scanning)
- Local inference supported (Ollama, vLLM)
- Cost transparency: every call recorded into the `llm_calls` audit table

## 2. ReAct Loop

The engine. LLM thinks whether to call a tool and which one; OryxOS executes it and feeds the result back until a final answer.

- Core loop is a few dozen lines of Java — fully owned, fully controllable
- `max_iterations` guard (default 10) per Profile
- Every LLM call and tool call is logged and auditable

## 3. Memory

Two layers in the core stage:

- **Session memory** — full conversation history, persisted to SQLite, restored across restarts
- **Long-term memory** — `MEMORY.md` file, read/written by the agent through `save_memory` / `recall_memory` built-in tools, injected into the system prompt

The interface reserves an upgrade path to vector retrieval.

## 4. Tool System

Built-in tools: `read_file`, `write_file`, `list_dir`, `shell`, `http_get` / `http_post`, plus the two memory tools — all gated by `SandboxChecker` whitelists (paths, commands, domains).

Three extension tiers for business developers:

| Tier | How | Effort |
|------|-----|--------|
| Zero-code (recommended) | SKILL.md + off-the-shelf MCP servers | Markdown only |
| Light-code | Write your own MCP server in any language | Medium |
| Heavy-code | Java `@Tool` annotated Spring Bean | Deep integration |

## 5. Web Service

10 core REST endpoints covering sessions, stateless invocation, profile/memory/tool info and system status — the only channel business systems need. See [REST API](./rest-api).
