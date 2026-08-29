# CLAUDE.md

OryxOS —— Java 实现的 Agent OS 运行时内核（oryx-labs 社区项目）。Maven 多模块骨架已初始化（9 个模块，`mvn package` 全部通过），功能代码按 `docs/AiProgrammingGuide.md` 的思路用 AI 编程实施：主体开发走 Spec-Kit 流程，增量开发直接对话修改。

本文件是 docs/ 的摘要和红线清单，细节冲突时以 docs/ 原文为准。

## 权威文档

| 文档 | 作用 |
|------|------|
| `docs/IndustryResearch.md` | 定位与边界：Agent OS 是什么、OryxOS 不做什么 |
| `docs/DemandAnalysis.md` | 需求 What：五大核心能力、数据模型、5 个验收 Demo（第 13 章是硬验收） |
| `docs/TechnicalSolution.md` | 技术 How：7 个关键决策（1.1 节）、9 个 Maven 模块（第 10 章） |
| `docs/AiProgrammingGuide.md` | 实施流程：Spec-Kit artifacts、5 个 user story 拆解 |

- 模块结构以 TechnicalSolution.md 第 10 章为准（9 个模块，不是旧版 11 个）
- Spec-Kit artifacts（`.specify/memory/constitution.md`、`spec.md`、`plan.md`）生成后同样是项目契约
- 拿不准行为细节时先查文档，不要凭通用 Agent 框架的常识猜测

## 非协商约束（最容易写错的红线）

1. **Spring AI 只用一半**：只用 Provider 抽象、协议转换、`@Tool` schema 生成；**禁用 Spring AI 自动 tool 执行**，tool 调度完全由 `ReActLoop` + `ToolExecutor` 控制。出现 tool 被调用两次，先查这里
2. **ReAct loop 自实现**：不用 Spring AI 的 Agent 抽象，核心循环约数十行 Java，循环行为完全可控
3. **Provider 显式映射**：provider name → `ChatModel` 用显式映射表，禁止扫描容器里所有 `ChatModel` Bean（类型相同必有歧义）
4. **Tool 三合一**：内置 Tool、MCP Client、`ToolRegistry`、`SandboxChecker` 全在 `oryxos-tool` 一个模块，不再拆分
5. **SKILL.md 不是 Tool**：加载归 `oryxos-core` 的 `ContextLoader`，与 Bootstrap 文件同类，是 prompt 输入源
6. **审计 day one 落库**：`tool_invocations` 和 `llm_calls` 核心阶段就写入 SQLite，可以没有查询接口，不能只写日志
7. **JDK 21 + Spring Boot 3.x**：Maven 多模块单体，单 fat JAR 部署；强制使用 JDK 21 特性，不降级
8. **不用 SecurityManager**（JDK 21 已移除）：Sandbox 用应用层白名单（文件路径 / Shell 命令 / HTTP 域名）
9. **每个 user story 结束必须有可演示 Demo**，先跑通再完美
10. constitution / spec / plan 由项目方维护，AI 不得自行修改；发现原则性问题停下来讨论

## 技术栈

JDK 21 · Spring Boot 3.x · Spring AI Alibaba（LLM connector）· Spring MVC + virtual thread · SQLite + Spring Data JPA · `MEMORY.md` 文件记忆 · Picocli · SnakeYAML · MCP Java SDK · Logback / SLF4J

## Maven 模块（9 个）

| 模块 | 职责 |
|------|------|
| `oryxos-core` | `OryxTool` 接口、`Session`、`Profile`、`ContextLoader`、`ReActLoop`、`PromptBuilder`、`ToolExecutor`、`AgentService` |
| `oryxos-provider` | `ProviderService`、Function Calling 适配、显式 provider 映射 |
| `oryxos-memory` | `MemoryService` 统一门面、`LongTermMemory`、`MemoryTools`（save_memory / recall_memory） |
| `oryxos-tool` | 内置 Tool（File/Shell/Http）、`McpClientService`、`McpToolAdapter`、`ToolRegistry`、`SandboxChecker` |
| `oryxos-channel-cli` | `CliChannel`、`oryxos chat` 实现 |
| `oryxos-web` | `WebServer`、6 个 ApiController（核心 10 端点）、`GlobalExceptionHandler`、OpenAPI 文档 |
| `oryxos-storage` | SQLite、`SessionRepository`、`ToolInvocationRepository`、`LlmCallRepository` |
| `oryxos-cli` | Picocli 主入口、12 个子命令、`ConfigLoader` |
| `oryxos-boot` | Spring Boot 启动模块、自动配置、依赖聚合 |

