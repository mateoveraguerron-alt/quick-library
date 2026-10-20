# Quickfy UI — guía de diseño para agentes e IAs

> **Lee este archivo COMPLETO antes de crear o modificar cualquier interfaz en Quickfy.**
> Esta carpeta (`src/Quick-Library/`) es la ÚNICA fuente de componentes visuales de la app.
> Aquí no se usa MUI. Todo el código nuevo se construye con estos componentes.

---

## 1. Reglas de oro (no negociables)

1. **Sin MUI.** Nunca importes de `@mui/*` dentro de `components/ui/` ni en código nuevo. MUI solo existe en pantallas antiguas pendientes de migrar.
2. **Sin bordes.** Nunca uses `border` ni `outline` para separar un elemento de su fondo. La separación se logra SOLO con contraste de fondos:
   `--bg` → `--bg-secondary` → `--bg-muted` / `--bg-hover` / `--bg-active`.
   - **Única excepción 1:** foco de teclado (`:focus-visible` / `:focus-within`) con `outline: 2px solid var(--focus-ring)`. Es accesibilidad, no decoración.
   - **Única excepción 2:** `box-shadow: var(--edge)` en superficies. Vale `0` en todos los temas salvo `highContrast`, donde dibuja un anillo de 1px (se activa solo en `ui.css`).
   - Si el dueño pide un borde concreto en un caso concreto, lo pedirá explícitamente.
3. **Sin colores fijos.** Nada de `#fff`, `rgb()` ni `rgba()` sueltos. Siempre `var(--…)`. (Excepciones aceptadas: `#fff` sobre `--error` en el botón danger; `rgba(0,0,0,.5)` del overlay, ya definido como `--overlay`.)
4. **Sin tamaños de letra fijos.** Nunca `font-size: 14px`. Siempre `var(--font-xs|sm|md|lg|xl|xxl)` (los controla el usuario desde Ajustes → Tipografía).
5. **Radios solo de tokens:** `var(--radius-sm|md|lg|xl|full)`.
6. **Iconos solo con `<Icon name="…" />`.** Prohibido importar de `lucide-react` fuera de `Icon.tsx`. Prohibido `@mui/icons-material`.
7. **Importa desde el barrel:** `import { Button, Card } from '@/components/ui'` (ajusta el alias). Nunca desde archivos internos.
8. **Todo estilo vive en `Nombre.module.css`** (CSS Modules). Sin estilos inline salvo valores dinámicos (ej. `width` de una barra, `gap` vía token en `Stack`). Sin Tailwind, sin styled-components, sin Emotion.
9. **Accesibilidad no es opcional** (ver §8).
10. **Los temas se cambian en los stores de Zustand** (`useThemeStore`, `useTypographyStore`). `initCssVars()` los vuelca a variables CSS. Los componentes NO leen los stores: solo usan `var(--…)`.

---

## 2. Estructura

```
src/Quick-Library
├── index.ts            ← barrel: exporta TODO lo público
├── ui.css              ← base global + tokens derivados (importar 1 vez en main.tsx)
├── utils.ts            ← cx() para unir clases
├── Icon.tsx            ← único punto de contacto con lucide-react
├── Button.tsx / Button.module.css
├── …un par .tsx + .module.css por componente
├── UiKit.tsx           ← página de desarrollo: muestra todo (no exportar en producción)
└── README.md           ← este archivo
src/theme/cssVars.ts    ← initCssVars(): stores → variables CSS
```

`main.tsx` debe hacer, en este orden: `import './components/ui/ui.css'` → `initCssVars()` → rehidratar stores → `createRoot(...)`.

---

## 3. Anatomía de un componente (plantilla a copiar)

```tsx
// MiComponente.tsx
import { forwardRef, type HTMLAttributes } from 'react'
import { cx } from './utils'
import styles from './MiComponente.module.css'

export interface MiComponenteProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'muted'      // variantes = strings literales, con valor por defecto
  size?: 'sm' | 'md' | 'lg'          // tamaños: SIEMPRE sm | md | lg (xs/xl solo si hace falta)
}

export const MiComponente = forwardRef<HTMLDivElement, MiComponenteProps>(function MiComponente(
  { variant = 'default', size = 'md', className, ...props },
  ref
) {
  return <div ref={ref} className={cx(styles.root, styles[variant], styles[size], className)} {...props} />
})
```

