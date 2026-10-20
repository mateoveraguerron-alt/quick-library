import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import { type CSSProperties, type ReactElement } from 'react'
import { Icon, type IconName } from './Icon'
import { cx } from './utils'
import styles from './Menu.module.css'

export type MenuItem =
  | { label: string; icon?: IconName; onSelect: () => void; danger?: boolean; disabled?: boolean }
  | { separator: true }
  | { heading: string }

/** Ancla virtual: coordenadas del viewport (clic derecho) o un elemento ya existente. */
export type MenuAnchor = { x: number; y: number } | HTMLElement

export interface MenuProps {
  /** Elemento que abre el menú (un Button o IconButton). Omítelo si usas `anchor`. */
  trigger?: ReactElement
  items: MenuItem[]
  align?: 'start' | 'center' | 'end'
  /** Modo controlado (necesario con `anchor`). */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Abre el menú en un punto/elemento sin trigger visible (menú contextual, menú anclado). */
  anchor?: MenuAnchor | null
}

const anchorStyle = (a: MenuAnchor): CSSProperties => {
  if (a instanceof HTMLElement) {
    const r = a.getBoundingClientRect()
    return { left: r.left, top: r.top, width: r.width, height: r.height }
  }
  return { left: a.x, top: a.y, width: 0, height: 0 }
}

/** Reemplazo de <Menu>/<MenuItem> de MUI. */
export function Menu({ trigger, items, align = 'end', open, onOpenChange, anchor }: MenuProps) {
  if (!trigger && !anchor) return null

  const anchored = !trigger
  const virtualTrigger = anchor ? (
    <span aria-hidden="true" className={styles.anchor} style={anchorStyle(anchor)} />
  ) : null

  return (
    <RadixMenu.Root open={open} onOpenChange={onOpenChange}>
      <RadixMenu.Trigger asChild>{trigger ?? virtualTrigger}</RadixMenu.Trigger>
      <RadixMenu.Portal>
        <RadixMenu.Content
          className={styles.content}
          align={anchored ? 'start' : align}
          sideOffset={4}
          // con ancla virtual no hay a quién devolver el foco
          onCloseAutoFocus={anchored ? (e) => e.preventDefault() : undefined}
        >
          {items.map((item, i) => {
            if ('separator' in item) return <RadixMenu.Separator key={i} className={styles.separator} />
            if ('heading' in item) return <RadixMenu.Label key={i} className={styles.heading}>{item.heading}</RadixMenu.Label>
            return (
              <RadixMenu.Item
                key={i}
                disabled={item.disabled}
                onSelect={item.onSelect}
                className={cx(styles.item, item.danger && styles.danger)}
              >
                {item.icon && <Icon name={item.icon} size="sm" />}
                {item.label}
              </RadixMenu.Item>
            )
          })}
        </RadixMenu.Content>
      </RadixMenu.Portal>
    </RadixMenu.Root>
  )
}