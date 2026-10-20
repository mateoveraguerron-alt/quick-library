import { cx } from './utils'
import styles from './Spinner.module.css'

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  /** Texto accesible. Si se omite, el spinner se oculta a lectores de pantalla (útil dentro de botones). */
  label?: string
  className?: string
}

const PX = { sm: 14, md: 18, lg: 24 } as const

export function Spinner({ size = 'md', label, className }: SpinnerProps) {
  const px = PX[size]
  return (
    <svg
      className={cx(styles.spinner, className)}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
