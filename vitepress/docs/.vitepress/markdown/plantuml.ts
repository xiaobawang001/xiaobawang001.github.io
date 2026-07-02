import type MarkdownIt from 'markdown-it'
import { encode } from 'plantuml-encoder'

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

export function markdownItPlantuml(md: MarkdownIt) {
  const defaultFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const lang = token.info.trim()
    if (lang === 'plantuml' || lang === 'puml') {
      const encoded = encode(token.content.trim())
      const escapedSource = escapeHtml(token.content)
      return `<figure class="plantuml-wrap"><img class="plantuml-diagram" data-plantuml-encoded="${encoded}" data-plantuml-source="${escapedSource}" src="https://kroki.io/plantuml/svg/${encoded}" alt="PlantUML 图表" loading="lazy" /></figure>\n`
    }
    return defaultFence(tokens, idx, options, env, self)
  }
}
