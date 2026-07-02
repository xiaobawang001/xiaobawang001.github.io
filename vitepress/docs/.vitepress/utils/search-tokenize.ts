/** 中英文混排分词（函数体须自包含，VitePress 会序列化到客户端执行） */
export function cjkAwareTokenize(text: string): string[] {
  const tokens: string[] = []
  const seen = new Set<string>()

  function add(token: string) {
    const t = token.trim()
    if (!t || seen.has(t)) return
    seen.add(t)
    tokens.push(t)
  }

  const normalized = text
    .replace(/([a-zA-Z0-9]+)([\u4e00-\u9fff])/g, '$1 $2')
    .replace(/([\u4e00-\u9fff])([a-zA-Z0-9]+)/g, '$1 $2')

  const parts = normalized.split(/[\n\r\p{Z}\p{P}]+/u)
  for (const part of parts) {
    if (!part) continue
    add(part)

    if (!/[\u4e00-\u9fff]/.test(part)) continue

    const cjkRun = part.replace(/[^\u4e00-\u9fff]/g, '')
    for (const char of cjkRun) add(char)
    for (let i = 0; i < cjkRun.length - 1; i++) {
      add(cjkRun.slice(i, i + 2))
    }
  }

  return tokens
}
