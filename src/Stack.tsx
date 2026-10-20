import { forwardRef, type HTMLAttributes } from 'react'
import { cx } from './utils'
import styles from './Stack.module.css'

export type Gap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column'
  /** Espaciado entre hijos. Usa los tokens: xs=4px sm=8px md=16px lg=24px xl=32px xxl=40px. */
  gap?: Gap
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between'
  wrap?: boolean
}

/** Reemplazo de <Box display="flex"> de MUI. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { direction = 'column', gap = 'md', align, justify, wrap, className, style, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(
        styles.stack, styles[direction], align && styles[`align-${align}`],
        justify && styles[`justify-${justify}`], wrap && styles.wrap, className
      )}
      style={{ gap: gap === 'none' ? 0 : `var(--space-${gap})`, ...style }}
      {...props}
    />
  )
})
