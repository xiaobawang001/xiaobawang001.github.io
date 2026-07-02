import type { BlogPageMeta } from 'virtual:blog-meta'
import { pages } from 'virtual:blog-meta'

function parentPath(path: string) {
  const normalized = path.replace(/\/$/, '')
  const index = normalized.lastIndexOf('/')
  if (index <= 0) return '/'
  return normalized.slice(0, index)
}

function scoreByTags(current: BlogPageMeta, candidate: BlogPageMeta) {
  if (!current.tags.length || !candidate.tags.length) return 0
  const currentSet = new Set(current.tags)
  return candidate.tags.filter((tag) => currentSet.has(tag)).length
}

function getSiblingPages(path: string) {
  const parent = parentPath(path)
  return pages.filter(
    (page) => page.path !== path && !isIndexRoute(page) && parentPath(page.path) === parent,
  )
}

function isIndexPage(relativePath: string) {
  return relativePath === 'index.md' || relativePath.endsWith('/index.md')
}

function isIndexRoute(page: BlogPageMeta) {
  return isIndexPage(page.relativePath)
}

export function getRelatedArticles(path: string, limit = 5): BlogPageMeta[] {
  const normalized = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
  const current = pages.find((page) => page.path === normalized || page.path === path)
  const candidates = pages.filter((page) => !isIndexRoute(page))

  if (!current || isIndexRoute(current)) {
    return candidates.filter((page) => page.path !== path).slice(0, limit)
  }

  const scored = candidates
    .filter((page) => page.path !== current.path)
    .map((page) => ({
      page,
      score: scoreByTags(current, page),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || (b.page.lastUpdated ?? 0) - (a.page.lastUpdated ?? 0))

  if (scored.length >= limit) {
    return scored.slice(0, limit).map((item) => item.page)
  }

  const picked = new Set(scored.map((item) => item.page.path))
  const siblings = getSiblingPages(current.path).filter((page) => !picked.has(page.path))
  for (const page of siblings) {
    scored.push({ page, score: 0 })
    picked.add(page.path)
    if (scored.length >= limit) break
  }

  if (scored.length >= limit) {
    return scored.slice(0, limit).map((item) => item.page)
  }

  const recent = [...candidates]
    .filter((page) => page.path !== current.path && !picked.has(page.path))
    .sort((a, b) => (b.lastUpdated ?? 0) - (a.lastUpdated ?? 0))

  for (const page of recent) {
    scored.push({ page, score: 0 })
    if (scored.length >= limit) break
  }

  return scored.slice(0, limit).map((item) => item.page)
}

export function getTagsForPath(path: string) {
  const normalized = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
  return pages.find((page) => page.path === normalized || page.path === path)?.tags ?? []
}

export { pages }