```css
/* MiComponente.module.css */
.root { border-radius: var(--radius-md); font-family: var(--font-family); transition: background var(--transition-fast); }
.default { background: var(--bg-secondary); box-shadow: var(--edge); }
.muted   { background: var(--bg-muted);     box-shadow: var(--edge); }
.sm { padding: var(--space-sm); font-size: var(--font-sm); }
.md { padding: var(--space-md); font-size: var(--font-md); }
.lg { padding: var(--space-lg); font-size: var(--font-lg); }
```

**Convenciones del patrón**

- **Un componente = un `.tsx` + un `.module.css`.** Exportación con nombre (no `default`). Props exportadas como `NombreProps`.
- **Extiende los atributos nativos** del elemento (`ButtonHTMLAttributes`, `HTMLAttributes<HTMLDivElement>`…) y propágalos con `...props`.
- **`forwardRef`** en todo lo que envuelva un elemento DOM interactivo o medible.
- **`className` siempre se fusiona con `cx()`**, nunca se pisa.
- **Variantes con `variant`, tamaños con `size`.** No inventes props booleanas sueltas (`isPrimary`, `big`…). Booleanas solo para estados reales (`loading`, `fullWidth`, `elevated`, `interactive`).
- **Controles de formulario** (`Input`, `Textarea`, `Select`) usan `<Field>` (label + hint + error enlazados con `aria-describedby`). `className` va al contenedor externo; `ref` apunta al control nativo.
- **Componentes complejos (Dialog, Select, Menu, Tooltip, Tabs, Checkbox, Switch) se construyen sobre Radix UI** (`@radix-ui/react-*`): Radix pone accesibilidad y comportamiento; nosotros ponemos el CSS. Estilos de estado vía atributos `data-*` (`[data-state="checked"]`, `[data-highlighted]`, `[data-disabled]`).
- **Estados visuales estándar** (copiar tal cual):
  - hover → siguiente escalón de fondo: `--bg-secondary` → `--bg-hover`; `--bg-hover` → `--bg-active`
  - active/pressed → `transform: scale(0.98)` o `--bg-active`
  - disabled → `opacity: 0.5; cursor: not-allowed`
  - foco → `outline: 2px solid var(--focus-ring); outline-offset: 2px`
  - error → fondo `--error-bg` + texto `--error` (nunca borde rojo)
- **Animaciones:** solo `opacity` y `transform`, con `var(--transition-fast|base|slow)`. `ui.css` ya respeta `prefers-reduced-motion`.

---

## 4. Tokens disponibles (variables CSS)

Los valores de tema los escribe `initCssVars()` desde los stores; los derivados viven en `ui.css`.

| Grupo | Variables |
|---|---|
| **Fondos (por tema)** | `--bg` `--bg-secondary` `--bg-muted` `--bg-hover` `--bg-active` |
| **Texto (por tema)** | `--text` `--text-muted` |
| **Acento (por tema)** | `--accent` `--accent-text` `--on-accent` (texto legible sobre accent, calculado) |
| **Otros del tema** | `--border` (⚠ solo vía `--edge`) `--darkbg` `--fondo-para-planner` |
| **Semánticos** | `--error` `--error-bg` · `--success` `--success-bg` `--success-dark` `--success-dark-hover` · `--warning` `--warning-bg` · `--info` `--info-bg` (existen también `*-border`: **no los uses**, regla sin bordes) |
| **Espaciado** (1 = 8px) | `--space-xs` 4px · `--space-sm` 8px · `--space-md` 16px · `--space-lg` 24px · `--space-xl` 32px · `--space-xxl` 40px |
| **Radios** | `--radius-sm` 6 · `--radius-md` 10 · `--radius-lg` 12 · `--radius-xl` 24 · `--radius-full` |
| **Tipografía** | `--font-family` · `--font-xs` `--font-sm` `--font-md` `--font-lg` `--font-xl` `--font-xxl` |
| **Transiciones** | `--transition-fast` `--transition-base` `--transition-slow` |
| **Sombras** | `--shadow-sm` `--shadow-md` `--shadow-lg` `--shadow-xl` `--shadow-modal` `--shadow-card` |
| **Derivados (ui.css)** | `--surface-input` (campos) · `--surface-floating` (menús/selects/diálogos) · `--overlay` · `--focus-ring` · `--edge` · `--ui-edge` |
| **Capas (z-index)** | `--z-dialog` 1000 · `--z-popover` 1100 · `--z-tooltip` 1200 |

