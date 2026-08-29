# Roadmap

The philosophy: **slow is fast, restrained and focused.** Make the single-node runtime kernel genuinely useful first, then grow distributed capabilities on top of it.

## Stage 1 (current) — single-node runtime kernel

- Five core capabilities working end to end: config-as-Agent, multi-Agent on one instance, CLI, REST API, MCP integration
- SQLite persistence with audit tables written from day one
- A demo-able minimal complete kernel

## Stage 2 (planned) — distributed base

- Stateless instances, state externalized (sessions → in-memory store, long-term memory → PostgreSQL, audit → object storage)
- Multi-replica deployment on K8s: high availability, horizontal scaling
- Exactly-once channel message consumption, distributed task leasing

## Stage 3 (vision) — cross-node Agent collaboration

- An Agent communication base connecting multiple OryxOS nodes
- Agents discover, delegate and coordinate across nodes via **A2A**

## Horizontal capabilities (alongside all stages)

Multi-tenancy, SSO, full audit, Tool Policy, observability (Prometheus + Grafana), web console, GraalVM native image, IM channels (WeCom / Feishu / DingTalk / Slack).

## Extension-stage backlog (community)

Memory auto-extraction & semantic retrieval, episodic memory, MCP server exposure, complete container sandbox, remaining REST endpoints, SDKs (Java → Python → TypeScript → Go), Kubernetes Operator.
