# FAQ

## Why Java?

Because that is where the gap is. OpenClaw (Node.js) and Hermes Agent (Python) proved the Agent OS model, but no Java-native implementation exists — while Java is the de facto backend stack of the enterprises that need private, auditable Agent infrastructure most. Spring Boot ops tooling, existing Java services and audit processes all plug in directly.

## How is OryxOS different from OpenClaw / Hermes Agent?

Same species, different positioning: OpenClaw is consumer-grade and hacker-friendly; Hermes is engineering-grade for small teams; **OryxOS targets regulated enterprises** — private deployment, auditability, Java ecosystem alignment. SKILL.md keeps skills compatible across all three.

## How is it different from Dify / Coze?

Different layers. Dify-style platforms orchestrate **workflows**; OryxOS hosts **long-running configured Agents**. They compose well: an orchestration platform can sit on top of OryxOS and call its REST API.

## How is it different from LangChain / Spring AI?

Frameworks give you libraries — you build and run everything yourself. OryxOS gives you the running base: channels, provider routing, memory, sandbox, audit. Internally, OryxOS uses Spring AI (Alibaba) as its LLM protocol layer — reuse, not competition.

## What exactly does the core stage deliver?

A demo-able runtime kernel: five capabilities, CLI, 10 REST endpoints, MCP client, SQLite + audit tables. Not yet: multi-tenancy, SSO, IM channels, SSE, auth. Those arrive in the extension stage — the kernel is the foundation, governance is the destination.

## How is tool security handled?

Application-layer whitelists for every built-in tool: file paths, shell commands, HTTP domains. Each Profile only sees its declared tools. No `SecurityManager` (removed in JDK 21); full container-level isolation is on the extension roadmap. Credentials are injected via environment variables and never written into Profile YAML.

## Does it lock me into a cloud?

No. OryxOS runs on your own K8s, VMs or bare metal, collects nothing, and talks to any OpenAI-compatible endpoint — including your own local inference (Ollama, vLLM).

## License?

Apache License 2.0. Long-term goal: the Apache Software Foundation.
