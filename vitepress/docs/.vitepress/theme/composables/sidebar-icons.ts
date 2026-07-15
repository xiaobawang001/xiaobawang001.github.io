type SidebarItem = { text?: string; items?: SidebarItem[] }

/**
 * Walks sidebar config to find items that have an 'items' array (even empty):
 * these are folders. Marks their DOM elements with [data-sidebar-folder].
 */
export function applySidebarFolderIcons(sidebar: unknown) {
  if (typeof document === 'undefined') return

  const nav = document.getElementById('VPSidebarNav')
  if (!nav) return

  const folderNames = new Set<string>()

  function walk(items: SidebarItem[]) {
    for (const item of items) {
      if (item.items !== undefined) {
        if (item.text) folderNames.add(item.text.trim())
        if (item.items.length > 0) walk(item.items)
      }
    }
  }

  try {
    const list = Array.isArray(sidebar)
      ? sidebar
      : Object.values(sidebar as Record<string, unknown>).flat()
    walk(list)
  } catch {
    return
  }

  if (folderNames.size === 0) return

  for (const el of nav.querySelectorAll('.VPSidebarItem')) {
    const text = el.querySelector(':scope > .item .text')?.textContent?.trim()
    if (text && folderNames.has(text)) {
      el.setAttribute('data-sidebar-folder', '')
    }
  }
}
