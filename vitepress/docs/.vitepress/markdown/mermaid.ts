import type MarkdownIt from 'markdown-it'

export function markdownItMermaid(md: MarkdownIt) {
  const defaultFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (token.info.trim() === 'mermaid') {
      return `<pre class="mermaid">${token.content}</pre>\n`
    }
    return defaultFence(tokens, idx, options, env, self)
  }
}
