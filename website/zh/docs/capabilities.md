# 五大核心能力

五大能力是运行时内核的交付物。它们合起来解决"让单个 Agent 跑得好"；治理能力（多租户、SSO、完整审计）在扩展阶段补齐。

## 1. 对接 LLM

Spring AI / Spring AI Alibaba 之上的一层薄包装。Agent 不感知具体厂商，切换模型只是改配置。

- 显式 provider name → `ChatModel` 映射（不做 Bean 扫描）
- 支持本地推理（Ollama、vLLM）
- 成本透明：每次调用落 `llm_calls` 审计表

## 2. ReAct 循环

引擎。LLM 思考是否调工具、调哪个；OryxOS 执行后把结果回填，直到给出最终答案。

- 核心循环仅数十行 Java——完全自有、完全可控
- 每个 Profile 可覆盖 `max_iterations`（默认 10）
- 每次 LLM 调用与 Tool 调用都有结构化日志、可审计

## 3. Memory 记忆

核心阶段实现两层：

- **会话记忆**——完整对话历史，持久化到 SQLite，跨重启恢复
- **长期记忆**——`MEMORY.md` 文件，Agent 通过 `save_memory` / `recall_memory` 两个内置工具读写，内容注入 system prompt

接口预留向量检索升级空间。

## 4. Tool 工具体系

内置工具：`read_file`、`write_file`、`list_dir`、`shell`、`http_get` / `http_post`，加两个记忆工具——全部经过 `SandboxChecker` 白名单校验（路径、命令、域名）。

业务方三档扩展：

| 档位 | 做法 | 门槛 |
|------|------|------|
| 零代码（主推） | SKILL.md + 社区现成 MCP server | 纯 markdown |
| 轻代码 | 任意语言自写 MCP server | 中等 |
| 重代码 | Java `@Tool` 注解 Spring Bean | 深度集成 |

## 5. Web Service

核心 10 个 REST 端点：会话管理、无状态调用、Profile/Memory/Tool 信息与系统状态——业务系统只需要这一条通道。详见 [REST API](./rest-api)。
