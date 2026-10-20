// theme/typography.ts

export const fontFamilies = {
  // ─── Originales ─────────────────────────────────────────────
  system: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  rounded: "'Nunito', 'Varela Round', sans-serif",
  classic: "'Georgia', 'Times New Roman', serif",
  modern: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
  editorial: "'Merriweather', 'Georgia', serif",
  technical: "'IBM Plex Sans', 'Segoe UI', sans-serif",
  friendly: "'Quicksand', 'Nunito', sans-serif",
  condensed: "'Roboto Condensed', 'Arial Narrow', sans-serif",

  // ─── Nuevas 30 familias ─────────────────────────────────────
  lato: "'Lato', sans-serif",
  opensans: "'Open Sans', sans-serif",
  montserrat: "'Montserrat', sans-serif",
  raleway: "'Raleway', sans-serif",
  poppins: "'Poppins', sans-serif",
  ubuntu: "'Ubuntu', sans-serif",
  sourceSansPro: "'Source Sans Pro', sans-serif",
  notoSans: "'Noto Sans', sans-serif",
  playfairDisplay: "'Playfair Display', serif",
  libreBaskerville: "'Libre Baskerville', serif",
  crimsonText: "'Crimson Text', serif",
  spectral: "'Spectral', serif",
  inconsolata: "'Inconsolata', monospace",
  sourceCodePro: "'Source Code Pro', monospace",
  spaceMono: "'Space Mono', monospace",
  comfortaa: "'Comfortaa', cursive",
  caveat: "'Caveat', cursive",
  dancingScript: "'Dancing Script', cursive",
  indieFlower: "'Indie Flower', cursive",
  permanentMarker: "'Permanent Marker', cursive",
  architectsDaughter: "'Architects Daughter', cursive",
  oswald: "'Oswald', sans-serif",
  robotoSlab: "'Roboto Slab', serif",
  zillaSlab: "'Zilla Slab', serif",
  exo2: "'Exo 2', sans-serif",
  orbitron: "'Orbitron', sans-serif",
  barlow: "'Barlow', sans-serif",
  titilliumWeb: "'Titillium Web', sans-serif",
  abrilFatface: "'Abril Fatface', cursive",
  fredokaOne: "'Fredoka One', cursive",
} as const;

export const fontSizes = {
  tiny: {
    xs: "9px", sm: "10px", md: "12px", lg: "14px", xl: "17px", xxl: "20px",
  },
  compact: {
    xs: "10px", sm: "11px", md: "13px", lg: "15px", xl: "18px", xxl: "22px",
  },
  normal: {
    xs: "11px", sm: "12px", md: "14px", lg: "16px", xl: "20px", xxl: "24px",
  },
  large: {
    xs: "12px", sm: "14px", md: "16px", lg: "19px", xl: "24px", xxl: "28px",
  },
  comfy: {
    xs: "13px", sm: "15px", md: "17px", lg: "20px", xl: "26px", xxl: "32px",
  },
  xlarge: {
    xs: "14px", sm: "16px", md: "19px", lg: "23px", xl: "30px", xxl: "36px",
  },
} as const;

export type FontFamily = keyof typeof fontFamilies;
export type FontSize = keyof typeof fontSizes;

export type FontSizeTokens = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};