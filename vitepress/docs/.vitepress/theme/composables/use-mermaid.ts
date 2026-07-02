let currentTheme: 'default' | 'dark' | null = null
let mermaidModule: typeof import('mermaid') | null = null

async function getMermaid() {
  if (!mermaidModule) {
    mermaidModule = await import('mermaid')
  }
  return mermaidModule.default
}

async function initMermaid(isDark: boolean) {
  const mermaid = await getMermaid()
  const theme = isDark ? 'dark' : 'default'
  mermaid.initialize({
    startOnLoad: false,
    theme,
    securityLevel: 'strict',
    fontFamily: 'var(--yuque-font)',
  })
  currentTheme = theme
}

function resetMermaidNodes(nodes: HTMLElement[]) {
  nodes.forEach((node) => {
    if (!node.dataset.mermaidSource) {
      node.dataset.mermaidSource = node.textContent?.trim() ?? ''
    }
    node.textContent = node.dataset.mermaidSource
    node.removeAttribute('data-processed')
  })
}

export async function renderMermaidDiagrams(isDark: boolean) {
  if (typeof document === 'undefined') return

  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>('.vp-doc pre.mermaid'),
  )
  if (!nodes.length) return

  const theme = isDark ? 'dark' : 'default'
  if (currentTheme !== theme) {
    await initMermaid(isDark)
    resetMermaidNodes(nodes)
  } else if (!currentTheme) {
    await initMermaid(isDark)
  }

  try {
    const mermaid = await getMermaid()
    await mermaid.run({ nodes })
  } catch (error) {
    console.warn('[mermaid] render failed:', error)
  }
}
