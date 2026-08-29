<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const isZh = computed(() => lang.value === 'zh-CN')
const t = (zh, en) => (isZh.value ? zh : en)

const capabilities = computed(() => [
  {
    icon: '🔌',
    title: t('对接 LLM', 'LLM Provider'),
    subtitle: t('Provider 抽象 · 运行时切换无锁定', 'Provider abstraction · no lock-in'),
    code: `# .oryxos/profiles/ops.yaml
provider:
  name: deepseek      # 通义 / Kimi / 智谱 / OpenAI…
  model: deepseek-chat
tools: [http_get, shell]`,
  },
  {
    icon: '🧠',
    title: t('ReAct 循环', 'ReAct Loop'),
    subtitle: t('自实现推理引擎 · 循环行为完全可控', 'Self-implemented engine · fully controllable'),
    code: `$ oryxos chat --profile ops
> 查一下北京天气并告诉我穿什么
[ReAct 1] think   -> 调用 http_get(北京天气)
[ReAct 2] observe -> 12°C 多云，生成建议
OryxOS: 今天 12°C 多云，建议穿件薄外套。`,
  },
  {
    icon: '💾',
    title: t('跨对话记忆', 'Memory'),
    subtitle: t('会话 + 长期两层 · 记得住上下文', 'Session + long-term · remembers across chats'),
    code: `> 我项目用 Spring Boot，部署在 K8s
[Agent] 已调用 save_memory

# 重启后，新的会话
> 帮我看看选什么数据库合适
[ReAct 1] think -> recall_memory("数据库")
OryxOS: 你的项目用 Spring Boot + K8s，推荐…`,
  },
  {
    icon: '🧩',
    title: t('工具体系', 'Tool System'),
    subtitle: t('SKILL.md + MCP 零代码扩展', 'SKILL.md + MCP, zero-code extension'),
    code: `# .oryxos/mcp_servers.yaml
servers:
  - name: github-mcp
    transport: stdio
    command: npx github-mcp-server

# .oryxos/skills/daily-pr-digest.md
review 昨天的 PR，把结论推送到 Slack`,
  },
  {
    icon: '🌐',
    title: t('Web Service', 'Web Service'),
    subtitle: t('REST API 对外暴露 · 任何语言可集成', 'REST API · any language can integrate'),
    code: `curl -X POST localhost:8080/api/v1/sessions
curl -X POST localhost:8080/api/v1/sessions/{id}/messages \\
  -H "Content-Type: application/json" \\
  -d '{"message": "总结今天的错误日志"}'`,
  },
])

