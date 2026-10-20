export const spacing = {
  xs: 0.5,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  xxl: 5,
} as const;

export const radius = {
  sm: "6px",
  md: "10px",
  lg: "12px",
  xl: "24px",
  full: "999px",
} as const;

export const transition = {
  fast: "0.2s ease-in-out",
  base: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
} as const;
  
export const semantic = {
  // Rojo (Error)
  error: "#f85149",
  errorBg: "rgba(248, 81, 73, 0.12)",      // Un toque más oscuro
  errorBorder: "rgba(248, 81, 73, 0.35)",  // Borde con más presencia

  // Verde (Success)
  success: "#3fb950",
  successBg: "rgba(63, 185, 80, 0.12)",
  successBorder: "rgba(63, 185, 80, 0.35)",

  successDark: "#238636",
  successDarkHover: "#2ea043",
  // Amarillo (Warning)
  warning: "#d29922",
  warningBg: "rgba(210, 153, 34, 0.12)",
  warningBorder: "rgba(210, 153, 34, 0.35)",

  // Azul (Info)
  info: "#58a6ff",
  infoBg: "rgba(88, 166, 255, 0.12)",
  infoBorder: "rgba(88, 166, 255, 0.35)",
} as const;

export const shadows = {
  sm: "0 1px 3px rgba(0,0,0,0.12)",
  md: "0 4px 12px rgba(0,0,0,0.15)",
  lg: "0 12px 24px rgba(0,0,0,0.2)",
  xl: "0 24px 48px rgba(0,0,0,0.25)",
  modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // el "shadow.modal" de styles.ts
  card: "0 4px 12px rgba(0,0,0,0.15)",            // igual a md, alias semántico
} as const;

