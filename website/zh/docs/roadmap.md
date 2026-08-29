# 路线图

理念：**慢就是快，克制且聚焦。** 先把单机运行时内核做到真正可用，再在其上生长分布式能力。

## 阶段一（当前）——单机运行时内核

- 五大核心能力端到端跑通：配置即 Agent、多 Agent 并存、CLI、REST API、MCP 集成
- SQLite 持久化，审计表从第一天落库
- 可演示的最小完备内核

## 阶段二（规划）——底座分布式

- 实例无状态化，状态外置（会话 → 内存库、长期记忆 → PostgreSQL、审计 → 对象存储）
- K8s 多副本部署：高可用、水平扩展
- 渠道消息恰好一次消费、分布式任务租约

## 阶段三（愿景）——跨节点 Agent 协作

- 连接多个 OryxOS 节点的 Agent 通信底座
- Agent 通过 **A2A** 跨节点发现、委托与协同

## 横向能力（伴随各阶段逐步补齐）

多租户、SSO、完整审计、Tool Policy、可观测（Prometheus + Grafana）、Web 管理台、GraalVM Native Image、IM 渠道（企业微信 / 飞书 / 钉钉 / Slack）。

## 扩展阶段待办（社区共建）

Memory 自动抽取与语义检索、情景记忆、MCP Server 暴露、完整容器沙箱、REST 剩余端点、SDK（Java → Python → TypeScript → Go）、Kubernetes Operator。
