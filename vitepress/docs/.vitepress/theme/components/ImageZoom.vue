<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(false)
const src = ref('')
const alt = ref('')

function close() {
  visible.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

function onDocClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  const img = target.closest<HTMLImageElement>('.vp-doc img, .VPDoc img')
  if (!img || img.closest('a') || target.closest('button.copy')) return

  e.preventDefault()
  src.value = img.currentSrc || img.src
  alt.value = img.alt || ''
  visible.value = true
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="ImageZoomOverlay"
      role="dialog"
      aria-modal="true"
      :aria-label="alt || '图片预览'"
      @click.self="close"
    >
      <button type="button" class="close-btn" aria-label="关闭" @click="close">×</button>
      <img class="zoom-img" :src="src" :alt="alt" />
    </div>
  </Teleport>
</template>

<style scoped>
.ImageZoomOverlay {
  position: fixed;
  inset: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(4px);
}

.zoom-img {
  max-width: min(96vw, 1200px);
  max-height: 90vh;
  border-radius: 8px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.35);
  object-fit: contain;
  cursor: zoom-out;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.22);
}
</style>
