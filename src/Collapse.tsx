import { type ReactNode } from 'react'
import { cx } from './utils'
import styles from './Collapse.module.css'

export interface CollapseProps {
  open: boolean
  children: ReactNode
  className?: string
}

/**
 * Sección que se despliega con animación de altura (reemplaza <Collapse> de MUI).
 * Cerrada, su contenido queda oculto también para teclado y lectores de pantalla.
 * Ojo: recorta (overflow hidden) lo que sobresalga de su caja.
 */
export function Collapse({ open, children, className }: CollapseProps) {
  return (
    <div className={cx(styles.root, open && styles.open, className)} aria-hidden={!open}>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}
