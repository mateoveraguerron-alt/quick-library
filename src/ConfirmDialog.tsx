import { useState } from 'react'
import { Button } from './Button'
import { Dialog } from './Dialog'

export interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  /** Botón rojo, para acciones destructivas (eliminar, vaciar papelera...). */
  danger?: boolean
  /** Puede ser async: el botón muestra spinner y el diálogo se cierra al terminar. */
  onConfirm: () => void | Promise<void>
}

export function ConfirmDialog({
  open, onOpenChange, title, description, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', danger, onConfirm,
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm()
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => !loading && onOpenChange(o)}
      title={title}
      description={description}
      size="sm"
      hideClose
      footer={
        <>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={loading}>{cancelLabel}</Button>
          <Button variant={danger ? 'danger' : 'primary'} onClick={handleConfirm} loading={loading}>{confirmLabel}</Button>
        </>
      }
    />
  )
}
