let vizModule: typeof import('@viz-js/viz') | null = null

async function getViz() {
  if (!vizModule) {
    vizModule = await import('@viz-js/viz')
  }
  return vizModule
}

function resetGraphvizNodes(nodes: HTMLElement[]) {
  nodes.forEach((node) => {
    if (!node.dataset.graphvizSource) {
      node.dataset.graphvizSource = node.textContent?.trim() ?? ''
    }
    node.textContent = node.dataset.graphvizSource
    node.removeAttribute('data-processed')
  })
}

export async function renderGraphvizDiagrams() {
  if (typeof document === 'undefined') return

  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>('.vp-doc pre.graphviz'),
  )
  if (!nodes.length) return

  resetGraphvizNodes(nodes)

  try {
    const { instance } = await getViz()
    const viz = await instance()
    nodes.forEach((node) => {
      const source = node.dataset.graphvizSource ?? node.textContent ?? ''
      if (!source.trim()) return
      const svg = viz.renderSVGElement(source)
      node.innerHTML = ''
      node.appendChild(svg)
      node.dataset.processed = 'true'
    })
  } catch (error) {
    console.warn('[graphviz] render failed:', error)
  }
}
