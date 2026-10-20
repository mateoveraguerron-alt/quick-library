import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from './Icon'
import { Text } from './Text'
import { cx } from './utils'
import styles from './OptionCard.module.css'

export interface OptionCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  label: string
  description?: string
  icon?: IconName
  selected: boolean
}

/** Tarjeta seleccionable (una opción entre varias): escalas, modos, planes... Muestra ✓ cuando está elegida. */
export const OptionCard = forwardRef<HTMLButtonElement, OptionCardProps>(function OptionCard(
  { label, description, icon, selected, className, type = 'button', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={cx(styles.card, selected && styles.selected, className)}
      {...props}
    >
      {icon && <Icon name={icon} size="sm" className={styles.icon} />}
      <span className={styles.text}>
        <Text as="span" size="sm" weight="semibold">{label}</Text>
        {description && <Text as="span" size="xs" tone="muted">{description}</Text>}
      </span>
      {selected && <Icon name="Check" size="sm" className={styles.check} />}
    </button>
  )
})
