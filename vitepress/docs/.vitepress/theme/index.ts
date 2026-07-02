import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'
import DocOutlineItem from './components/DocOutlineItem.vue'
import SiteMap from './components/SiteMap.vue'
import { applyBackgroundClasses, bgMode, clampOpacity, uiOpacity } from './composables/use-background'
import { initFontSizeFromStorage } from './composables/use-font-size'
import { initContentWidthFromStorage } from './composables/use-content-width'
import { initFocusModeFromStorage } from './composables/use-focus-mode'
import { initSidebarPersistFromStorage } from './composables/use-sidebar-persist'
import './custom.css'

function initBackgroundFromStorage() {
  if (typeof localStorage === 'undefined') return
  const savedMode = localStorage.getItem('blog-bg-mode')
  if (savedMode === 'static' || savedMode === 'dynamic' || savedMode === 'none') {
    bgMode.value = savedMode
  }
  if (bgMode.value === 'none') {
    uiOpacity.value = 1
    return
  }
  const isDark =
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
  const savedOpacity = Number.parseFloat(localStorage.getItem('blog-ui-opacity') ?? '1')
  if (Number.isFinite(savedOpacity)) {
    uiOpacity.value = clampOpacity(savedOpacity, isDark)
  }
}

export default {
  ...DefaultTheme,
  Layout,
  NotFound,
  enhanceApp({ app }) {
    app.component('VPDocOutlineItem', DocOutlineItem)
    app.component('SiteMap', SiteMap)
    initBackgroundFromStorage()
    initFontSizeFromStorage()
    initContentWidthFromStorage()
    initFocusModeFromStorage()
    initSidebarPersistFromStorage()
    if (typeof document !== 'undefined') applyBackgroundClasses()
  },
}
