import { type HTMLAttributes } from 'react'
import { Icon, type IconName } from './Icon'
import { cx } from './utils'
import styles from './Badge.module.css'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
  icon?: IconName
}

/** Reemplazo de <Chip> de MUI (estático). Para estados: "Pro", "Pendiente", "Aprobado"... */
export function Badge({ variant = 'neutral', size = 'md', icon, className, children, ...props }: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[variant], styles[size], className)} {...props}>
      {icon && <Icon name={icon} size="xs" />}
      {children}
    </span>
  )
}
