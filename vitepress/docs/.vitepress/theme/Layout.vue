<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import siteAvatar from '../../../static/navigatebar/头像.jpg'
import NavFontSizeControl from './components/NavFontSizeControl.vue'
import NavContentWidthControl from './components/NavContentWidthControl.vue'
import NavFocusModeControl from './components/NavFocusModeControl.vue'
import SidebarToolbar from './components/SidebarToolbar.vue'
import OutlineToolbar from './components/OutlineToolbar.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import BackToTop from './components/BackToTop.vue'
import ImageZoom from './components/ImageZoom.vue'
import RelatedArticles from './components/RelatedArticles.vue'
import DocTags from './components/DocTags.vue'
import PlantumlRender from './components/PlantumlRender.vue'
import GraphvizRender from './components/GraphvizRender.vue'
import InPageSearch from './components/InPageSearch.vue'
import MermaidRender from './components/MermaidRender.vue'
import SiteFooter from './components/SiteFooter.vue'
import { clearForcedFolderCollapse } from './composables/blog-ui'
import { setupHeadingAnchorShare } from './composables/heading-anchor-share'
import { setupCodeBlockEnhance } from './composables/code-block-enhance'
import { setupOutlineNavigation } from './composables/outline-nav'
import { setupSidebarLayout } from './composables/sidebar-layout'
import { setupSidebarPersist } from './composables/use-sidebar-persist'
import { applySidebarFolderIcons } from './composables/sidebar-icons'

const { Layout: DefaultLayout } = DefaultTheme
const route = useRoute()
const { frontmatter, theme } = useData()
const isHome = computed(() => frontmatter.value.layout === 'home')

let removeSidebarNavClick: (() => void) | null = null
let removeOutlineNavigation: (() => void) | null = null
let removeSidebarPersist: (() => void) | null = null
let removeHeadingAnchorShare: (() => void) | null = null

function bindSidebarNavClick() {
  const onSidebarNavClick = (e: MouseEvent) => {
    const target = e.target as Element
    if (target.closest('.SidebarToolbar')) return
    if (target.closest('.VPSidebarItem')) clearForcedFolderCollapse()
  }

  const nav = document.getElementById('VPSidebarNav')
  if (!nav) return

  removeSidebarNavClick?.()
  nav.addEventListener('click', onSidebarNavClick, true)
  removeSidebarNavClick = () => nav.removeEventListener('click', onSidebarNavClick, true)
}

function refreshDocEnhancements() {
  nextTick(() => {
    setupSidebarLayout()
    bindSidebarNavClick()
    removeSidebarPersist?.()
    removeSidebarPersist = setupSidebarPersist()
    removeHeadingAnchorShare?.()
    removeHeadingAnchorShare = setupHeadingAnchorShare()
    setupCodeBlockEnhance()
    applySidebarFolderIcons(theme.value.sidebar)
  })
}

onMounted(() => {
  refreshDocEnhancements()
  removeOutlineNavigation = setupOutlineNavigation()
})

watch(() => route.path, refreshDocEnhancements)

onUnmounted(() => {
  removeSidebarNavClick?.()
  removeOutlineNavigation?.()
  removeSidebarPersist?.()
  removeHeadingAnchorShare?.()
})
</script>

<template>
  <ReadingProgress />
  <BackToTop />
  <ImageZoom />
  <InPageSearch />
  <PlantumlRender />
  <GraphvizRender />
  <MermaidRender />
  <DefaultLayout>
    <template #nav-bar-title-before>
      <img class="site-avatar" :src="siteAvatar" alt="" width="40" height="40" />
    </template>
    <template #nav-bar-content-after>
      <NavFontSizeControl />
      <NavContentWidthControl />
      <NavFocusModeControl />
    </template>
    <template #doc-before>
      <DocTags />
    </template>
    <template #doc-after>
      <RelatedArticles />
    </template>
    <template #sidebar-nav-before>
      <SidebarToolbar />
    </template>
    <template #aside-outline-before>
      <OutlineToolbar />
    </template>
    <template #layout-bottom>
      <div v-if="isHome" class="SiteFooterWrap">
        <SiteFooter />
      </div>
    </template>
  </DefaultLayout>
</template>
