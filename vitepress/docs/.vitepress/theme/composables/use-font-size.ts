import { ref, watch } from 'vue'

const STORAGE_KEY = 'blog-font-size'
const LEVELS = [14, 16, 18] as const
const LABELS = ['小', '中', '大'] as const

export const fontSizeIndex = ref(1)

function readIndex(): number {
  if (typeof localStorage === 'undefined') return 1
  const saved = Number.parseInt(localStorage.getItem(STORAGE_KEY) ?? '1', 10)
  return saved >= 0 && saved < LEVELS.length ? saved : 1
}

export function applyFontSizeClasses() {
  if (typeof document === 'undefined') return
  const size = LEVELS[fontSizeIndex.value] ?? 16
  document.documentElement.style.setProperty('--blog-doc-font-size', `${size}px`)
  document.documentElement.dataset.blogFontSize = LABELS[fontSizeIndex.value] ?? '中'
}

export function initFontSizeFromStorage() {
  fontSizeIndex.value = readIndex()
  applyFontSizeClasses()
}

export function useFontSize() {
  watch(fontSizeIndex, () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, String(fontSizeIndex.value))
    }
    applyFontSizeClasses()
  })

  function cycleFontSize() {
    fontSizeIndex.value = (fontSizeIndex.value + 1) % LEVELS.length
  }

  const fontSizeLabel = () => LABELS[fontSizeIndex.value] ?? '中'

  return { fontSizeIndex, cycleFontSize, fontSizeLabel }
}
