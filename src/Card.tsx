import { forwardRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import { Text } from './Text'
import { cx } from './utils'
import styles from './Card.module.css'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** default = superficie secundaria · muted = hundida (para tarjetas dentro de tarjetas) · flat = igual al fondo */
  variant?: 'default' | 'muted' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Añade sombra. */
  elevated?: boolean
  /** Resalta al pasar el mouse. Si además tiene onClick, se vuelve accesible con teclado. */
  interactive?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', padding = 'md', elevated, interactive, className, onClick, onKeyDown, ...props },
  ref
) {
  const clickable = interactive && !!onClick
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e)
    if (clickable && !e.defaultPrevented && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      e.currentTarget.click()
    }
  }
  return (
    <div
      ref={ref}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cx(
        styles.card, styles[variant], styles[`pad-${padding}`],
        elevated && styles.elevated, interactive && styles.interactive, className
      )}
      {...props}
    />
  )
})

export interface CardHeaderProps {
  title: string
  subtitle?: string
  icon?: IconName
  /** Zona derecha: botones, badges, menú... */
  action?: ReactNode
}

export function CardHeader({ title, subtitle, icon, action }: CardHeaderProps) {
  return (
    <div className={styles.header}>
      {icon && <span className={styles.headerIcon}><Icon name={icon} size="md" /></span>}
      <div className={styles.headerText}>
        <Text as="h3" size="lg" weight="semibold" truncate>{title}</Text>
        {subtitle && <Text size="sm" tone="muted" truncate>{subtitle}</Text>}
      </div>
      {action && <div className={styles.headerAction}>{action}</div>}
    </div>
  )
}
