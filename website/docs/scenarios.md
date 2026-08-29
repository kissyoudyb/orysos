# Scenarios

Three typical scenarios for the full OryxOS vision. The core stage ships the runtime kernel these are built on.

## Ops assistant

A mid-size SaaS company connects an ops assistant to enterprise IM. Night alerts arrive by webhook; the agent queries logs, cross-references the historical failure base, applies a mitigation skill, restarts the service, and posts "self-healed, details attached" to the on-call group before engineers wake up.

**OryxOS in play**: channel access, provider routing, tool calls (SSH / Prometheus / notification), memory (incident history), skills (runbooks).

## Knowledge assistant

A legal team indexes contract templates, regulations and past cases. Employees ask in IM: "How did we handle data-export clauses in the last SaaS agreement?" The agent retrieves the case, cites the exact sources, and drafts a response — every answer traceable, as compliance requires.

**Key point**: memory retrieval accuracy and citation traceability.

## Sales assistant

Before visiting a client, a salesperson asks: "What should I know about Company A tomorrow?" The agent pulls CRM transaction history, checks the latest registry data through an MCP tool, extracts key contacts and buying habits, and outputs a briefing.

**OryxOS in play**: MCP integration, enterprise system connectors, tool orchestration.

## From scenario to acceptance

Each core capability maps to an acceptance demo — weather Q&A (LLM + ReAct), memory across restarts, zero-code PR digest, full REST session lifecycle, multi-endpoint integration. These demos are the hard release criteria of the core stage.
