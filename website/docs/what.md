# What is OryxOS

OryxOS is a **Java-native, open-source Agent OS runtime kernel**. One config file defines an Agent; one base runs a fleet of Agents — privately deployed, fully auditable, data never leaves your domain.

![OryxOS architecture](./architecture.svg)

## Agent OS vs Agent runtime

- **Agent runtime**: the execution kernel that makes a single Agent run — LLM calls, tool execution, context management, loop control.
- **Agent OS**: contains a runtime kernel, and on top of it manages the lifecycle of many Agents, unified channels, unified memory, and OS-level governance (multi-tenancy, audit).

Like an operating system: the runtime is the environment for one process, the Agent OS schedules a fleet of processes. **OryxOS is the latter.**

## Delivery in two stages

1. **Core stage (current)** — a minimal complete runtime kernel: five core capabilities, CLI, REST API, MCP integration.
2. **Extension stage** — the differentiating governance layer: multi-tenancy, SSO, full audit, Tool Policy, web console, built with the community.

The core stage is the foundation; enterprise governance is the destination.

## Five core capabilities

| Capability | What it gives you |
|------------|-------------------|
| LLM Provider | Unified access to DeepSeek, Qwen, Kimi, Zhipu, OpenAI, Anthropic… switch at runtime, no lock-in |
| ReAct Loop | Self-implemented reasoning engine, loop behavior fully controllable |
| Memory | Session + long-term memory (`MEMORY.md`), vector search upgrade path reserved |
| Tool System | Built-in File/Shell/HTTP tools; three-tier plugin extension (SKILL.md + MCP → MCP server → Java `@Tool`) |
| Web Service | 10 core REST endpoints — the single integration surface for business systems |

## Design principles

- **Base over Agent**: the deliverable is the environment any Agent can run in reliably
- **Config-as-Agent**: an Agent is defined by a YAML Profile, not code
- **Open standards**: tools via MCP, skills via SKILL.md, agent-to-agent via A2A (roadmap)
- **Security is foundation, not patch**: whitelist sandbox, credentials via env vars, full-chain audit from day one
- **Restraint**: ship the minimal complete kernel first; every upgrade must prove its necessity with real usage