const scenarios = computed(() => [
  {
    num: '01',
    title: t('运维助手', 'Ops Assistant'),
    desc: t(
      '凌晨告警自动分诊，查日志、交叉比对历史故障、自愈重启，在企业微信里汇报"已自愈"。 Engineers 早晨起来看记录就行。',
      'Night alerts get triaged automatically — logs checked, known issues matched, service healed, report posted to IM before morning.'
    ),
  },
  {
    num: '02',
    title: t('知识管理助手', 'Knowledge Assistant'),
    desc: t(
      '法务团队的知识检索 Agent：合同模板、法规、历史案例，回答标注引用来源，满足合规追溯要求。',
      'Legal knowledge agent over contracts, regulations and past cases — every answer traceable to its source.'
    ),
  },
  {
    num: '03',
    title: t('销售助手', 'Sales Assistant'),
    desc: t(
      '拜访前自动拉 CRM 历史交易、查最新工商信息、提取关键决策人，综合输出一份客户简报。',
      'Before a visit: CRM history, registry data and key contacts pulled together into one briefing.'
    ),
  },
  {
    num: '04',
    title: t('查天气，推荐穿搭', 'Weather & outfit demo'),
    desc: t(
      '验收 Demo 一：CLI 多轮对话，Agent 通过 ReAct 循环自主调用 HTTP 工具查天气并给出建议。',
      'Acceptance demo 1: multi-turn CLI chat where the agent calls an HTTP tool via its ReAct loop.'
    ),
  },
  {
    num: '05',
    title: t('跨对话记住偏好', 'Remembers your preferences'),
    desc: t(
      '验收 Demo 二：告诉它你的技术栈，重启后新会话依然记得，不再重复解释。',
      'Acceptance demo 2: tell it your stack once — even after a restart, no need to explain again.'
    ),
  },
  {
    num: '06',
    title: t('零代码 PR 日报', 'Zero-code PR digest'),
    desc: t(
      '验收 Demo 三：一份 SKILL.md + 社区现成 MCP server，不写一行代码上线新场景。',
      'Acceptance demo 3: one SKILL.md plus an off-the-shelf MCP server — new capability, zero code.'
    ),
  },
  {
    num: '07',
    title: t('嵌入业务系统', 'Embed into your systems'),
    desc: t(
      '验收 Demo 四/五：外部系统通过 REST 完整走完创建会话、发消息、查历史、归档，多端点协同。',
      'Acceptance demos 4/5: full session lifecycle over REST, multiple endpoints working together.'
    ),
  },
  {
    num: '08',
    title: t('多 Agent 并存', 'Multi-Agent on one base'),
    desc: t(
      '同一实例上，多个不同 Profile 的 Agent 同时服务不同团队，共享渠道、模型、记忆与审计。',
      'Agents with different profiles serve different teams on one instance, sharing channels, models, memory and audit.'
    ),
  },
])

const protoGroups = computed(() => [
  {
    label: t('会话管理', 'Session Management'),
    rows: [
      { subject: 'POST /api/v1/sessions', desc: t('创建会话', 'Create a session') },
      { subject: 'POST /api/v1/sessions/{id}/messages', desc: t('发送消息，触发 ReAct 循环', 'Send a message, triggers the ReAct loop') },
      { subject: 'GET /api/v1/sessions/{id}', desc: t('查询会话历史', 'Get session history') },
      { subject: 'DELETE /api/v1/sessions/{id}', desc: t('归档会话', 'Archive a session') },
    ],
  },
  {
    label: t('Agent 调用与信息', 'Agent Invocation & Info'),
    rows: [
      { subject: 'POST /api/v1/agents/{name}/invoke', desc: t('无状态调用一次 Agent', 'Stateless one-shot invocation') },
      { subject: 'GET /api/v1/profiles', desc: t('列出可用 Agent（Profile）', 'List available Agent profiles') },
      { subject: 'GET /api/v1/memory', desc: t('查询长期记忆', 'Read long-term memory') },
      { subject: 'GET /api/v1/tools', desc: t('列出已注册工具', 'List registered tools') },
    ],
  },
  {
    label: t('系统状态', 'System'),
    rows: [
      { subject: 'GET /api/v1/health', desc: t('健康检查', 'Health check') },
      { subject: 'GET /api/v1/info', desc: t('运行信息与 Provider 状态', 'Runtime info and provider status') },
    ],
  },
])
</script>

