import { ref, watch } from 'vue'

const STORAGE_KEY = 'blog-content-width'
const WIDTHS = ['720px', '960px', '1100px'] as const
const LABELS = ['窄', '中', '宽'] as const

export const contentWidthIndex = ref(1)

function readIndex(): number {
  if (typeof localStorage === 'undefined') return 1
  const saved = Number.parseInt(localStorage.getItem(STORAGE_KEY) ?? '1', 10)
  return saved >= 0 && saved < WIDTHS.length ? saved : 1
}

export function applyContentWidthClasses() {
  if (typeof document === 'undefined') return
  const width = WIDTHS[contentWidthIndex.value] ?? WIDTHS[1]
  document.documentElement.style.setProperty('--blog-content-max-width', width)
  document.documentElement.dataset.blogContentWidth = LABELS[contentWidthIndex.value] ?? '中'
}

export function initContentWidthFromStorage() {
  contentWidthIndex.value = readIndex()
  applyContentWidthClasses()
}

export function useContentWidth() {
  watch(contentWidthIndex, () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, String(contentWidthIndex.value))
    }
    applyContentWidthClasses()
  })

  function cycleContentWidth() {
    contentWidthIndex.value = (contentWidthIndex.value + 1) % WIDTHS.length
  }

  const contentWidthLabel = () => LABELS[contentWidthIndex.value] ?? '中'

  return { contentWidthIndex, cycleContentWidth, contentWidthLabel }
}
