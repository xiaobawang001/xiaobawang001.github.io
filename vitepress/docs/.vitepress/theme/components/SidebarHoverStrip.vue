<script setup lang="ts">
import { useBlogUi } from '../composables/blog-ui'

const { sidebarCollapsed, sidebarHover } = useBlogUi()

function onEnter() {
  if (sidebarCollapsed.value) sidebarHover.value = true
}

function onLeave() {
  sidebarHover.value = false
}
</script>

<template>
  <div
    v-if="sidebarCollapsed"
    class="SidebarHoverStrip"
    aria-hidden="true"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  />
</template>

<style scoped>
.SidebarHoverStrip {
  display: none;
}

@media (min-width: 960px) {
  .SidebarHoverStrip {
    display: block;
    position: fixed;
    top: var(--vp-nav-height);
    left: 0;
    z-index: calc(var(--vp-z-index-sidebar) + 1);
    width: 10px;
    height: calc(100vh - var(--vp-nav-height));
    cursor: e-resize;
  }
}
</style>
