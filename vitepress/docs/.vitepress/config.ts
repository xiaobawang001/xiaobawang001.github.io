import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

const GITCODE_USER = 'xiaobawang001'
const GITCODE_REPO = 'blog'

const vitePressConfig = defineConfig({
  title: '我的笔记',
  description: '个人 Markdown 笔记站点 — 语雀风格阅读体验',
  lang: 'zh-CN',
  base: `/${GITCODE_REPO}/`,
  head: [
    ['meta', { name: 'theme-color', content: '#00b96b' }],
  ],
  themeConfig: {
    logo: undefined,
    nav: [
      { text: '首页', link: '/' },
      { text: '发布指南', link: '/guide/publish' },
      { text: 'GitCode', link: `https://gitcode.com/${GITCODE_USER}` },
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
