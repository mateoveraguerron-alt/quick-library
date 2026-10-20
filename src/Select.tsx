import * as RadixSelect from '@radix-ui/react-select'
import { Field, fieldAria, useFieldId } from './Field'
import { Icon } from './Icon'
import { cx } from './utils'
import styles from './Select.module.css'

export interface SelectOption {
  /** No puede ser cadena vacía (limitación de Radix). */
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** Nombre accesible cuando no hay `label` visible. */
  'aria-label'?: string
}

export function Select({
  options, value, defaultValue, onValueChange, placeholder = 'Selecciona…',
  label, hint, error, disabled, required, name, id, size = 'md', className, 'aria-label': ariaLabel,
}: SelectProps) {
  const fid = useFieldId(id)
  return (
    <Field id={fid} label={label} hint={hint} error={error} required={required} className={className}>
      <RadixSelect.Root
        value={value} defaultValue={defaultValue} onValueChange={onValueChange}
        disabled={disabled} required={required} name={name}
      >
        <RadixSelect.Trigger
          id={fid}
          aria-label={ariaLabel}
          className={cx(styles.trigger, styles[size], error && styles.invalid)}
          {...fieldAria(fid, { hint, error })}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon asChild><Icon name="ChevronDown" size="sm" /></RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className={styles.content} position="popper" sideOffset={4}>
            <RadixSelect.Viewport className={styles.viewport}>
              {options.map((o) => (
                <RadixSelect.Item key={o.value} value={o.value} disabled={o.disabled} className={styles.item}>
                  <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className={styles.indicator}>
                    <Icon name="Check" size="sm" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </Field>
  )
}
