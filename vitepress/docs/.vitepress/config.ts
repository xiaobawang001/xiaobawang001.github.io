import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'
import { blogMetaPlugin } from './plugins/blog-meta'
import { markdownItMermaid } from './markdown/mermaid'
import { markdownItPlantuml } from './markdown/plantuml'
import { markdownItGraphviz } from './markdown/graphviz'
import { cjkAwareTokenize } from './utils/search-tokenize'

const GITHUB_USER = 'xiaobawang001'
const SITE_REPO = 'blog'

const vitePressConfig = defineConfig({
  title: 'xiaobawang001',
  description: '个人 Markdown 笔记站点 — 语雀风格阅读体验',
  lang: 'zh-CN',
  base: `/${SITE_REPO}/`,
  ignoreDeadLinks: [/^\/admin\/?$/],
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    config(md) {
      md.use(markdownItMermaid)
      md.use(markdownItPlantuml)
      md.use(markdownItGraphviz)
    },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#00b96b' }],
  ],
  vite: {
    plugins: [blogMetaPlugin('')],
    define: {
      __BUILD_TIME__: JSON.stringify(
        new Date().toLocaleString('zh-CN', { hour12: false }),
      ),
    },
  },
  themeConfig: {
    siteTitle: 'xiaobawang001',
    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchLabel: '外观模式',
    nav: [
      { text: '首页', link: '/' },
      { text: '发布指南', link: '/guide/publish' },
      { text: 'GitHub', link: `https://github.com/${GITHUB_USER}/${SITE_REPO}` },
    ],
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            tokenize: cjkAwareTokenize,
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
          },
        },
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除搜索条件',
                backButtonTitle: '返回',
                noResultsText: '无搜索结果',
                footer: {
                  selectKey: '选择',
                  navigateKey: '切换',
                  closeKey: '关闭',
                },
              },
            },
          },
        },
      },
    },
    editLink: {
      pattern: `https://github.com/${GITHUB_USER}/${SITE_REPO}/edit/master/vitepress/docs/:path`,
      text: '在 GitHub 上编辑',
    },
    outline: {
      label: '文章目录',
      level: [2, 3, 4],
    },
    aside: true,
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },
    notFound: {
      code: '404',
      title: '页面不存在',
      quote: '你访问的链接可能已失效，或页面已被移动。',
      linkText: '返回首页',
      linkLabel: '返回首页',
    },
  },
})

export default withSidebar(vitePressConfig, {
  documentRootPath: '/docs',
  collapsed: false,
  collapseDepth: 2,
  useTitleFromFrontmatter: true,
  useTitleFromFileHeading: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: false,
  sortMenusByFrontmatterOrder: true,
  hyphenToSpace: true,
  includeRootIndexFile: false,
  excludeByGlobPattern: ['guide/publish.md'],
})
