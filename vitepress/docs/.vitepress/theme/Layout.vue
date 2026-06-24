<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SidebarToolbar from './components/SidebarToolbar.vue'
import OutlineToolbar from './components/OutlineToolbar.vue'
import SidebarHoverStrip from './components/SidebarHoverStrip.vue'
import OutlineHoverStrip from './components/OutlineHoverStrip.vue'
import {
  applyUiClasses,
  bindOutlineHoverEvents,
  clearForcedFolderCollapse,
  sidebarCollapsed,
  sidebarHover,
  outlinePinned,
  outlineHover,
} from './composables/blog-ui'

const { Layout: DefaultLayout } = DefaultTheme
const route = useRoute()

let unbindOutline: (() => void) | undefined

onMounted(() => {
  applyUiClasses()
  unbindOutline = bindOutlineHoverEvents()

  const onSidebarEnter = () => {
    if (sidebarCollapsed.value) sidebarHover.value = true
  }
  const onSidebarLeave = () => {
    sidebarHover.value = false
  }

  const onSidebarNavClick = (e: MouseEvent) => {
    const target = e.target as Element
    if (target.closest('.SidebarToolbar')) return
    if (target.closest('.VPSidebarItem')) clearForcedFolderCollapse()
  }

  document.querySelector('.VPSidebar')?.addEventListener('mouseenter', onSidebarEnter)
  document.querySelector('.VPSidebar')?.addEventListener('mouseleave', onSidebarLeave)
  document.getElementById('VPSidebarNav')?.addEventListener('click', onSidebarNavClick, true)

  onUnmounted(() => {
    unbindOutline?.()
    document.querySelector('.VPSidebar')?.removeEventListener('mouseenter', onSidebarEnter)
    document.querySelector('.VPSidebar')?.removeEventListener('mouseleave', onSidebarLeave)
    document.getElementById('VPSidebarNav')?.removeEventListener('click', onSidebarNavClick, true)
  })
})

watch(() => route.path, () => {
  if (!outlinePinned.value) outlineHover.value = false
  applyUiClasses()
})
</script>

<template>
  <DefaultLayout>
    <template #sidebar-nav-before>
      <SidebarToolbar />
    </template>
    <template #aside-outline-before>
      <OutlineToolbar />
    </template>
    <template #layout-bottom>
      <SidebarHoverStrip />
      <OutlineHoverStrip />
    </template>
  </DefaultLayout>
</template>
