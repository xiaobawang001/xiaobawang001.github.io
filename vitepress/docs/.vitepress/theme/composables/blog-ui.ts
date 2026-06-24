import { onMounted, ref, watch } from 'vue'

const STORAGE_KEY = 'blog-ui-v2'

interface BlogUiState {
  sidebarCollapsed?: boolean
  outlinePinned?: boolean
}

function loadState(): BlogUiState {
  if (typeof localStorage === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveState(state: BlogUiState) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const saved = loadState()

export const sidebarCollapsed = ref(saved.sidebarCollapsed ?? false)
export const outlinePinned = ref(saved.outlinePinned ?? true)
export const sidebarHover = ref(false)
export const outlineHover = ref(false)
export const foldersExpanded = ref(true)
export const allFoldersForcedCollapsed = ref(false)

function triggerSidebarItemToggle(el: HTMLElement) {
  const caret = el.querySelector<HTMLElement>('.caret')
  const item = el.querySelector<HTMLElement>('.item')
  const hasLink = !!el.querySelector('.item > .link')

  if (hasLink && caret) {
    caret.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
  } else if (item) {
    item.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
  }
}

function expandAllSidebarFolders() {
  document
    .querySelectorAll<HTMLElement>('#VPSidebarNav .VPSidebarItem.collapsible.collapsed')
    .forEach(triggerSidebarItemToggle)
}

export function clearForcedFolderCollapse() {
  if (!allFoldersForcedCollapsed.value) return
  allFoldersForcedCollapsed.value = false
  foldersExpanded.value = true
  applyUiClasses()
}

let outlineHideTimer: ReturnType<typeof setTimeout> | null = null

export function setOutlineHover(active: boolean) {
  if (outlinePinned.value) return

  if (outlineHideTimer) {
    clearTimeout(outlineHideTimer)
    outlineHideTimer = null
  }
  if (active) {
    outlineHover.value = true
    return
  }
  outlineHideTimer = setTimeout(() => {
    outlineHover.value = false
    outlineHideTimer = null
  }, 300)
}

const OUTLINE_HOVER_SELECTOR =
  '.OutlineHoverStrip, .aside-container, .OutlineToolbar, .VPDocAsideOutline'

export function bindOutlineHoverEvents() {
  if (typeof document === 'undefined') return () => {}

  const onOver = (e: MouseEvent) => {
    if (outlinePinned.value) return
    const target = e.target as Element | null
    if (target?.closest(OUTLINE_HOVER_SELECTOR)) setOutlineHover(true)
  }

  const onOut = (e: MouseEvent) => {
    if (outlinePinned.value) return
    const target = e.target as Element | null
    const related = e.relatedTarget as Element | null
    if (!target?.closest(OUTLINE_HOVER_SELECTOR)) return
    if (!related?.closest(OUTLINE_HOVER_SELECTOR)) setOutlineHover(false)
  }

  document.addEventListener('mouseover', onOver)
  document.addEventListener('mouseout', onOut)

  return () => {
    document.removeEventListener('mouseover', onOver)
    document.removeEventListener('mouseout', onOut)
    if (outlineHideTimer) clearTimeout(outlineHideTimer)
  }
}

export function applyUiClasses() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('blog-sidebar-collapsed', sidebarCollapsed.value)
  root.classList.toggle('blog-sidebar-hover', sidebarHover.value)
  root.classList.toggle('blog-outline-pinned', outlinePinned.value)
  root.classList.toggle('blog-outline-unpinned', !outlinePinned.value)
  root.classList.toggle('blog-outline-hover', outlineHover.value)
  root.classList.toggle('blog-folders-all-collapsed', allFoldersForcedCollapsed.value)
}

watch([sidebarCollapsed, outlinePinned], () => {
  saveState({
    sidebarCollapsed: sidebarCollapsed.value,
    outlinePinned: outlinePinned.value,
  })
  if (outlinePinned.value) outlineHover.value = false
  applyUiClasses()
})

watch([sidebarHover, outlineHover], applyUiClasses)

export function useBlogUi() {
  onMounted(applyUiClasses)

  function toggleSidebarCollapsed() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function toggleOutlinePinned() {
    outlinePinned.value = !outlinePinned.value
    if (outlinePinned.value) outlineHover.value = false
  }

  function scrollToActiveDoc() {
    const nav = document.getElementById('VPSidebarNav')
    if (!nav) return

    allFoldersForcedCollapsed.value = false
    foldersExpanded.value = true
    applyUiClasses()

    let active = nav.querySelector('.VPSidebarItem.is-active') as HTMLElement | null
    if (!active) {
      active = nav.querySelector('.VPSidebarItem.has-active') as HTMLElement | null
    }
    if (!active) return

    let parent = active.parentElement?.closest('.VPSidebarItem.collapsible') as HTMLElement | null
    while (parent) {
      if (parent.classList.contains('collapsed')) {
        triggerSidebarItemToggle(parent)
      }
      parent = parent.parentElement?.closest('.VPSidebarItem.collapsible') as HTMLElement | null
    }

    requestAnimationFrame(() => {
      active?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    })
  }

  function toggleAllFolders() {
    if (foldersExpanded.value) {
      allFoldersForcedCollapsed.value = true
      foldersExpanded.value = false
    } else {
      allFoldersForcedCollapsed.value = false
      foldersExpanded.value = true
      requestAnimationFrame(() => expandAllSidebarFolders())
    }
    applyUiClasses()
  }

  return {
    sidebarCollapsed,
    outlinePinned,
    sidebarHover,
    outlineHover,
    foldersExpanded,
    toggleSidebarCollapsed,
    toggleOutlinePinned,
    scrollToActiveDoc,
    toggleAllFolders,
    applyUiClasses,
  }
}
