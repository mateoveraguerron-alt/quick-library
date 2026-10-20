import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { Icon } from './Icon'
import { cx } from './utils'
import styles from './Checkbox.module.css'

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, 'children'> {
  label?: ReactNode
}

/** `checked` acepta true | false | "indeterminate". Usa onCheckedChange. */
export function Checkbox({ label, className, checked, ...props }: CheckboxProps) {
  return (
    <label className={cx(styles.wrap, props.disabled && styles.disabled, className)}>
      <RadixCheckbox.Root className={styles.box} checked={checked} {...props}>
        <RadixCheckbox.Indicator className={styles.indicator}>
          <Icon name={checked === 'indeterminate' ? 'Minus' : 'Check'} size="xs" strokeWidth={3} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