export const themes = {
  light: {
    bg: "#fafbfc",           // Blanco con micro-tinte cálido (no gris plano)
    bgSecondary: "#f0f2f5",  // Gris azulado muy sutil, elegante
    bgMuted: "#e8ecf1",      // Más profundo, con dirección cromática
    bgHover: "#dfe4ea",      // Transición suave
    bgActive: "#d1d8e0",     // Estado activo con presencia
    border: "#d0d7de",       // Borde sutil pero definido
    text: "#1f2328",         // Negro suave con tinte azul (no puro negro)
    textMuted: "#656d76",    // Gris medio con dirección
    accent: "#0969da",       // Azul GitHub — probado, profesional
    accentText: "#0550ae",   // Más oscuro para hover/estados
    darkbg: "#2E2E2E",
    FondoParaPlanner: "#f7f7f5"
  },
  dark: {
    bg: "#1e1e1e",
    bgSecondary: "#252526",
    bgMuted: "#161616", //  Fondo profundo opaco
    bgHover: "#2d2d2d",
    bgActive: "#3a3a3a",
    border: "#3d3d3d",
    text: "#d4d4d4",
    textMuted: "#8a8a8a",
    accent: "#007acc",
    accentText: "#F5F5F5",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  forest: {
    bg: "#1f2417",
    bgSecondary: "#262d1c",
    bgMuted: "#171a11",
    bgHover: "#2e3622",
    bgActive: "#3a4429",
    border: "#4a5535",
    text: "#c8d4b0",
    textMuted: "#7a8f62",
    accent: "#7cb87a",
    accentText: "#a8d5a2",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  dusk: {
    bg: "#1c1825",
    bgSecondary: "#231f2e",
    bgMuted: "#14111b",
    bgHover: "#2c2838",
    bgActive: "#373244",
    border: "#463f58",
    text: "#d8d0e8",
    textMuted: "#8878a8",
    accent: "#c084fc",
    accentText: "#d8b4fe",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  ember: {
    bg: "#1c1612",
    bgSecondary: "#241c17",
    bgMuted: "#14100d",
    bgHover: "#2e231c",
    bgActive: "#3a2c23",
    border: "#4d3a2e",
    text: "#e0cfc0",
    textMuted: "#9a7a65",
    accent: "#e07840",
    accentText: "#f0a070",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  highContrast: {
    bg: "#000000",
    bgSecondary: "#0a0a0a",
    bgMuted: "#121212",
    bgHover: "#1a1a1a",
    bgActive: "#2a2a2a",
    border: "#ffffff",
    text: "#ffffff",
    textMuted: "#cccccc",
    accent: "#ffff00",
    accentText: "#ffff00",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  focus: {
    bg: "#1a1a2e",
    bgSecondary: "#16213e",
    bgMuted: "#111122",
    bgHover: "#0f3460",
    bgActive: "#533483",
    border: "#0f3460",
    text: "#e0e0e0",
    textMuted: "#9e9e9e",
    accent: "#e94560",
    accentText: "#e94560",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  aurora: {
    bg: "#0f1f2b",
    bgSecondary: "#142a38",
    bgMuted: "#0a151d",
    bgHover: "#1c3747",
    bgActive: "#26495d",
    border: "#355d73",
    text: "#d7edf7",
    textMuted: "#88aebe",
    accent: "#00d4ff",
    accentText: "#7cf3ff",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  nebula: {
    bg: "#181228",
    bgSecondary: "#21193a",
    bgMuted: "#110c1d",
    bgHover: "#2d2350",
    bgActive: "#3a2e66",
    border: "#4a3d7d",
    text: "#ece6ff",
    textMuted: "#a497c7",
    accent: "#9b5cff",
    accentText: "#c8a7ff",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  matrix: {
    bg: "#0b120d",
    bgSecondary: "#101912",
    bgMuted: "#050806",
    bgHover: "#142317",
    bgActive: "#1d3120",
    border: "#285030",
    text: "#b4ffbf",
    textMuted: "#6dab78",
    accent: "#22ff66",
    accentText: "#8fffaa",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  sunset: {
    bg: "#2b1b16",
    bgSecondary: "#35231d",
    bgMuted: "#20130f",
    bgHover: "#452d24",
    bgActive: "#5a392d",
    border: "#7a4b3a",
    text: "#ffe2d6",
    textMuted: "#c49a89",
    accent: "#ff7e5f",
    accentText: "#ffb199",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  arctic: {
    bg: "#f5f9ff",           // Blanco con tinte azul hielo, fresco
    bgSecondary: "#e8f0f8",  // Azul más presente, capa visual clara
    bgMuted: "#dae6f2",      // Hielo medio, funciona como "muted" real
    bgHover: "#c9d9e8",      // Transición visible
    bgActive: "#b8cce0",     // Estado activo con cuerpo
    border: "#a8bfd6",       // Borde azul hielo, elegante
    text: "#1a2332",         // Azul muy oscuro, sofisticado
    textMuted: "#5a6e82",    // Gris azulado, legible
    accent: "#0d7bc4",       // Azul hielo profundo, no chillón
    accentText: "#095a96",   // Hover state
    darkbg: "#2E2E2E",
    FondoParaPlanner: "#f7f7f5"
  },
  candy: {
    bg: "#2a1826",
    bgSecondary: "#341f2f",
    bgMuted: "#1f111c",
    bgHover: "#43273c",
    bgActive: "#573150",
    border: "#704267",
    text: "#ffe3f5",
    textMuted: "#c596b8",
    accent: "#ff4fa3",
    accentText: "#ff9dce",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  obsidianGold: {
    bg: "#141414",
    bgSecondary: "#1c1c1c",
    bgMuted: "#0a0a0a",
    bgHover: "#272727",
    bgActive: "#333333",
    border: "#5b5036",
    text: "#f2ead3",
    textMuted: "#b1a382",
    accent: "#d6b35f",
    accentText: "#f0d48f",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  oceanic: {
    bg: "#0d1d24",
    bgSecondary: "#132730",
    bgMuted: "#071217",
    bgHover: "#1a3440",
    bgActive: "#234454",
    border: "#2f5d72",
    text: "#d8f4ff",
    textMuted: "#84aebf",
    accent: "#29b6f6",
    accentText: "#7dd8ff",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  retroArcade: {
    bg: "#120f1f",
    bgSecondary: "#1a1530",
    bgMuted: "#0a0814",
    bgHover: "#271f47",
    bgActive: "#372b61",
    border: "#5a4a87",
    text: "#f8f4ff",
    textMuted: "#afa3d1",
    accent: "#ffde59",
    accentText: "#ffe98e",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
  paperInk: {
    bg: "#f6f1e8",
    bgSecondary: "#ece5d8",
    bgMuted: "#faf7f2", //  Papel premium sutil
    bgHover: "#e2d8c8",
    bgActive: "#d6c9b5",
    border: "#c2b29a",
    text: "#2b241a",
    textMuted: "#6f604d",
    accent: "#7c4dff",
    accentText: "#5f2fd6",
     darkbg: "#2E2E2E",
         FondoParaPlanner:"#f7f7f5"
  },
} as const;

export type ThemeName = keyof typeof themes;
export type ThemeTokens = {
  bg: string;
  bgSecondary: string;
  bgMuted: string; //  Agregado al tipado estricto
  bgHover: string;
  bgActive: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  accentText: string;
  darkbg:string;
  FondoParaPlanner:string
};