**Qué superficie usar:** página → `--bg` · tarjeta/panel → `--bg-secondary` · tarjeta dentro de tarjeta, campos, pistas de progreso → `--bg-muted` · hover → `--bg-hover` · seleccionado/activo → `--bg-active` · flotantes → `--surface-floating` + `--shadow-lg`.

**Espaciado:** usa `--space-*` cuando el valor exista. Los `px` literales solo se aceptan para dimensiones finas internas de un control (alto de un icono-botón, padding de 4/12px). **Nunca** para tipografía, colores ni radios.

---

## 5. Catálogo

| Componente | Úsalo para | Props clave |
|---|---|---|
| `Icon` | Cualquier icono | `name` (PascalCase de lucide) · `size: xs\|sm\|md\|lg\|xl` · `label` (si va solo, sin texto) |
| `Button` | Acciones con texto | `variant: primary\|secondary\|ghost\|danger` · `size` · `icon` · `loading` · `fullWidth` |
| `IconButton` | Acción solo con icono | `icon` · **`label` obligatorio** · `variant: ghost\|secondary\|primary\|danger` · `size` |
| `Text` | TODO el texto | `as: p\|span\|div\|h1-h4\|label` · `size` · `weight` · `tone: default\|muted\|accent\|error\|success\|warning` · `align` · `truncate` |
| `Stack` | Layout flex (reemplaza `Box`) | `direction: row\|column` · `gap: none\|xs…xxl` · `align` · `justify` · `wrap` |
| `Card` / `CardHeader` | Paneles y tarjetas | `variant: default\|muted\|flat` · `padding` · `elevated` · `interactive` · header: `title` `subtitle` `icon` `action` |
| `Input` / `Textarea` | Texto | `label` `hint` `error` · `icon` (solo Input) · `size` |
| `Select` | Lista desplegable | `options[{value,label,disabled}]` · `value`/`onValueChange` · `label` `hint` `error` |
| `Checkbox` / `Switch` | Booleanos | `label` · `checked` (Checkbox admite `"indeterminate"`) · `onCheckedChange` |
| `Badge` | Etiquetas de estado | `variant: neutral\|accent\|success\|warning\|error\|info` · `size: sm\|md` · `icon` |
| `Alert` | Avisos en la página | `variant: info\|success\|warning\|error` · `title` · `onClose` |
| `Spinner` / `ProgressBar` | Carga / progreso | Spinner: `size` `label` · ProgressBar: `value` 0-100 `label` `showValue` `tone` |
| `Tooltip` | Ayuda al pasar el mouse | `content` · `side` · `delay` — el hijo debe aceptar `ref` |
| `Dialog` / `ConfirmDialog` | Modales | Dialog: `open` `onOpenChange` `title` `description` `footer` `size` · Confirm: `danger` `onConfirm` (admite async) |
| `Menu` | Menú desplegable | `trigger` · `items[{label,icon,onSelect,danger,disabled}\|{separator:true}]` |
| `Tabs` | Pestañas | compuesto: `Tabs` `TabsList` `TabsTrigger(icon)` `TabsContent` |
| `Table` | Tablas de datos | `Table(density, stickyHeader)` `TableHead` `TableBody` `TableRow(selected)` `TableHeaderCell(align)` `TableCell(align)` |
| `EmptyState` | Pantallas sin datos | `icon` `title` `description` `action` |

**Equivalencias al migrar desde MUI**

| MUI | Quickfy UI |
|---|---|
| `Box`, `Stack` | `Stack` (o un `div` con CSS Module) |
| `Typography` | `Text` |
| `Button` | `Button` |
| `IconButton` | `IconButton` |
| `TextField` | `Input` / `Textarea` / `Select` |
| `Checkbox`, `Switch`, `FormControlLabel` | `Checkbox` / `Switch` (con `label`) |
| `Dialog` (+ Title/Content/Actions) | `Dialog` (`title` / children / `footer`) |
| `Menu` + `MenuItem` | `Menu` |
| `Tooltip` | `Tooltip` |
| `Chip` | `Badge` |
| `Alert` / `Snackbar` | `Alert` (Snackbar: pendiente → Toast) |
| `CircularProgress` / `LinearProgress` | `Spinner` / `ProgressBar` |
| `Card`, `Paper` | `Card` |
| `Table*` | `Table*` |
| `Tabs`, `Tab` | `Tabs`, `TabsTrigger` |
| `@mui/icons-material` | `Icon` (ver §7) |

