import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { Field, fieldAria, useFieldId } from './Field'
import { Icon, type IconName } from './Icon'
import { cx } from './utils'
import styles from './Input.module.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  hint?: string
  /** Mensaje de error. Si existe, el campo se marca como inválido. */
  error?: string
  /** Icono a la izquierda (ej. "Search"). */
  icon?: IconName
  /** Contenido a la derecha dentro del campo (ej. un IconButton para mostrar/ocultar contraseña). */
  trailing?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

/** `className` va al contenedor externo (layout). `ref` apunta al <input>. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, icon, trailing, size = 'md', className, id, required, ...props },
  ref
) {
  const fid = useFieldId(id)
  return (
    <Field id={fid} label={label} hint={hint} error={error} required={required} className={className}>
      <div className={cx(styles.control, styles[size], error && styles.invalid)}>
        {icon && <Icon name={icon} size="sm" className={styles.icon} />}
        <input
          ref={ref}
          id={fid}
          required={required}
          className={cx(styles.input, !!icon && styles.hasIcon)}
          {...fieldAria(fid, { hint, error })}
          {...props}
        />
        {trailing && <span className={styles.trailing}>{trailing}</span>}
      </div>
    </Field>
  )
})