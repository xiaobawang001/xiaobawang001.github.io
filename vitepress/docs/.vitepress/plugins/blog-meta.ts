import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import matter from 'gray-matter'
import type { Plugin } from 'vite'

export const VIRTUAL_MODULE_ID = 'virtual:blog-meta'
const RESOLVED_VIRTUAL_MODULE_ID = '\0virtual:blog-meta'

export interface BlogPageMeta {
  path: string
  title: string
  tags: string[]
  lastUpdated?: number
  relativePath: string
}

const EXCLUDED_FILES = new Set(['index.md', 'sitemap.md'])

function walkMarkdownFiles(dir: string): string[] {
  const results: string[] = []
  if (!fs.existsSync(dir)) return results

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...walkMarkdownFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath)
    }
  }
  return results
}

function fileToRoute(relativePath: string): string {
  const withoutExt = relativePath.replace(/\.md$/, '').replace(/\\/g, '/')
  if (withoutExt === 'index') return '/'
  if (withoutExt.endsWith('/index')) {
    return `/${withoutExt.slice(0, -'/index'.length)}`
  }
  return `/${withoutExt}`
}

function normalizeTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  return [...new Set(raw.map((tag) => String(tag).trim()).filter(Boolean))]
}

function getLastUpdated(filePath: string): number | undefined {
  try {
    const output = execSync(`git log -1 --format=%ct -- "${filePath}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    const seconds = Number.parseInt(output, 10)
    if (Number.isFinite(seconds)) return seconds * 1000
  } catch {
    // fallback to mtime
  }

  try {
    return fs.statSync(filePath).mtimeMs
  } catch {
    return undefined
  }
}

function extractTitle(data: Record<string, unknown>, content: string, fallback: string): string {
  if (typeof data.title === 'string' && data.title.trim()) return data.title.trim()
  const match = content.match(/^#\s+(.+)$/m)
  if (match?.[1]) return match[1].trim()
  return fallback
}

function isIndexPage(relativePath: string) {
  return relativePath === 'index.md' || relativePath.endsWith('/index.md')
}

export function collectBlogMeta(docsRoot: string): {
  pages: BlogPageMeta[]
  tagIndex: Record<string, BlogPageMeta[]>
} {
  const files = walkMarkdownFiles(docsRoot)
  const pages: BlogPageMeta[] = []

  for (const filePath of files) {
    const relativePath = path.relative(docsRoot, filePath).replace(/\\/g, '/')
    if (EXCLUDED_FILES.has(relativePath)) continue
    if (isIndexPage(relativePath)) continue
    if (relativePath.startsWith('.vitepress/')) continue

    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    if (data.layout === 'home') continue

    const routePath = fileToRoute(relativePath)
    const fallbackTitle = path.basename(relativePath, '.md')
    const title = extractTitle(data, content, fallbackTitle)

    pages.push({
      path: routePath,
      title,
      tags: normalizeTags(data.tags),
      lastUpdated: getLastUpdated(filePath),
      relativePath,
    })
  }

  pages.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))

  const tagIndex: Record<string, BlogPageMeta[]> = {}
  for (const page of pages) {
    for (const tag of page.tags) {
      if (!tagIndex[tag]) tagIndex[tag] = []
      tagIndex[tag].push(page)
    }
  }

  for (const tag of Object.keys(tagIndex)) {
    tagIndex[tag].sort((a, b) => (b.lastUpdated ?? 0) - (a.lastUpdated ?? 0))
  }

  return { pages, tagIndex }
}

function serializeMetaModule(pages: BlogPageMeta[], tagIndex: Record<string, BlogPageMeta[]>) {
  return `export const pages = ${JSON.stringify(pages)};
export const tagIndex = ${JSON.stringify(tagIndex)};
export function getPageMeta(path) {
  const normalized = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
  return pages.find((page) => page.path === normalized || page.path === path || page.path + '/' === path);
}
`
}

export function blogMetaPlugin(docsRoot: string): Plugin {
  let root = docsRoot

  return {
    name: 'blog-meta',
    configResolved(config) {
      if (!path.isAbsolute(root)) {
        root = path.resolve(config.root, root)
      }
    },
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) return null
      const { pages, tagIndex } = collectBlogMeta(root)
      return serializeMetaModule(pages, tagIndex)
    },
    handleHotUpdate({ server, file }) {
      if (!file.endsWith('.md')) return
      const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
      if (mod) {
        server.reloadModule(mod)
      }
    },
  }
}
