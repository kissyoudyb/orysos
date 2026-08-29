# 快速上手

## 环境要求

- JDK 21+
- Apache Maven 3.9+
- 任一主流 LLM 的 API Key（DeepSeek、Kimi、通义、智谱、OpenAI…）

## 从源码构建

```bash
git clone https://github.com/kissyoudyb/orysos.git
cd orysos
mvn clean package
```

## 初始化工作区

```bash
java -jar oryxos-boot/target/oryxos-boot-*.jar init
```

会创建 `.oryxos/` 目录：Bootstrap 文件（`AGENTS.md`、`SOUL.md`、`USER.md`）、默认 Profile 以及 SQLite 数据库配置。

## 三种运行模式

| 命令 | 模式 | 用途 |
|------|------|------|
| `oryxos chat` | 交互对话 | 本地 CLI 多轮对话，开发调试与日常使用 |
| `oryxos serve` | Web Service | 在 8080 端口开放 REST API，供业务系统调用 |
| `oryxos gateway` | 守护进程 | 多渠道常驻进程 |

## 一份 YAML 定义一个 Agent

`.oryxos/profiles/ops-assistant.yaml`：

```yaml
name: ops-assistant
description: 运维助手
identity:
  agent_name: 小运
  prompt: 你是一个严谨的运维助手。
provider:
  name: deepseek
  model: deepseek-chat
tools: [http_get, read_file, shell]
settings:
  max_iterations: 10
```

## 和它对话

```bash
java -jar oryxos-boot/target/oryxos-boot-*.jar chat --profile ops-assistant
```

## 或者通过 HTTP 调用

```bash
curl -X POST localhost:8080/api/v1/sessions
curl -X POST localhost:8080/api/v1/sessions/{id}/messages \
  -H "Content-Type: application/json" \
  -d '{"message": "总结今天的错误日志"}'
```

完整端点列表见 [REST API](./rest-api)。
