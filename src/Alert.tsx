import { type HTMLAttributes, type ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import { IconButton } from './IconButton'
import { Text } from './Text'
import { cx } from './utils'
import styles from './Alert.module.css'

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children?: ReactNode
  /** Si se pasa, aparece una X para cerrar. */
  onClose?: () => void
}

const ICONS: Record<NonNullable<AlertProps['variant']>, IconName> = {
  info: 'Info', success: 'CircleCheck', warning: 'TriangleAlert', error: 'CircleX',
}

export function Alert({ variant = 'info', title, children, onClose, className, ...props }: AlertProps) {
  return (
    <div
      role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
      className={cx(styles.alert, styles[variant], className)}
      {...props}
    >
      <span className={styles.icon}><Icon name={ICONS[variant]} size="md" /></span>
      <div className={styles.body}>
        {title && <Text as="div" size="md" weight="semibold">{title}</Text>}
        {children && <Text as="div" size="sm">{children}</Text>}
      </div>
      {onClose && <IconButton icon="X" label="Cerrar aviso" size="sm" onClick={onClose} />}
    </div>
  )
}
