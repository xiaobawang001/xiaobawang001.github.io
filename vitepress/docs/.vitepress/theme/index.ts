import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'
import DocOutlineItem from './components/DocOutlineItem.vue'
import SiteMap from './components/SiteMap.vue'
import { initFontSizeFromStorage } from './composables/use-font-size'
import { initContentWidthFromStorage } from './composables/use-content-width'
import { initFocusModeFromStorage } from './composables/use-focus-mode'
import { initSidebarPersistFromStorage } from './composables/use-sidebar-persist'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout,
  NotFound,
  enhanceApp({ app }) {
    app.component('VPDocOutlineItem', DocOutlineItem)
    app.component('SiteMap', SiteMap)
    initFontSizeFromStorage()
    initContentWidthFromStorage()
    initFocusModeFromStorage()
    initSidebarPersistFromStorage()
  },
}
