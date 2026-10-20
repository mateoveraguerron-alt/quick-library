import * as RadixTooltip from '@radix-ui/react-tooltip'
import { type ReactElement, type ReactNode } from 'react'
import styles from './Tooltip.module.css'

export interface TooltipProps {
  content: ReactNode
  /** Un solo elemento que acepte ref (Button, IconButton, o un <button>/<span>). */
  children: ReactElement
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** ms antes de mostrarse. */
  delay?: number
}

export function Tooltip({ content, children, side = 'top', delay = 300 }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={delay}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content className={styles.content} side={side} sideOffset={6}>
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
