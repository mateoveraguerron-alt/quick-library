import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from './Icon'
import { cx } from './utils'
import styles from './IconButton.module.css'

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: IconName
  /** OBLIGATORIO: nombre accesible (aria-label y tooltip nativo). */
  label: string
  variant?: 'ghost' | 'secondary' | 'primary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, variant = 'ghost', size = 'md', className, type = 'button', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cx(styles.btn, styles[variant], styles[size], className)}
      {...props}
    >
      <Icon name={icon} size={size} />
    </button>
  )
})
