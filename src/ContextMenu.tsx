import type { ReactElement } from 'react'
import * as RCM from '@radix-ui/react-context-menu'
import { Icon, type IconName } from './Icon'
import styles from './ContextMenu.module.css'

/** Un ítem normal (con label) o un separador (separator: true) */
export interface ContextMenuItemDef {
  label?: string
  icon?: IconName
  onSelect?: () => void
  danger?: boolean
  disabled?: boolean
  separator?: boolean
}

export interface ContextMenuProps {
  items: ContextMenuItemDef[]
  /** Elemento que abre el menú con click derecho (debe aceptar ref) */
  children: ReactElement
}

export function ContextMenu({ items, children }: ContextMenuProps) {
  return (
    <RCM.Root>
      <RCM.Trigger asChild>{children}</RCM.Trigger>
      <RCM.Portal>
        <RCM.Content className={styles.content} alignOffset={4}>
          {items.map((item, i) =>
            item.separator ? (
              <RCM.Separator key={`sep-${i}`} className={styles.separator} />
            ) : (
              <RCM.Item
                key={item.label ?? `item-${i}`}
                className={styles.item}
                data-danger={item.danger || undefined}
                disabled={item.disabled}
                onSelect={() => item.onSelect?.()}
              >
                {item.icon && <Icon name={item.icon} size="sm" />}
                <span>{item.label}</span>
              </RCM.Item>
            )
          )}
        </RCM.Content>
      </RCM.Portal>
    </RCM.Root>
  )
}