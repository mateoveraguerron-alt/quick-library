import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from './Icon'
import { Spinner } from './Spinner'
import { cx } from './utils'
import styles from './Button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
  size?: 'sm' | 'md' | 'lg'
  /** Icono a la izquierda del texto. */
  icon?: IconName
  /** Deshabilita el botón y muestra un spinner. */
  loading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', icon, loading, fullWidth, className, children, type = 'button', disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(styles.btn, styles[variant], styles[size], fullWidth && styles.full, className)}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : icon && <Icon name={icon} size={size} />}
      {children}
    </button>
  )
})