/// <reference types="vite/client" />

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare const __BUILD_TIME__: string

declare module 'virtual:blog-meta' {
  export interface BlogPageMeta {
    path: string
    title: string
    tags: string[]
    lastUpdated?: number
    relativePath: string
  }

  export const pages: BlogPageMeta[]
  export const tagIndex: Record<string, BlogPageMeta[]>
  export function getPageMeta(path: string): BlogPageMeta | undefined
}
