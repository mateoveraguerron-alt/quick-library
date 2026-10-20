import { forwardRef, type MouseEventHandler, type ReactElement, type ReactNode } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import { cx } from './utils'
import styles from './Popover.module.css'

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Elemento que abre y cierra el popover al hacer clic (toggle). Debe aceptar `ref`. */
  trigger?: ReactElement
  /** Elemento que solo sirve de referencia para posicionar; la apertura la controla el padre con `open`. */
  anchor?: ReactElement
  children: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  className?: string
  /** Llama a `event.preventDefault()` para impedir el cierre (útil si hay otra capa abierta encima). */
  onInteractOutside?: (event: Event) => void
  /**
   * Se ejecuta al abrir, antes de mover el foco. Llama a `event.preventDefault()` para
   * elegir tú qué elemento recibe el foco (por defecto Radix enfoca el primero enfocable).
   */
  onOpenAutoFocus?: (event: Event) => void
  /**
   * Clic dentro del panel. Los eventos de React atraviesan el portal y llegan a los
   * ancestros del popover; usa `e.stopPropagation()` si vive dentro de algo clicable.
   */
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  {
    open, defaultOpen, onOpenChange, trigger, anchor, children,
    side = 'bottom', align = 'start', sideOffset = 4, className,
    onInteractOutside, onOpenAutoFocus, onClick,
  },
  ref
) {
  return (
    <RadixPopover.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>}
      {anchor && <RadixPopover.Anchor asChild>{anchor}</RadixPopover.Anchor>}
      <RadixPopover.Portal>
        <RadixPopover.Content
          ref={ref}
          className={cx(styles.content, className)}
          side={side}
          align={align}
          sideOffset={sideOffset}
          collisionPadding={8}
          onInteractOutside={onInteractOutside}
          onOpenAutoFocus={onOpenAutoFocus}
          onClick={onClick}
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
})