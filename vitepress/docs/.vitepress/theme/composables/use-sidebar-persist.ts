import {
  foldersExpanded,
  allFoldersForcedCollapsed,
  applyUiClasses,
} from './blog-ui'

const UI_STORAGE_KEY = 'blog-ui-prefs'
const COLLAPSED_KEY = 'blog-sidebar-collapsed'

interface UiPrefs {
  foldersExpanded?: boolean
}

function readUiPrefs(): UiPrefs {
  if (typeof localStorage === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(UI_STORAGE_KEY) ?? '{}') as UiPrefs
  } catch {
    return {}
  }
}

function saveUiPrefs() {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(
    UI_STORAGE_KEY,
    JSON.stringify({
      foldersExpanded: foldersExpanded.value,
    }),
  )
}

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

function getFolderKey(item: Element): string | null {
  const text = item.querySelector(':scope > .item .text')?.textContent?.trim()
  if (!text) return null
  const level = [...item.classList].find((c) => c.startsWith('level-')) ?? 'level-0'
  return `${level}:${text}`
}

function saveCollapsedFolders() {
  if (typeof localStorage === 'undefined') return
  const keys = [...document.querySelectorAll('#VPSidebarNav .VPSidebarItem.collapsible.collapsed')]
    .map(getFolderKey)
    .filter(Boolean)
  localStorage.setItem(COLLAPSED_KEY, JSON.stringify(keys))
}

function restoreCollapsedFolders() {
  if (typeof localStorage === 'undefined') return
  let keys: string[] = []
  try {
    keys = JSON.parse(localStorage.getItem(COLLAPSED_KEY) ?? '[]')
  } catch {
    keys = []
  }
  if (!keys.length) return

  document.querySelectorAll('#VPSidebarNav .VPSidebarItem.collapsible').forEach((item) => {
    const key = getFolderKey(item)
    if (!key || !keys.includes(key)) return
    if (!item.classList.contains('collapsed')) {
      triggerSidebarItemToggle(item as HTMLElement)
    }
  })
}

export function initSidebarPersistFromStorage() {
  const prefs = readUiPrefs()
  if (typeof prefs.foldersExpanded === 'boolean') {
    foldersExpanded.value = prefs.foldersExpanded
    allFoldersForcedCollapsed.value = !prefs.foldersExpanded
  }
  applyUiClasses()
}

export function setupSidebarPersist() {
  if (typeof document === 'undefined') return () => {}

  const nav = document.getElementById('VPSidebarNav')
  if (!nav) return () => {}

  const onNavClick = (e: Event) => {
    const target = e.target as Element
    if (target.closest('.caret') || target.closest('.SidebarToolbar')) {
      requestAnimationFrame(saveCollapsedFolders)
    }
  }

  nav.addEventListener('click', onNavClick, true)

  const restore = () => {
    requestAnimationFrame(() => {
      restoreCollapsedFolders()
    })
  }
  restore()

  const observer = new MutationObserver(() => saveUiPrefs())
  observer.observe(nav, { subtree: true, attributes: true, attributeFilter: ['class'] })

  return () => {
    nav.removeEventListener('click', onNavClick, true)
    observer.disconnect()
  }
}

export function persistUiPrefs() {
  saveUiPrefs()
}
