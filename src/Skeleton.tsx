import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react'
import { cx } from './utils'
import styles from './Skeleton.module.css'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'strong'
  /** Valores dinámicos: número = px, string = cualquier unidad CSS. */
  width?: number | string
  height?: number | string
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { variant = 'default', width, height, className, style, ...props },
  ref
) {
  const size: CSSProperties = { width, height, ...style }
  return <div ref={ref} aria-hidden="true" className={cx(styles.root, styles[variant], className)} style={size} {...props} />
})