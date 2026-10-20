import { useId, type ReactNode } from 'react'
import { cx } from './utils'
import styles from './Field.module.css'

/** Id estable para enlazar label ↔ control. Respeta el `id` que pase el usuario. */
export function useFieldId(id?: string) {
  const generated = useId()
  return id ?? generated
}

/** Atributos ARIA comunes de un control con hint/error. */
export function fieldAria(id: string, { hint, error }: { hint?: string; error?: string }) {
  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const
}

export interface FieldProps {
  id: string
  label?: string
  hint?: string
  error?: string
  required?: boolean
  className?: string
  children: ReactNode
}

export function Field({ id, label, hint, error, required, className, children }: FieldProps) {
  return (
    <div className={cx(styles.field, className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${id}-error`} className={styles.error} role="alert">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className={styles.hint}>{hint}</p>
      ) : null}
    </div>
  )
}
