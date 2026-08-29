# 整体架构

OryxOS 是跑在 **JDK 21** 上的 **Spring Boot 3.x 单体应用**。对外只有两个入口（CLI Channel 与 Web Service），消息汇入同一个引擎。

![OryxOS 架构](../../docs/architecture.svg)

## 分层视图

1. **接入层**——CLI Channel、Web Service（REST API）：消息进、响应出
2. **引擎层**——`ReActLoop` + `PromptBuilder` + `ToolExecutor`：组装 Prompt → 调 LLM → 执行 Tool → 回填结果 → 继续，直到最终响应或达到 `max_iterations`
3. **能力层**——Provider（LLM 调用）、Memory（会话 + 长期）、Tool（注册表 + 沙箱 + MCP Client）
4. **基础层**——Profile/Bootstrap/Skill 加载、配置与密钥、SQLite 存储

## 9 个 Maven 模块

| 模块 | 职责 |
|------|------|
| `oryxos-core` | 核心抽象：`OryxTool`、`Session`、`Profile`、`ContextLoader`、`ReActLoop`、`PromptBuilder`、`ToolExecutor` |
| `oryxos-provider` | LLM Provider 抽象、Function Calling 适配、显式 name→ChatModel 映射 |
| `oryxos-memory` | `MemoryService` 统一门面、`LongTermMemory`、记忆 Tool |
| `oryxos-tool` | 内置文件/Shell/HTTP 工具、`McpClientService`、`ToolRegistry`、`SandboxChecker` |
| `oryxos-channel-cli` | CLI Channel（`oryxos chat`） |
| `oryxos-web` | 6 个 REST Controller、核心 10 端点、OpenAPI 文档 |
| `oryxos-storage` | SQLite + Spring Data JPA：会话与审计表 |
| `oryxos-cli` | Picocli 主入口、12 个子命令、`ConfigLoader` |
| `oryxos-boot` | Spring Boot 启动模块，打 fat JAR |

模块间通过接口解耦；扩展加新模块、不改 core。

## 关键技术决策

- **自实现 ReAct loop**——Spring AI 只用作协议适配层和 `@Tool` schema 生成器，其自动 tool 执行被禁用，tool 绝不会被调用两次
- **显式 Provider 映射**——provider name → `ChatModel` 用显式映射表，不做容器类型扫描
- **SQLite + `MEMORY.md`**——单二进制持久化；审计表（`tool_invocations`、`llm_calls`）从第一天就落库
- **白名单沙箱**——应用层校验文件路径/命令/域名白名单（`SecurityManager` 在 JDK 21 已移除）
- **虚拟线程**——同步阻塞模型 + Java 21 virtual thread，不引入响应式编程
