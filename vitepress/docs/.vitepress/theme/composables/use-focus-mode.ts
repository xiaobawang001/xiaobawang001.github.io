import { ref, watch } from 'vue'

const STORAGE_KEY = 'blog-focus-mode'

export const focusMode = ref(false)

function readFocusMode(): boolean {
  if (typeof localStorage === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY) === '1'
}

export function applyFocusModeClasses() {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('blog-focus-mode', focusMode.value)
}

export function initFocusModeFromStorage() {
  focusMode.value = readFocusMode()
  applyFocusModeClasses()
}

export function useFocusMode() {
  watch(focusMode, (value) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
    }
    applyFocusModeClasses()
  })

  function toggleFocusMode() {
    focusMode.value = !focusMode.value
  }

  return { focusMode, toggleFocusMode }
}
