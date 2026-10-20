import { spacing, radius, transition, semantic, shadows, themes } from './tokens'
import type { ThemeName, ThemeTokens } from './tokens'
import { fontFamilies, fontSizes } from './typography'
import type { FontFamily, FontSize } from './typography'

// bgSecondary -> bg-secondary | FondoParaPlanner -> fondo-para-planner
const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`).replace(/^-/, '')

function setGroup(
  prefix: string,
  obj: Record<string, string | number>,
  fmt: (v: string | number) => string = String
) {
  const style = document.documentElement.style
  for (const [k, v] of Object.entries(obj)) {
    style.setProperty(`--${prefix ? `${prefix}-` : ''}${kebab(k)}`, fmt(v))
  }
}

// Texto legible sobre el accent (negro o blanco según luminosidad)
function onColor(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum > 0.6 ? '#111111' : '#ffffff'
}

/** Espaciado, radios, transiciones, sombras y colores semánticos. Se llama una vez. */
export function applyStaticTokens() {
  setGroup('space', spacing, (v) => `${Number(v) * 8}px`)
  setGroup('radius', radius)
  setGroup('transition', transition)
  setGroup('shadow', shadows)
  setGroup('', semantic)
}

/** Aplica un tema por nombre (o tokens propios). Deja `data-theme` para ui.css. */
export function applyTheme(name: ThemeName, tokens: ThemeTokens = themes[name]) {
  setGroup('', tokens)
  const root = document.documentElement
  root.style.setProperty('--on-accent', onColor(tokens.accent))
  root.dataset.theme = name
}

export function applyTypography(family: FontFamily, size: FontSize) {
  setGroup('font', fontSizes[size])
  document.documentElement.style.setProperty('--font-family', fontFamilies[family])
}