模块间通过接口解耦；扩展阶段加新 Channel 或新 Tool 只加新模块不改 core。

## 实施顺序（依赖关系决定，与优先级无关）

```
US-1 对接 LLM → US-2 ReAct → ┌ US-3 Memory ┐ → US-5 Web Service
                             └ US-4 Tool   ┘
```

- 每个 user story 完成后跑 `/speckit.analyze` 做一致性检查，不能省
- US-1 单独没有用户可见入口，与 US-2 一起验收 Demo 一；US-5 排最后是因为依赖前四个，不是不重要
- 5 个验收 Demo 见 DemandAnalysis.md 第 13 章，是核心功能发布的硬条件

## 常用命令

```bash
# 机器默认 JDK 17，项目要求 21；便携版 JDK 21 在 .tools/jdk-21（勿提交）
export JAVA_HOME="$(pwd)/.tools/jdk-21"
mvn clean package            # 打 fat JAR（Maven 3.9.9 在 D:\javatools\apache-maven-3.9.9）
java -jar oryxos-boot/target/oryxos-boot-*.jar init    # 初始化 .oryxos/ 工作区
java -jar oryxos-boot/target/oryxos-boot-*.jar chat    # CLI 交互对话（--profile <name> 指定 Agent）
java -jar oryxos-boot/target/oryxos-boot-*.jar serve   # 启动 REST API（默认 8080）
```

不需要 Spring 上下文的 CLI 命令（`init`、`profile list` 等）直接走文件操作，不要为它们启动 Spring。

## 工作区结构（.oryxos/）

- `profiles/` — Agent 的 YAML 配置，一个 Profile 一个 Agent（配置即 Agent，不写代码）
- `memory/MEMORY.md` — 长期记忆，Agent 通过 save_memory 追加，超 4000 字截断；与用户手写的 `USER.md` 是两回事（前者 Agent 读写，后者用户手写、OryxOS 只读）
- `skills/` + `mcp_servers.yaml` — 零代码扩展入口（SKILL.md + 复用现成 MCP server）
- `sessions/`、`oryxos.db` — 会话与审计数据
- `AGENTS.md` / `SOUL.md` / `USER.md` — Bootstrap 文件，启动时加载进 system prompt

## 工程注意

- SQLite 上 `ddl-auto=update` 对表结构演进不可靠，后续变更手动维护建表脚本或引入 Flyway/Liquibase
- 同步阻塞执行模型 + virtual thread，不引入响应式编程
- 核心阶段明确不做，不要顺手实现：Provider fallback / hedge racing、SSE 流式、认证、RBAC、多租户、Tool 并行调用、Memory 语义检索、情景记忆、上下文总结压缩
- 敏感配置走环境变量（Profile 里 `${ENV_VAR}` 占位），不明文落盘
- MCP 集成先做 stdio transport，SSE 放扩展阶段
- 运行 fat JAR 必须用 `.tools/jdk-21/bin/java`（全局默认是 JDK 17，会报 UnsupportedClassVersionError）
- dashscope starter 启动时强制要求 api-key，application.yaml 用 `${DASHSCOPE_API_KEY:sk-placeholder}` 占位；US-1 的 ConfigLoader 实现后由它接管
- SQLite 方言不在 Hibernate 主包里，storage 模块依赖 `hibernate-community-dialects`（版本必须对齐 Boot 管理的 Hibernate 6.6.15）

## 禁区

- `docs/prompt/` 目录不要读、不要改、不要分析
