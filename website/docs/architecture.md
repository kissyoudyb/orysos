# Architecture

OryxOS is a **Spring Boot 3.x monolith** running on **JDK 21**. It exposes two entrances (CLI Channel and Web Service); messages converge into one engine.

![OryxOS architecture](./architecture.svg)

## Layers

1. **Access layer** — CLI Channel, Web Service (REST API). Messages in, responses out.
2. **Engine layer** — `ReActLoop` + `PromptBuilder` + `ToolExecutor`: assemble prompt → call LLM → execute tool → feed result back → continue, until a final response or `max_iterations`.
3. **Capability layer** — Provider (LLM calls), Memory (session + long-term), Tool (registry + sandbox + MCP client).
4. **Foundation layer** — Profile/Bootstrap/Skill loading, config & secrets, SQLite storage.

## The 9 Maven modules

| Module | Responsibility |
|--------|----------------|
| `oryxos-core` | Core abstractions: `OryxTool`, `Session`, `Profile`, `ContextLoader`, `ReActLoop`, `PromptBuilder`, `ToolExecutor` |
| `oryxos-provider` | LLM provider abstraction, Function Calling adapter, explicit name→ChatModel mapping |
| `oryxos-memory` | `MemoryService` facade, `LongTermMemory`, memory tools |
| `oryxos-tool` | Built-in File/Shell/Http tools, `McpClientService`, `ToolRegistry`, `SandboxChecker` |
| `oryxos-channel-cli` | CLI channel (`oryxos chat`) |
| `oryxos-web` | 6 REST controllers, core 10 endpoints, OpenAPI docs |
| `oryxos-storage` | SQLite via Spring Data JPA: sessions + audit tables |
| `oryxos-cli` | Picocli entry, 12 subcommands, `ConfigLoader` |
| `oryxos-boot` | Spring Boot launcher, fat JAR packaging |

Modules communicate through interfaces; extensions add new modules without touching core.

## Key technical decisions

- **Self-implemented ReAct loop** — Spring AI is used only as protocol adapter and `@Tool` schema generator; its auto tool execution is disabled, so tools are never invoked twice.
- **Explicit provider mapping** — provider name → `ChatModel` via an explicit table, never classpath scanning.
- **SQLite + `MEMORY.md`** — single-binary persistence; audit tables (`tool_invocations`, `llm_calls`) are written from day one.
- **Whitelist sandbox** — path/command/domain allowlists at the application layer (`SecurityManager` is gone in JDK 21).
- **Virtual threads** — synchronous blocking model + Java 21 virtual threads, no reactive programming.
