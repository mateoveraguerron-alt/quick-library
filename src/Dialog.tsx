import * as RadixDialog from '@radix-ui/react-dialog'
import { type ReactNode } from 'react'
import { IconButton } from './IconButton'
import { Text } from './Text'
import { cx } from './utils'
import styles from './Dialog.module.css'

export interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Obligatorio por accesibilidad (se anuncia al abrir). */
  title: string
  description?: string
  children?: ReactNode
  /** Zona inferior, normalmente botones: <Button variant="ghost">Cancelar</Button><Button>Guardar</Button> */
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
  hideClose?: boolean
  /** Se fusiona con las clases del contenedor del diálogo (ej. para un tamaño propio). */
  className?: string
  /** Se fusiona con las clases de la zona de contenido (ej. para quitar padding o hacer layouts a altura completa). */
  bodyClassName?: string
  /**
   * Se ejecuta al interactuar fuera del diálogo (clic o foco).
   * Llama a `event.preventDefault()` para impedir que se cierre.
   */
  onInteractOutside?: (event: Event) => void
}

export function Dialog({
  open, onOpenChange, title, description, children, footer, size = 'md', hideClose,
  className, bodyClassName, onInteractOutside,
}: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        <RadixDialog.Content
          className={cx(styles.content, styles[size], className)}
          onInteractOutside={onInteractOutside}
          {...(description ? {} : { 'aria-describedby': undefined })}
        >
          <div className={styles.header}>
            <div className={styles.titles}>
              <RadixDialog.Title asChild>
                <Text as="h2" size="xl" weight="semibold">{title}</Text>
              </RadixDialog.Title>
              {description && (
                <RadixDialog.Description asChild>
                  <Text size="md" tone="muted">{description}</Text>
                </RadixDialog.Description>
              )}
            </div>
            {!hideClose && (
              <RadixDialog.Close asChild>
                <IconButton icon="X" label="Cerrar" size="sm" />
              </RadixDialog.Close>
            )}
          </div>
          {children && <div className={cx(styles.body, bodyClassName)}>{children}</div>}
          {footer && <div className={styles.footer}>{footer}</div>}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}