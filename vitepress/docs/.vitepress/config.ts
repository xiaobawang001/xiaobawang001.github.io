import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

const GITHUB_USER = 'xiaobawang001'
const SITE_REPO = 'blog'

const vitePressConfig = defineConfig({
  title: 'xiaobawang001',
  description: '个人 Markdown 笔记站点 — 语雀风格阅读体验',
  lang: 'zh-CN',
  base: `/${SITE_REPO}/`,
  head: [
    ['meta', { name: 'theme-color', content: '#00b96b' }],
  ],
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
