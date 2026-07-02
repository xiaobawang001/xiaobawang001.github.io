export function buildKrokiPlantumlUrl(encoded: string, isDark: boolean) {
  const base = `https://kroki.io/plantuml/svg/${encoded}`
  return isDark ? `${base}?bgColor=2e2f35` : base
}

export async function renderPlantumlDiagrams(isDark: boolean) {
  if (typeof document === 'undefined') return

  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>('.vp-doc img.plantuml-diagram'),
  )
  if (!images.length) return

  images.forEach((img) => {
    const encoded = img.dataset.plantumlEncoded
    if (!encoded) return
    img.src = buildKrokiPlantumlUrl(encoded, isDark)
  })
}
