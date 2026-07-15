let cleanup: (() => void) | null = null

export function setupOutlineCollapseClick() {
  if (typeof document === 'undefined') return

  cleanup?.()
  cleanup = null

  const outline = document.querySelector<HTMLElement>('.VPDocAsideOutline')
  if (!outline) return

  const handler = (e: MouseEvent) => {
    const html = document.documentElement
    if (!html.classList.contains('blog-outline-collapsed')) return

    const link = (e.target as Element).closest<HTMLAnchorElement>('.outline-link')
    if (!link) return

    const li = link.closest('li')
    if (!li) return
    const nested = li.querySelector<HTMLElement>(':scope > .VPDocOutlineItem.nested')
    if (!nested) return

    e.preventDefault()
    e.stopPropagation()
    nested.classList.toggle('outline-manual-expand')
  }

  outline.addEventListener('click', handler, true)
  cleanup = () => outline.removeEventListener('click', handler, true)
}
