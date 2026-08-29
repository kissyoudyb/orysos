# Quick Start

## Requirements

- JDK 21+
- Apache Maven 3.9+
- An API key from any supported LLM (DeepSeek, Kimi, Qwen, Zhipu, OpenAI…)

## Build from source

```bash
git clone https://github.com/kissyoudyb/orysos.git
cd orysos
mvn clean package
```

## Initialize the workspace

```bash
java -jar oryxos-boot/target/oryxos-boot-*.jar init
```

This creates the `.oryxos/` directory with Bootstrap files (`AGENTS.md`, `SOUL.md`, `USER.md`), a default Profile, and configuration for the SQLite database.

## Three run modes

| Command | Mode | Purpose |
|---------|------|---------|
| `oryxos chat` | Interactive | Local CLI conversations, development & daily use |
| `oryxos serve` | Web Service | REST API on port 8080 for business systems |
| `oryxos gateway` | Daemon | Multi-channel resident process |

## Define an Agent with one YAML

`.oryxos/profiles/ops-assistant.yaml`:

```yaml
name: ops-assistant
description: Ops assistant
identity:
  agent_name: orex
  prompt: You are a rigorous ops assistant.
provider:
  name: deepseek
  model: deepseek-chat
tools: [http_get, read_file, shell]
settings:
  max_iterations: 10
```

## Talk to it

```bash
java -jar oryxos-boot/target/oryxos-boot-*.jar chat --profile ops-assistant
```

## Or call it over HTTP

```bash
curl -X POST localhost:8080/api/v1/sessions
curl -X POST localhost:8080/api/v1/sessions/{id}/messages \
  -H "Content-Type: application/json" \
  -d '{"message": "Summarize today'"'"'s error logs"}'
```

See [REST API](./rest-api) for the full endpoint list.
