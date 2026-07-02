import type MarkdownIt from 'markdown-it'

export function markdownItGraphviz(md: MarkdownIt) {
  const defaultFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const lang = token.info.trim()
    if (lang === 'dot' || lang === 'graphviz') {
      return `<pre class="graphviz">${token.content}</pre>\n`
    }
    return defaultFence(tokens, idx, options, env, self)
  }
}
