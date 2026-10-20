import { type HTMLAttributes } from 'react'
import { cx } from './utils'
import styles from './Text.module.css'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Etiqueta HTML semántica. Elige por significado (h1-h4 para títulos), no por tamaño. */
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'label'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  tone?: 'default' | 'muted' | 'accent' | 'error' | 'success' | 'warning'
  align?: 'left' | 'center' | 'right'
  /** Una sola línea con "…" si no cabe. */
  truncate?: boolean
}

export function Text({
  as: Tag = 'p', size = 'md', weight = 'regular', tone = 'default', align, truncate, className, ...props
}: TextProps) {
  return (
    <Tag
      className={cx(
        styles.text, styles[`size-${size}`], styles[`weight-${weight}`], styles[`tone-${tone}`],
        align && styles[`align-${align}`], truncate && styles.truncate, className
      )}
      {...props}
    />
  )
}
