import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { Field, fieldAria, useFieldId } from './Field'
import { cx } from './utils'
import styles from './Input.module.css'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, size = 'md', className, id, required, rows = 3, ...props },
  ref
) {
  const fid = useFieldId(id)
  return (
    <Field id={fid} label={label} hint={hint} error={error} required={required} className={className}>
      <div className={cx(styles.control, styles[size], error && styles.invalid)}>
        <textarea
          ref={ref}
          id={fid}
          rows={rows}
          required={required}
          className={cx(styles.input, styles.textarea)}
          {...fieldAria(fid, { hint, error })}
          {...props}
        />
      </div>
    </Field>
  )
})
