# 常见问题

## 为什么用 Java？

因为缺口在那里。OpenClaw（Node.js）和 Hermes Agent（Python）验证了 Agent OS 模型，但 Java 生态没有任何原生实现——而最需要私有、可审计 Agent 基础设施的企业，后端恰恰以 Java 为事实标准。Spring Boot 运维工具链、现有 Java 服务与审计流程都能直接接入。

## 和 OpenClaw / Hermes Agent 有什么区别？

同类不同定位：OpenClaw 偏消费级、可玩性强；Hermes 偏工程级、面向小团队；**OryxOS 直接定位受监管企业**——私有部署、可审计、与 Java 体系对齐。SKILL.md 让三方技能互通。

## 和 Dify / Coze 有什么区别？

层级不同。Dify 这类平台编排的是**工作流**；OryxOS 承载的是**常驻的、配置出来的 Agent**。两者可以组合：编排平台跑在 OryxOS 之上，调用它的 REST API。

## 和 LangChain / Spring AI 有什么区别？

框架给你库——构建和运行都自己来。OryxOS 给你跑起来的底座：渠道、模型路由、记忆、沙箱、审计。OryxOS 内部正是用 Spring AI（Alibaba）做 LLM 协议层——是复用，不是竞争。

## 核心阶段到底交付什么？

一个可演示的运行时内核：五大能力、CLI、10 个 REST 端点、MCP 客户端、SQLite + 审计表。暂不包含：多租户、SSO、IM 渠道、SSE、认证——这些在扩展阶段。内核是地基，治理是终局。

## 工具安全怎么处理？

每个内置工具都有应用层白名单：文件路径、Shell 命令、HTTP 域名。每个 Profile 只能看到自己声明的工具。不使用 `SecurityManager`（JDK 21 已移除）；完整容器级隔离在扩展路线图上。凭证通过环境变量注入，绝不写进 Profile YAML。

## 会被某朵云锁定吗？

不会。OryxOS 跑在你自己的 K8s、虚拟机或物理机上，不收集任何数据，可以对接任何 OpenAI 兼容端点——包括你自己的本地推理（Ollama、vLLM）。

## 开源协议？

Apache License 2.0。长期目标：进入 Apache 软件基金会。
