import { onMounted, ref } from 'vue'
import { persistUiPrefs } from './use-sidebar-persist'

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

export function applyUiClasses() {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle(
    'blog-folders-all-collapsed',
    allFoldersForcedCollapsed.value,
  )
}

export function useBlogUi() {
  onMounted(applyUiClasses)

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
    persistUiPrefs()
  }

  return {
    foldersExpanded,
    scrollToActiveDoc,
    toggleAllFolders,
    applyUiClasses,
  }
}
