import { defineConfig } from 'vitepress'

// GitHub Pages 项目站点：https://kissyoudyb.github.io/orysos/
// 注意：GitHub Pages 不支持 cleanUrls（无 .html 的链接会 404），保持默认 false。
export default defineConfig({
  title: 'OryxOS',
  titleTemplate: ':title — OryxOS',
  description: 'OryxOS 是 Java 实现的开源 Agent OS 运行时内核——私有部署、可审计、配置即 Agent。',
  base: '/orysos/',
  appearance: 'force-light',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/orysos/favicon.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap'
      }
    ],
    ['meta', { name: 'author', content: 'oryx-labs' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'OryxOS, Agent OS, AI Agent, Java, Spring Boot, MCP, A2A, SKILL.md, 私有部署, Agent runtime, 可审计'
      }
    ],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'OryxOS' }],
    ['meta', { property: 'og:title', content: 'OryxOS — Java 实现的开源 Agent OS' }],
    [
      'meta',
      {
        property: 'og:description',
        content: '一份配置定义一个 Agent，一个底座运行一群 Agent。私有部署，数据不出域。'
      }
    ],
    ['meta', { property: 'og:url', content: 'https://kissyoudyb.github.io/orysos/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Docs', link: '/docs/what' },
          { text: 'GitHub', link: 'https://github.com/kissyoudyb/orysos' }
        ],
        sidebar: {
          '/docs/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'What is OryxOS', link: '/docs/what' },
                { text: 'Quick Start', link: '/docs/quick-start' }
              ]
            },
            {
              text: 'Core',
              items: [
                { text: 'Architecture', link: '/docs/architecture' },
                { text: 'Five Capabilities', link: '/docs/capabilities' },
                { text: 'REST API', link: '/docs/rest-api' }
              ]
            },
            {
              text: 'Reference',
              items: [
                { text: 'Scenarios', link: '/docs/scenarios' },
                { text: 'Roadmap', link: '/docs/roadmap' },
                { text: 'FAQ', link: '/docs/faq' }
              ]
            }
          ]
        }
      }
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/orysos/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '文档', link: '/zh/docs/what' },
          { text: 'GitHub', link: 'https://github.com/kissyoudyb/orysos' }
        ],
        sidebar: {
          '/zh/docs/': [
            {
              text: '快速开始',
              items: [
                { text: 'OryxOS 是什么', link: '/zh/docs/what' },
                { text: '快速上手', link: '/zh/docs/quick-start' }
              ]
            },
            {
              text: '核心',
              items: [
                { text: '整体架构', link: '/zh/docs/architecture' },
                { text: '五大核心能力', link: '/zh/docs/capabilities' },
                { text: 'REST API', link: '/zh/docs/rest-api' }
              ]
            },
            {
              text: '参考',
              items: [
                { text: '典型场景', link: '/zh/docs/scenarios' },
                { text: '路线图', link: '/zh/docs/roadmap' },
                { text: '常见问题', link: '/zh/docs/faq' }
              ]
            }
          ]
        }
      }
    }
  },

  themeConfig: {
    siteTitle: false,
    logo: '/orysos/logo.svg',
    socialLinks: [{ icon: 'github', link: 'https://github.com/kissyoudyb/orysos' }]
  },

  sitemap: {
    hostname: 'https://kissyoudyb.github.io'
  }
})
