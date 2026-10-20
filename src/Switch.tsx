import * as RadixSwitch from '@radix-ui/react-switch'
import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cx } from './utils'
import styles from './Switch.module.css'

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<typeof RadixSwitch.Root>, 'children'> {
  label?: ReactNode
}

export function Switch({ label, className, ...props }: SwitchProps) {
  return (
    <label className={cx(styles.wrap, props.disabled && styles.disabled, className)}>
      <RadixSwitch.Root className={styles.track} {...props}>
        <RadixSwitch.Thumb className={styles.thumb} />
      </RadixSwitch.Root>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
