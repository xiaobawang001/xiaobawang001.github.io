import { toIconSvg } from '../utils/icon'
import shareIconRaw from '../../../../static/content/分享-copy.svg?raw'

const BUTTON_CLASS = 'heading-anchor-share'
const INNER_CLASS = 'heading-title-inner'
const ICON_CLASS = 'heading-anchor-share-icon'
const MARKER = 'data-blog-anchor-share'
const TOAST_CLASS = 'heading-anchor-share-toast'

const SHARE_ICON = toIconSvg(shareIconRaw, 15)

const CHECK_ICON = `<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`

function getAnchorUrl(id: string) {
  const hash = encodeURIComponent(id)
  return `${location.origin}${location.pathname}${location.search}#${hash}`
}

function setButtonIcon(button: HTMLButtonElement, iconHtml: string) {
  let icon = button.querySelector<HTMLElement>(`.${ICON_CLASS}`)
  if (!icon) {
    icon = document.createElement('span')
    icon.className = ICON_CLASS
    button.prepend(icon)
  }
  icon.innerHTML = iconHtml
}

function ensureTitleInner(heading: HTMLElement) {
  let inner = heading.querySelector<HTMLElement>(`.${INNER_CLASS}`)
  if (inner) return inner

  inner = document.createElement('span')
  inner.className = INNER_CLASS

  const nodes = Array.from(heading.childNodes)
  nodes.forEach((node) => {
    if (node instanceof Element && node.classList.contains('header-anchor')) return
    if (node instanceof Element && node.classList.contains(INNER_CLASS)) return
    inner!.appendChild(node)
  })

  heading.appendChild(inner)
  return inner
}

function showCopiedFeedback(button: HTMLButtonElement) {
  button.classList.add('is-copied')
  setButtonIcon(button, CHECK_ICON)
  button.setAttribute('aria-label', '已复制链接')

  let toast = button.querySelector<HTMLElement>(`.${TOAST_CLASS}`)
  if (!toast) {
    toast = document.createElement('span')
    toast.className = TOAST_CLASS
    toast.setAttribute('role', 'status')
    toast.textContent = '已复制'
    button.appendChild(toast)
  }

  toast.classList.add('show')

  window.setTimeout(() => {
    button.classList.remove('is-copied')
    setButtonIcon(button, SHARE_ICON)
    button.setAttribute('aria-label', '复制章节链接')
    toast?.classList.remove('show')
  }, 2000)
}

async function copyAnchorLink(id: string, button: HTMLButtonElement) {
  const url = getAnchorUrl(id)
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    const input = document.createElement('textarea')
    input.value = url
    input.style.position = 'fixed'
    input.style.opacity = '0'
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }

  history.replaceState(null, '', `#${encodeURIComponent(id)}`)
  showCopiedFeedback(button)
}

export function setupHeadingAnchorShare() {
  if (typeof document === 'undefined') return () => {}

  const doc = document.querySelector('.vp-doc')
  if (!doc) return () => {}

  const headings = doc.querySelectorAll<HTMLElement>(
    'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]',
  )

  headings.forEach((heading) => {
    if (heading.querySelector(`[${MARKER}]`)) return

    const inner = ensureTitleInner(heading)

    const button = document.createElement('button')
    button.type = 'button'
    button.className = BUTTON_CLASS
    button.setAttribute(MARKER, 'true')
    button.setAttribute('aria-label', '复制章节链接')
    button.title = '复制章节链接'
    setButtonIcon(button, SHARE_ICON)

    button.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      void copyAnchorLink(heading.id, button)
    })

    inner.appendChild(button)
  })

  return () => {
    doc.querySelectorAll<HTMLElement>(`[${MARKER}]`).forEach((button) => {
      button.remove()
    })
  }
}
