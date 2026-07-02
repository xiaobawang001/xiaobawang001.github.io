const MARKER = 'data-blog-code-enhanced'
const COLLAPSE_LINES = 18
const SKIP_LANGS = new Set(['mermaid', 'plantuml', 'dot', 'graphviz'])
const LINE_ACTIVE_CLASS = 'blog-code-line-active'
const BLOCK_SELECTOR = '.vp-doc div[class*="language-"]'

function getLanguage(block: Element): string {
  const match = block.className.match(/language-([^\s]+)/)
  return match?.[1]?.toLowerCase() ?? ''
}

function countLines(block: HTMLElement): number {
  const lineEls = block.querySelectorAll('pre code .line')
  if (lineEls.length) return lineEls.length
  const text = block.querySelector('pre code')?.textContent ?? ''
  return text ? text.split('\n').length : 0
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const element = document.createElement('textarea')
    element.value = text
    element.setAttribute('readonly', '')
    element.style.position = 'absolute'
    element.style.left = '-9999px'
    document.body.appendChild(element)
    element.select()
    document.execCommand('copy')
    document.body.removeChild(element)
  }
}

function extractCodeText(block: HTMLElement) {
  const pre = block.querySelector('pre')
  if (!pre) return ''
  const isShell = /language-(shellscript|shell|bash|sh|zsh)/.test(block.className)
  const clone = pre.cloneNode(true) as HTMLElement
  clone.querySelectorAll('.vp-copy-ignore, .diff.remove').forEach((node) => node.remove())
  let text = clone.textContent || ''
  if (isShell) text = text.replace(/^ *(\$|>) /gm, '').trim()
  return text
}

function ensureToolbar(block: HTMLElement) {
  let toolbar = block.querySelector<HTMLElement>('.blog-code-toolbar')
  if (toolbar) return toolbar

  toolbar = document.createElement('div')
  toolbar.className = 'blog-code-toolbar'

  const lang = block.querySelector('span.lang')
  const copyBtn = block.querySelector('button.copy')

  block.prepend(toolbar)

  if (lang) toolbar.appendChild(lang)

  const actions = document.createElement('div')
  actions.className = 'blog-code-actions'
  toolbar.appendChild(actions)

  if (copyBtn) actions.appendChild(copyBtn)

  return toolbar
}

function getActions(block: HTMLElement) {
  return ensureToolbar(block).querySelector<HTMLElement>('.blog-code-actions')!
}

function createToolbarButton(label: string, className: string) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = className
  button.textContent = label
  return button
}

function setupCopy(block: HTMLElement) {
  const copyBtn = block.querySelector<HTMLButtonElement>('button.copy')
  if (!copyBtn || copyBtn.hasAttribute('data-blog-copy-bound')) return
  copyBtn.setAttribute('data-blog-copy-bound', 'true')
  copyBtn.title = '复制代码'

  copyBtn.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    void copyText(extractCodeText(block)).then(() => {
      copyBtn.classList.add('copied')
      window.setTimeout(() => copyBtn.classList.remove('copied'), 2000)
    })
  })
}

function setupCollapse(block: HTMLElement, lineCount: number) {
  if (lineCount < COLLAPSE_LINES) return
  if (block.querySelector('[data-blog-code-collapse]')) return

  const actions = getActions(block)
  const button = createToolbarButton('收起', 'blog-code-collapse-btn')
  button.setAttribute('data-blog-code-collapse', 'true')
  button.title = `收起代码（共 ${lineCount} 行）`
  button.setAttribute('aria-expanded', 'true')

  const copyBtn = actions.querySelector('button.copy')
  if (copyBtn) actions.insertBefore(button, copyBtn)
  else actions.appendChild(button)

  const footer = document.createElement('button')
  footer.type = 'button'
  footer.className = 'blog-code-expand-bar'
  footer.setAttribute('data-blog-code-expand', 'true')
  footer.innerHTML = `<span class="blog-code-expand-text">展开代码</span><span class="blog-code-expand-meta">${lineCount} 行</span><span class="blog-code-expand-icon" aria-hidden="true">⌄</span>`
  footer.hidden = true
  block.querySelector('pre')?.after(footer)

  const setCollapsed = (collapsed: boolean) => {
    block.classList.toggle('is-collapsed', collapsed)
    button.textContent = collapsed ? '展开' : '收起'
    button.setAttribute('aria-expanded', collapsed ? 'false' : 'true')
    footer.hidden = !collapsed
  }

  button.addEventListener('click', (event) => {
    event.stopPropagation()
    setCollapsed(!block.classList.contains('is-collapsed'))
  })

  footer.addEventListener('click', (event) => {
    event.stopPropagation()
    setCollapsed(false)
  })
}

function setupWrapToggle(block: HTMLElement) {
  if (block.querySelector('[data-blog-code-wrap]')) return

  const actions = getActions(block)
  const button = createToolbarButton('自动换行', 'blog-code-wrap-btn')
  button.setAttribute('data-blog-code-wrap', 'true')
  button.title = '切换自动换行'
  button.setAttribute('aria-pressed', 'false')

  const copyBtn = actions.querySelector('button.copy')
  if (copyBtn) actions.insertBefore(button, copyBtn)
  else actions.appendChild(button)

  button.addEventListener('click', (event) => {
    event.stopPropagation()
    const wrapped = block.classList.toggle('is-wrapped')
    button.classList.toggle('is-active', wrapped)
    button.textContent = wrapped ? '取消换行' : '自动换行'
    button.setAttribute('aria-pressed', wrapped ? 'true' : 'false')
  })
}

function setupLineHighlight(block: HTMLElement) {
  if (block.hasAttribute('data-blog-code-lines')) return
  block.setAttribute('data-blog-code-lines', 'true')

  block.addEventListener('click', (event) => {
    const target = event.target as Element | null
    if (target?.closest('.blog-code-toolbar, .blog-code-expand-bar')) return
    const line = target?.closest<HTMLElement>('pre code .line')
    if (!line || !block.contains(line)) return

    const wasActive = line.classList.contains(LINE_ACTIVE_CLASS)
    block.querySelectorAll(`pre code .line.${LINE_ACTIVE_CLASS}`).forEach((node) => {
      node.classList.remove(LINE_ACTIVE_CLASS)
    })
    if (!wasActive) line.classList.add(LINE_ACTIVE_CLASS)
  })
}

function enhanceBlock(block: HTMLElement) {
  if (block.hasAttribute(MARKER)) return

  const lang = getLanguage(block)
  if (SKIP_LANGS.has(lang)) return

  block.setAttribute(MARKER, 'true')
  ensureToolbar(block)
  setupCopy(block)
  const lineCount = countLines(block)
  setupCollapse(block, lineCount)
  setupWrapToggle(block)
  setupLineHighlight(block)
}

export function setupCodeBlockEnhance() {
  if (typeof document === 'undefined') return () => {}

  const blocks = document.querySelectorAll<HTMLElement>(BLOCK_SELECTOR)
  blocks.forEach(enhanceBlock)

  return () => {}
}