<template>
  <div class="oryx-page">
    <!-- ── HERO ── -->
    <section class="oryx-hero">
      <div class="oryx-hero-inner">
        <div class="oryx-badge">
          <span class="oryx-badge-dot"></span>
          {{ t('Agent OS 运行时内核 · 私有部署 · 可审计', 'Agent OS runtime kernel · self-hosted · auditable') }}
        </div>

        <h1 class="oryx-title"><span class="oryx-title-name">OryxOS</span></h1>

        <p class="oryx-title-sub">{{ t('Java 实现的开源 Agent OS', 'The open-source Agent OS, built in Java') }}</p>

        <p class="oryx-hero-desc">
          {{
            t(
              '一份配置定义一个 Agent，一个底座运行一群 Agent。像跑进程一样跑 Agent：私有部署，数据不出域，像管理进程一样被管理、被协同。',
              'One config defines an Agent; one base runs a fleet of them. Agents run like processes — self-hosted, data never leaves your domain, managed and coordinated on one runtime.'
            )
          }}
        </p>

        <div class="oryx-hero-actions">
          <a class="oryx-btn-primary" :href="withBase(t('/zh/docs/quick-start', '/docs/quick-start'))">
            {{ t('快速开始', 'Get Started') }} →
          </a>
          <a class="oryx-btn-ghost" :href="withBase(t('/zh/docs/architecture', '/docs/architecture'))">
            {{ t('架构总览', 'Architecture') }}
          </a>
          <a class="oryx-btn-ghost" href="https://github.com/kissyoudyb/orysos" target="_blank" rel="noopener">
            GitHub
          </a>
        </div>

        <div class="oryx-hero-note">
          JDK 21 · Spring Boot 3.x · Spring AI Alibaba · MCP · SKILL.md · REST API
        </div>
      </div>
    </section>

    <!-- ── PROBLEM ── -->
    <section class="oryx-section">
      <div class="oryx-section-inner">
        <div class="oryx-problem">
          <div class="oryx-problem-text">
            <h2 class="oryx-section-title">{{ t('两个核心问题', 'Two Foundational Problems') }}</h2>
            <p>{{ t('任何企业想把 Agent 真正用起来，都会撞上同样两个问题。', 'Every enterprise hitting production with Agents runs into the same two problems.') }}</p>
            <p class="oryx-problem-item">
              <strong>{{ t('① Agent 怎么可靠地跑起来？', '① How do Agents run reliably?') }}</strong>
              {{ t('上下文、工具、隔离、审计——瓶颈不在模型，在运行环境。', 'Context, tools, isolation, audit — the bottleneck is not the model, it is the runtime.') }}
            </p>
            <p class="oryx-problem-item">
              <strong>{{ t('② 怎么做到私有可控？', '② How do you keep it private and controllable?') }}</strong>
              {{ t('核心业务的数据不能出企业，系统必须可审计、可纳管、不锁生态。', 'Core data cannot leave the enterprise. The system must be auditable, governable, and cloud-neutral.') }}
            </p>
            <p class="oryx-solution-line">
              {{
                t(
                  'OryxOS 用一个 Java 原生的 Agent OS 运行时内核同时回答这两个问题。',
                  'OryxOS answers both with a single Java-native Agent OS runtime kernel.'
                )
              }}
            </p>
          </div>
          <div class="oryx-problem-compare">
            <div class="oryx-compare-item oryx-compare-bad">
              <div class="oryx-compare-label">{{ t('今天的做法', 'Today') }}</div>
              <div class="oryx-compare-rows">
                <div class="oryx-compare-row"><span class="oryx-compare-icon">✗</span><span>{{ t('Node.js / Python 方案与企业 Java 体系割裂', 'Node.js / Python stacks clash with enterprise Java') }}</span></div>
                <div class="oryx-compare-row"><span class="oryx-compare-icon">✗</span><span>{{ t('SaaS / 托管平台锁定云生态，数据出域', 'SaaS / managed platforms lock you into a cloud, data leaves the domain') }}</span></div>
                <div class="oryx-compare-row"><span class="oryx-compare-icon">✗</span><span>{{ t('安全治理是事后补丁，过不了合规审查', 'Security is an afterthought — fails compliance review') }}</span></div>
                <div class="oryx-compare-row"><span class="oryx-compare-icon">✗</span><span>{{ t('每个 Agent 重复造一遍运行环境的轮子', 'Every Agent rebuilds the same runtime plumbing') }}</span></div>
              </div>
            </div>
            <div class="oryx-compare-item oryx-compare-good">
              <div class="oryx-compare-label">OryxOS</div>
              <div class="oryx-compare-rows">
                <div class="oryx-compare-row"><span class="oryx-compare-icon oryx-icon-ok">✓</span><span>{{ t('Java 原生，融入企业现有 IT 与运维体系', 'Java-native — fits existing enterprise IT and ops') }}</span></div>
                <div class="oryx-compare-row"><span class="oryx-compare-icon oryx-icon-ok">✓</span><span>{{ t('私有部署，数据不出域，不锁任何云', 'Self-hosted, data stays in-domain, no cloud lock-in') }}</span></div>
                <div class="oryx-compare-row"><span class="oryx-compare-icon oryx-icon-ok">✓</span><span>{{ t('白名单沙箱 + 全链路审计，安全是地基', 'Whitelist sandbox + full-chain audit, security by foundation') }}</span></div>
                <div class="oryx-compare-row"><span class="oryx-compare-icon oryx-icon-ok">✓</span><span>{{ t('一份 Profile 配置定义一个 Agent', 'One Profile config defines an Agent') }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FLOW DIAGRAM ── -->
    <section class="oryx-section oryx-flow-section">
      <div class="oryx-section-inner">
        <img :src="withBase('/architecture.svg')" alt="OryxOS architecture" class="oryx-flow-img" />
      </div>
    </section>

    <!-- ── CAPABILITIES ── -->
    <section class="oryx-section oryx-primitives-section">
      <div class="oryx-section-inner">
        <div class="oryx-section-header">
          <div class="oryx-section-tag">{{ t('五大核心能力', 'Five Core Capabilities') }}</div>
          <h2 class="oryx-section-title">{{ t('让单个 Agent 跑得好的全部地基', 'Everything an Agent needs to run well') }}</h2>
        </div>
        <div class="oryx-primitives">
          <div v-for="p in capabilities" :key="p.title" class="oryx-primitive">
            <div class="oryx-primitive-header">
              <span class="oryx-primitive-icon">{{ p.icon }}</span>
              <div>
                <h3 class="oryx-primitive-title">{{ p.title }}</h3>
                <p class="oryx-primitive-subtitle">{{ p.subtitle }}</p>
              </div>
            </div>
            <pre class="oryx-code"><code>{{ p.code }}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SCENARIOS ── -->
    <section class="oryx-section">
      <div class="oryx-section-inner">
        <div class="oryx-section-header">
          <div class="oryx-section-tag">{{ t('真实场景', 'Real Scenarios') }}</div>
          <h2 class="oryx-section-title">{{ t('八个真实使用场景', 'Eight real-world use cases') }}</h2>
        </div>
        <div class="oryx-scenarios">
          <div v-for="s in scenarios" :key="s.num" class="oryx-scenario">
            <div class="oryx-scenario-num">{{ s.num }}</div>
            <div>
              <h3 class="oryx-scenario-title">{{ s.title }}</h3>
              <p class="oryx-scenario-desc">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── INTEGRATION ── -->
    <section class="oryx-section oryx-sdk-section">
      <div class="oryx-section-inner">
        <div class="oryx-section-header">
          <div class="oryx-section-tag">{{ t('接入方式', 'Integration') }}</div>
          <h2 class="oryx-section-title">{{ t('三种接入方式，按需选择', 'Three ways in — pick what fits') }}</h2>
        </div>
        <div class="oryx-sdk-cards">
          <div class="oryx-sdk-card">
            <div class="oryx-sdk-card-icon">🔌</div>
            <h3 class="oryx-sdk-card-title">{{ t('REST API', 'REST API') }}</h3>
            <p class="oryx-sdk-card-desc">
              {{
                t(
                  '所有能力通过 REST API 对外暴露。任何能发 HTTP 请求的语言都能接入，不用关心内部实现。',
                  'Every capability is exposed over REST. Any language that can send an HTTP request can integrate — no internals required.'
                )
              }}
            </p>
            <div class="oryx-langs">
              <span v-for="l in ['Java', 'Python', 'Go', 'JavaScript', 'Rust', 'C#', 'Shell']" :key="l" class="oryx-lang">{{ l }}</span>
            </div>
          </div>
          <div class="oryx-sdk-card oryx-sdk-card-featured">
            <div class="oryx-sdk-card-icon">📦</div>
            <h3 class="oryx-sdk-card-title">oryxos CLI</h3>
            <p class="oryx-sdk-card-desc">
              {{
                t(
                  '单可执行 JAR，12 个子命令覆盖初始化、交互、服务和守护进程四种模式，装好就跑。',
                  'A single executable JAR with 12 subcommands covering init, chat, serve and gateway modes.'
                )
              }}
            </p>
            <div class="oryx-sdk-installs">
              <code>java -jar oryxos-boot.jar init</code>
              <code>java -jar oryxos-boot.jar chat</code>
              <code>java -jar oryxos-boot.jar serve</code>
            </div>
          </div>
          <div class="oryx-sdk-card">
            <div class="oryx-sdk-card-icon">🧩</div>
            <h3 class="oryx-sdk-card-title">{{ t('零代码扩展', 'Zero-code Extension') }}</h3>
            <p class="oryx-sdk-card-desc">
              {{
                t(
                  '主推的扩展方式：写一份 SKILL.md 描述任务，复用社区现成 MCP server，纯 markdown 就能上线新场景。',
                  'The recommended path: one SKILL.md describing the task plus off-the-shelf MCP servers — ship new capabilities in pure markdown.'
                )
              }}
            </p>
            <div class="oryx-sdk-badges">
              <span class="oryx-sdk-badge">SKILL.md</span>
              <span class="oryx-sdk-badge">MCP Server</span>
              <span class="oryx-sdk-badge">A2A · {{ t('规划', 'roadmap') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── PROTOCOL ── -->
    <section class="oryx-section">
      <div class="oryx-section-inner">
        <div class="oryx-section-header">
          <div class="oryx-section-tag">{{ t('API 总览', 'API') }}</div>
          <h2 class="oryx-section-title">{{ t('核心 10 个 REST 端点', 'The core 10 REST endpoints') }}</h2>
          <p class="oryx-section-desc">
            {{ t('业务系统集成 OryxOS 的唯一通道，覆盖会话管理、Agent 调用与系统状态。', 'The single integration surface for business systems — sessions, invocation and system status.') }}
          </p>
        </div>
        <div class="oryx-proto-grid">
          <div v-for="g in protoGroups" :key="g.label" class="oryx-proto-group">
            <div class="oryx-proto-group-label">{{ g.label }}</div>
            <div v-for="r in g.rows" :key="r.subject" class="oryx-proto-row">
              <code class="oryx-proto-subject">{{ r.subject }}</code>
              <span class="oryx-proto-desc">{{ r.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="oryx-section oryx-cta-section">
      <div class="oryx-section-inner">
        <div class="oryx-cta">
          <h2 class="oryx-cta-title">{{ t('开始构建', 'Start Building') }}</h2>
          <p class="oryx-cta-desc">{{ t('从源码到第一个能跑的 Agent，五分钟。', 'From source to your first running Agent in five minutes.') }}</p>
          <pre class="oryx-code oryx-cta-code"><code>git clone https://github.com/kissyoudyb/orysos.git
cd orysos && mvn clean package

java -jar oryxos-boot/target/oryxos-boot-*.jar init   # {{ t('初始化工作区', 'initialize the workspace') }}
java -jar oryxos-boot/target/oryxos-boot-*.jar serve  # REST API :8080</code></pre>
          <div class="oryx-cta-links">
            <a class="oryx-btn-primary" :href="withBase(t('/zh/docs/', '/docs/'))">{{ t('阅读文档', 'Read the Docs') }}</a>
            <a class="oryx-btn-ghost" href="https://github.com/kissyoudyb/orysos" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.oryx-page {
  min-height: 100vh;
  background: #ffffff;
  color: #1f2937;
  font-family: inherit;
}

/* ── Hero ── */
.oryx-hero {
  position: relative;
  padding: 100px 24px 80px;
  text-align: center;
  overflow: hidden;
}
.oryx-hero-inner {
  position: relative;
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.oryx-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid var(--oryx-brand-200);
  background: var(--oryx-brand-50);
  color: var(--oryx-brand-700);
  font-size: 12px;
  margin-bottom: 28px;
}
.oryx-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--oryx-brand-500);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.4); }
}
.oryx-title {
  margin: 0 0 12px;
  line-height: 1;
}
.oryx-title-name {
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: clamp(64px, 12vw, 110px);
  font-weight: 700;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #24245c 0%, #5b5bd6 70%, #8888f0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.oryx-title-sub {
  font-size: 18px;
  color: #6b7280;
  margin: 0 0 20px;
}
.oryx-hero-desc {
  font-size: 16px;
  line-height: 1.7;
  color: #4b5563;
  max-width: 600px;
  margin: 0 0 32px;
}
.oryx-hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}
.oryx-btn-primary {
  padding: 11px 28px;
  border-radius: 8px;
  background: var(--oryx-brand-500);
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
}
.oryx-btn-primary:hover {
  background: var(--oryx-brand-600);
  color: #ffffff;
  transform: translateY(-1px);
}
.oryx-btn-ghost {
  padding: 11px 28px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  color: #374151;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}
.oryx-btn-ghost:hover {
  border-color: var(--oryx-brand-400);
  color: var(--oryx-brand-600);
  background: var(--oryx-brand-50);
}
.oryx-hero-note {
  font-size: 12px;
  color: #9ca3af;
}

/* ── Section ── */
.oryx-section { padding: 72px 24px; }
.oryx-section-inner { max-width: 1000px; margin: 0 auto; }
.oryx-section-header { text-align: center; margin-bottom: 48px; }
.oryx-section-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--oryx-brand-600);
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid var(--oryx-brand-200);
  background: var(--oryx-brand-50);
  margin-bottom: 14px;
}
.oryx-section-title {
  font-size: clamp(22px, 4vw, 32px);
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px;
}
.oryx-section-desc {
  font-size: 15px;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ── Problem ── */
.oryx-problem {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}
.oryx-problem-text p { color: #6b7280; line-height: 1.7; margin: 0 0 14px; font-size: 15px; }
.oryx-problem-item strong { color: #1f2937; display: block; margin-bottom: 4px; }
.oryx-solution-line { color: var(--oryx-brand-700) !important; font-weight: 600; }
.oryx-problem-compare { display: flex; flex-direction: column; gap: 16px; }
.oryx-compare-item {
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}
.oryx-compare-bad { background: #fafafa; }
.oryx-compare-good { background: var(--oryx-brand-50); border-color: var(--oryx-brand-200); }
.oryx-compare-label {
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.oryx-compare-good .oryx-compare-label { color: var(--oryx-brand-600); }
.oryx-compare-rows { display: flex; flex-direction: column; gap: 8px; }
.oryx-compare-row { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: #4b5563; line-height: 1.5; }
.oryx-compare-icon { flex-shrink: 0; font-style: normal; color: #b8bec6; font-weight: 700; width: 14px; }
.oryx-icon-ok { color: var(--oryx-brand-600); }

/* ── Flow ── */
.oryx-flow-section { padding: 0 24px 72px; }
.oryx-flow-img {
  width: 100%;
  display: block;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

/* ── Capabilities ── */
.oryx-primitives-section { background: #f9fafb; }
.oryx-primitives { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.oryx-primitive {
  padding: 20px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.2s, box-shadow 0.2s;
  min-width: 0;
  overflow: hidden;
}
.oryx-primitive:hover { border-color: var(--oryx-brand-400); box-shadow: 0 4px 16px rgba(91, 91, 214, 0.1); }
.oryx-primitive-header { display: flex; align-items: flex-start; gap: 12px; }
.oryx-primitive-icon { font-size: 28px; flex-shrink: 0; }
.oryx-primitive-title { font-size: 17px; font-weight: 700; color: #1f2937; margin: 0 0 2px; }
.oryx-primitive-subtitle { font-size: 12px; color: #9ca3af; margin: 0; }
.oryx-code {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 14px 16px;
  font-size: 12px;
  line-height: 1.6;
  color: #1f2937;
  overflow-x: auto;
  margin: 0;
  white-space: pre;
  flex: 1;
}
.oryx-code code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  background: none;
  color: inherit;
}

/* ── Scenarios ── */
.oryx-scenarios { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.oryx-scenario {
  display: flex;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fafafa;
}
.oryx-scenario-num {
  font-size: 28px;
  font-weight: 900;
  color: var(--oryx-brand-200);
  line-height: 1;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
}
.oryx-scenario-title { font-size: 15px; font-weight: 600; color: #1f2937; margin: 0 0 6px; }
.oryx-scenario-desc { font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0; }

/* ── Integration ── */
.oryx-sdk-section { background: #f9fafb; }
.oryx-sdk-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.oryx-sdk-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.oryx-sdk-card-featured { border-color: var(--oryx-brand-400); box-shadow: 0 4px 16px rgba(91, 91, 214, 0.08); }
.oryx-sdk-card-icon { font-size: 28px; }
.oryx-sdk-card-title { font-size: 17px; font-weight: 700; color: #1f2937; margin: 0; }
.oryx-sdk-card-desc { font-size: 14px; color: #6b7280; line-height: 1.6; margin: 0; flex: 1; }
.oryx-langs { display: flex; flex-wrap: wrap; gap: 8px; }
.oryx-lang {
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #374151;
  font-size: 12px;
  font-weight: 600;
}
.oryx-sdk-installs { display: flex; flex-direction: column; gap: 6px; }
.oryx-sdk-installs code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 5px 10px;
  color: #1f2937;
  display: block;
}
.oryx-sdk-badges { display: flex; flex-wrap: wrap; gap: 8px; }
.oryx-sdk-badge {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  background: var(--oryx-brand-50);
  border: 1px solid var(--oryx-brand-200);
  color: var(--oryx-brand-700);
}

/* ── API grid ── */
.oryx-proto-grid { display: flex; flex-direction: column; gap: 28px; }
.oryx-proto-group { display: flex; flex-direction: column; gap: 6px; }
.oryx-proto-group-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--oryx-brand-600);
  margin-bottom: 4px;
}
.oryx-proto-row {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 8px 14px;
  border-radius: 8px;
  background: #fafafa;
  border: 1px solid #e5e7eb;
  flex-wrap: wrap;
}
.oryx-proto-subject {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  color: var(--oryx-brand-700);
  background: var(--oryx-brand-50);
  border: 1px solid var(--oryx-brand-200);
  padding: 2px 8px;
  border-radius: 4px;
  flex-shrink: 0;
  white-space: nowrap;
}
.oryx-proto-desc { font-size: 13px; color: #6b7280; flex: 1; }

/* ── CTA ── */
.oryx-cta-section { background: #f9fafb; }
.oryx-cta { text-align: center; max-width: 680px; margin: 0 auto; }
.oryx-cta-title { font-size: 28px; font-weight: 700; color: #1f2937; margin: 0 0 12px; }
.oryx-cta-desc { font-size: 15px; color: #6b7280; margin: 0 0 24px; }
.oryx-cta-code { text-align: left; margin-bottom: 28px; }
.oryx-cta-links { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .oryx-sdk-cards { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .oryx-hero { padding: 72px 20px 60px; }
  .oryx-problem { grid-template-columns: 1fr; }
  .oryx-primitives { grid-template-columns: 1fr; }
  .oryx-scenarios { grid-template-columns: 1fr; }
  .oryx-section { padding: 48px 20px; }
}
</style>
