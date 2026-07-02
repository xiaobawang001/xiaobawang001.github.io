<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useBackground, OPACITY_MIN } from '../composables/use-background'
import { toIconSvg } from '../utils/icon'
import opacityIconRaw from '../../../../static/navigatebar/透明度-.svg?raw'

const { bgMode, uiOpacity, opacityMax } = useBackground()

const opacityOpen = ref(false)
const buttonRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})

const opacityPercent = computed(() => Math.round(uiOpacity.value * 100))
const wallpaperEnabled = computed(() => bgMode.value !== 'none')
const sliderProgress = computed(() => {
  const max = opacityMax.value
  const range = max - OPACITY_MIN
  if (range <= 0) return '0%'
  return `${((uiOpacity.value - OPACITY_MIN) / range) * 100}%`
})

function updatePanelPosition() {
  const btn = buttonRef.value
  if (!btn) return
  const rect = btn.getBoundingClientRect()
  panelStyle.value = {
    top: `${rect.bottom + 8}px`,
    right: `${window.innerWidth - rect.right}px`,
  }
}

function toggleOpacityPanel() {
  opacityOpen.value = !opacityOpen.value
}

function onDocumentClick(e: MouseEvent) {
  if (!opacityOpen.value) return
  const target = e.target as Node
  const inButton = buttonRef.value?.contains(target)
  const inPanel = panelRef.value?.contains(target)
  if (!inButton && !inPanel) {
    opacityOpen.value = false
  }
}

watch(opacityOpen, (open) => {
  if (open) {
    nextTick(updatePanelPosition)
  }
})

onMounted(() => {
  document.addEventListener('click', onDocumentClick, true)
  window.addEventListener('resize', updatePanelPosition)
  window.addEventListener('scroll', updatePanelPosition, true)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick, true)
  window.removeEventListener('resize', updatePanelPosition)
  window.removeEventListener('scroll', updatePanelPosition, true)
})
</script>

<template>
  <div class="NavOpacityControl" role="group" aria-label="界面透明度">
    <button
      ref="buttonRef"
      type="button"
      class="nav-icon-btn"
      :class="{ active: opacityOpen }"
      title="界面透明度"
      aria-label="界面透明度"
      aria-expanded="opacityOpen"
      :disabled="!wallpaperEnabled"
      @click.stop="toggleOpacityPanel"
    >
      <span class="nav-icon" v-html="toIconSvg(opacityIconRaw)" />
    </button>

    <Teleport to="body">
      <div
        v-show="opacityOpen && wallpaperEnabled"
        ref="panelRef"
        class="opacity-panel"
        :style="panelStyle"
        @click.stop
      >
        <div class="opacity-panel-title">界面透明度</div>
        <div class="opacity-panel-row">
          <input
            v-model.number="uiOpacity"
            class="oval-slider"
            type="range"
            :min="OPACITY_MIN"
            :max="opacityMax"
            step="0.01"
            aria-label="界面透明度"
            :style="{ '--slider-progress': sliderProgress }"
          />
          <span class="opacity-value">{{ opacityPercent }}%</span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.NavOpacityControl {
  display: none;
  align-items: center;
  position: relative;
  margin-left: 6px;
  padding-left: 10px;
  border-left: 1px solid var(--vp-c-divider);
}

@media (min-width: 768px) {
  .NavOpacityControl {
    display: flex;
  }
}

.nav-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.nav-icon-btn:hover:not(:disabled),
.nav-icon-btn.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.nav-icon-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.nav-icon {
  display: inline-flex;
  line-height: 0;
}

.nav-icon :deep(svg) {
  display: block;
  width: 18px;
  height: 18px;
}

.opacity-panel {
  position: fixed;
  z-index: 300;
  min-width: 220px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--yuque-sidebar-bg, var(--vp-c-bg));
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.opacity-panel-title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.opacity-panel-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.opacity-value {
  flex-shrink: 0;
  min-width: 40px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-align: right;
}

.oval-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 22px;
  margin: 0;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--vp-c-brand-1) 0%,
    var(--vp-c-brand-1) var(--slider-progress, 50%),
    var(--vp-c-divider) var(--slider-progress, 50%),
    var(--vp-c-divider) 100%
  );
  cursor: pointer;
}

.oval-slider::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 999px;
  background: transparent;
}

.oval-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 28px;
  height: 18px;
  margin-top: -5px;
  border: 2px solid var(--vp-c-bg);
  border-radius: 999px;
  background: var(--vp-c-brand-1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.oval-slider::-moz-range-track {
  height: 8px;
  border: none;
  border-radius: 999px;
  background: var(--vp-c-divider);
}

.oval-slider::-moz-range-progress {
  height: 8px;
  border-radius: 999px;
  background: var(--vp-c-brand-1);
}

.oval-slider::-moz-range-thumb {
  width: 28px;
  height: 18px;
  border: 2px solid var(--vp-c-bg);
  border-radius: 999px;
  background: var(--vp-c-brand-1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
