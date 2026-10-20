import { forwardRef, useId, useMemo, useState, type KeyboardEvent } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Input } from './Input'
import { cx } from './utils'
import styles from './Combobox.module.css'

export interface ComboboxOption {
  value: string
  label: string
  /** Texto secundario (se muestra debajo y también se usa al filtrar) */
  description?: string
}

export interface ComboboxProps {
  options: ComboboxOption[]
  /** Texto actual del campo */
  value: string
  /** Se dispara al escribir y al elegir una opción */
  onValueChange: (value: string) => void
  label?: string
  hint?: string
  error?: string
  placeholder?: string
  disabled?: boolean
  /** Permite valores que no están en la lista (por defecto true) */
  freeSolo?: boolean
  className?: string
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  { options, value, onValueChange, label, hint, error, placeholder, disabled, freeSolo = true, className },
  ref
) {
  const listId = useId()
  const [open, setOpen] = useState(false)
  const [activo, setActivo] = useState(0)

  const filtradas = useMemo(() => {
    const q = value.trim().toLowerCase()
    if (!q) return options
    return options.filter(
      o => o.label.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q)
    )
  }, [options, value])

  const visible = open && filtradas.length > 0

  const elegir = (o: ComboboxOption) => {
    onValueChange(o.value)
    setOpen(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) return setOpen(true)
      setActivo(i => (i + 1) % Math.max(filtradas.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActivo(i => (i - 1 + filtradas.length) % Math.max(filtradas.length, 1))
    } else if (e.key === 'Enter' && visible) {
      e.preventDefault()
      elegir(filtradas[activo] ?? filtradas[0])
    } else if (e.key === 'Escape' && open) {
      e.stopPropagation() // no cierra el Dialog padre
      setOpen(false)
    }
  }

  return (
    <Popover.Root open={visible}>
      <Popover.Anchor asChild>
        <div className={cx(styles.root, className)}>
          <Input
            ref={ref}
            label={label}
            hint={hint}
            error={error}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            autoComplete="off"
            role="combobox"
            aria-expanded={visible}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={visible ? `${listId}-${activo}` : undefined}
            onFocus={() => setOpen(true)}
            onClick={() => setOpen(true)}
            onKeyDown={onKeyDown}
            onChange={e => {
              onValueChange(e.target.value)
              setActivo(0)
              setOpen(true)
            }}
            onBlur={() => {
              // pequeño retardo para permitir el click en una opción
              setTimeout(() => setOpen(false), 120)
              if (!freeSolo && !options.some(o => o.value === value)) onValueChange('')
            }}
          />
        </div>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          className={styles.lista}
          align="start"
          sideOffset={4}
          // el foco se queda en el input mientras se navega la lista
          onOpenAutoFocus={e => e.preventDefault()}
          onCloseAutoFocus={e => e.preventDefault()}
          // El cierre lo controla el Combobox (onBlur / Escape / elegir):
          // si Radix lo decidiera, el propio input contaría como "fuera".
          onInteractOutside={e => e.preventDefault()}
          onFocusOutside={e => e.preventDefault()}
          onEscapeKeyDown={e => e.preventDefault()}
        >
          <ul id={listId} role="listbox" className={styles.ul}>
            {filtradas.map((o, i) => (
              <li
                key={o.value}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === activo}
                data-active={i === activo || undefined}
                className={styles.opcion}
                onMouseEnter={() => setActivo(i)}
                onMouseDown={e => e.preventDefault()}
                onClick={() => elegir(o)}
              >
                <span className={styles.titulo}>{o.label}</span>
                {o.description && <span className={styles.descripcion}>{o.description}</span>}
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
})