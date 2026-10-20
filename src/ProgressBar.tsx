import { Text } from './Text'
import { cx } from './utils'
import styles from './ProgressBar.module.css'

export interface ProgressBarProps {
  /** 0 a 100 */
  value: number
  label?: string
  showValue?: boolean
  tone?: 'accent' | 'success' | 'warning' | 'error'
  className?: string
  ariaLabel?: string
}

/** Reemplazo de <LinearProgress> de MUI. */
export function ProgressBar({ value, label, ariaLabel, showValue, tone = 'accent', className }: ProgressBarProps) {
  const v = Math.min(100, Math.max(0, value))
  return (
    <div className={cx(styles.wrap, className)}>
      {(label || showValue) && (
        <div className={styles.top}>
          {label && <Text as="span" size="sm" tone="muted">{label}</Text>}
          {showValue && <Text as="span" size="sm" weight="medium">{Math.round(v)}%</Text>}
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={Math.round(v)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? label}
      >
        <div className={cx(styles.fill, styles[tone])} style={{ width: `${v}%` }} />
      </div>
    </div>
  )
}
