# REST API

Web Service 是 OryxOS 的对外完整门面。默认端口 `8080`，由 `oryxos serve` 启动。

## 核心 10 个端点

### 会话管理

| 端点 | 说明 |
|------|------|
| `POST /api/v1/sessions` | 创建会话 |
| `POST /api/v1/sessions/{id}/messages` | 发送消息，触发 ReAct 循环 |
| `GET /api/v1/sessions/{id}` | 查询会话历史 |
| `DELETE /api/v1/sessions/{id}` | 归档会话 |

### Agent 调用与信息

| 端点 | 说明 |
|------|------|
| `POST /api/v1/agents/{name}/invoke` | 无状态调用一次 Agent |
| `GET /api/v1/profiles` | 列出可用 Agent（Profile） |
| `GET /api/v1/memory` | 查询长期记忆 |
| `GET /api/v1/tools` | 列出已注册工具 |

### 系统状态

| 端点 | 说明 |
|------|------|
| `GET /api/v1/health` | 健康检查 |
| `GET /api/v1/info` | 运行信息与 Provider 状态 |

## 示例：完整会话生命周期

```bash
# 1. 创建
curl -X POST localhost:8080/api/v1/sessions

# 2. 发消息（执行 ReAct 循环）
curl -X POST localhost:8080/api/v1/sessions/{id}/messages \
  -H "Content-Type: application/json" \
  -d '{"message": "看看昨天失败的定时任务"}'

# 3. 查历史
curl localhost:8080/api/v1/sessions/{id}

# 4. 归档
curl -X DELETE localhost:8080/api/v1/sessions/{id}
```

## 约定

- 错误：标准 HTTP 状态码 + JSON（`errorCode`、`message`、`timestamp`）
- 请求大小：单条消息最大 32 KB；历史最多返回最近 100 条
- Agent 调用超时 60 秒返回 `504`
- 交互式文档：`/swagger-ui`（springdoc）

## 核心阶段明确不做

认证（假设内网）、SSE 流式、WebSocket、RBAC、限流——都在扩展阶段。