---

## 6. Cómo agregar un componente nuevo (checklist)

1. ¿Ya existe algo que lo cubra o se pueda componer con lo existente? Si sí, **compón** (ej. un `StudentCard` = `Card` + `CardHeader` + `Badge`, en la carpeta del módulo, no en `ui/`).
2. En `ui/` solo entra lo **genérico y reutilizable en 2+ módulos**. Lo específico de un módulo (rúbricas, asistencia…) vive en ese módulo, construido con `ui/`.
3. Crea `Nombre.tsx` + `Nombre.module.css` siguiendo la plantilla de §3.
4. Si necesita comportamiento complejo (overlay, foco atrapado, teclado, posicionamiento) → **Radix**, no lo escribas a mano.
5. Solo `var(--…)`. Revisa las reglas de oro.
6. Exporta en `index.ts` (componente + tipo de props).
7. Agrégalo a `UiKit.tsx` y míralo al menos en 3 temas: uno claro (`arctic`), uno oscuro (`dark`) y `highContrast`.
8. Añade su fila al catálogo de §5.

## 7. Cómo agregar un icono

1. Busca el nombre en <https://lucide.dev/icons> (viene en kebab-case: `arrow-left`).
2. En `Icon.tsx` impórtalo en PascalCase (`ArrowLeft`) y agrégalo al objeto `ICONS`. Solo se empaquetan los listados.
3. Úsalo: `<Icon name="ArrowLeft" />`. El tipo `IconName` se actualiza solo.
4. Si el nombre no existe en tu versión de `lucide-react`, TypeScript lo marca al importarlo.

---

## 8. Accesibilidad (checklist)

- `IconButton` **siempre** con `label`. Un `Icon` suelto que comunica algo necesita `label`; decorativo → sin `label` (queda `aria-hidden`).
- Todo campo con `label` (aunque sea visualmente discreto). Errores con `error="…"` (se anuncian con `role="alert"`).
- Foco visible en todo lo interactivo; no lo quites (`outline: none` solo si lo reemplazas por otro indicador, como hace `Input` con `:focus-within`).
- Tamaño mínimo de objetivo táctil/clic razonable: botones ≥ 28px de alto.
- No transmitas información solo con color: acompaña con texto o icono (`Badge`, `Alert` ya lo hacen).
- `Dialog` exige `title`. No lo ocultes; si no quieres mostrarlo, créalo con otro componente.
- Navegación por teclado: Tab, Enter/Espacio, Escape y flechas deben funcionar (Radix lo cubre; en componentes propios, pruébalo).

---

## 9. Antipatrones (con su corrección)

```tsx
// ❌ Color y tamaño fijos, borde, MUI
<Box sx={{ border: '1px solid #ccc', fontSize: 14, color: '#333' }}>…</Box>

// ✅ Tokens y contraste de fondo
<Card><Text size="md">…</Text></Card>
```

```tsx
// ❌ Importar el icono directo
import { Trash2 } from 'lucide-react'
<Trash2 size={18} />

// ✅ A través del wrapper
<Icon name="Trash2" size="sm" />
```

```css
/* ❌ */ .card { border: 1px solid var(--border); background: #1e1e1e; font-size: 13px; }
/* ✅ */ .card { background: var(--bg-secondary); box-shadow: var(--edge); font-size: var(--font-sm); }
```

```tsx
// ❌ Leer el store dentro de un componente de ui/ para pintar
const theme = useThemeStore((s) => s.theme)
<div style={{ background: theme.bg }} />

// ✅ Variable CSS (no re-renderiza al cambiar de tema)
<div className={styles.root} />   /* .root { background: var(--bg); } */
```

Si de verdad necesitas un color del tema en JavaScript (canvas, gráficos), usa `useThemeStore` **fuera** de `ui/`.

---

## 10. Pendientes conocidos (no inventes versiones paralelas: constrúyelos aquí)

`Toast` (reemplaza `Snackbar`) · `Avatar` · `Skeleton` · `Popover` · `ContextMenu` · `Slider` · `DatePicker` · tabla con ordenamiento/selección. Excepciones por tema (p. ej. `highContrast`) se ajustan en `ui.css`, nunca dentro de cada componente.
