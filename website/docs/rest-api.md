# REST API

The Web Service is the full external facade of OryxOS. Default port `8080`, started with `oryxos serve`.

## Core 10 endpoints

### Session management

| Endpoint | Description |
|----------|-------------|
| `POST /api/v1/sessions` | Create a session |
| `POST /api/v1/sessions/{id}/messages` | Send a message, triggers the ReAct loop |
| `GET /api/v1/sessions/{id}` | Get session history |
| `DELETE /api/v1/sessions/{id}` | Archive a session |

### Agent invocation & info

| Endpoint | Description |
|----------|-------------|
| `POST /api/v1/agents/{name}/invoke` | Stateless one-shot invocation |
| `GET /api/v1/profiles` | List available Agent profiles |
| `GET /api/v1/memory` | Read long-term memory |
| `GET /api/v1/tools` | List registered tools |

### System

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/health` | Health check |
| `GET /api/v1/info` | Runtime info and provider status |

## Example: full session lifecycle

```bash
# 1. create
curl -X POST localhost:8080/api/v1/sessions

# 2. send a message (runs the ReAct loop)
curl -X POST localhost:8080/api/v1/sessions/{id}/messages \
  -H "Content-Type: application/json" \
  -d '{"message": "Check yesterday'"'"'s failed jobs"}'

# 3. read history
curl localhost:8080/api/v1/sessions/{id}

# 4. archive
curl -X DELETE localhost:8080/api/v1/sessions/{id}
```

## Conventions

- Errors: standard HTTP status + JSON body with `errorCode`, `message`, `timestamp`
- Request size limit: 32 KB per message; history returns up to 100 latest messages
- Agent invocation timeout: 60 s → `504`
- Interactive docs: Swagger UI at `/swagger-ui` (springdoc)

## Explicitly out of scope for the core stage

Auth (assumes intranet), SSE streaming, WebSocket, RBAC, rate limiting — all scheduled for the extension stage.
