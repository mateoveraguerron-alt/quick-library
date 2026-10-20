import { type ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import { Text } from './Text'
import { cx } from './utils'
import styles from './EmptyState.module.css'

export interface EmptyStateProps {
  icon?: IconName
  title: string
  description?: string
  /** Normalmente un <Button>. */
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon = 'Inbox', title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cx(styles.wrap, className)}>
      <span className={styles.icon}><Icon name={icon} size="xl" /></span>
      <Text as="h3" size="lg" weight="semibold" align="center">{title}</Text>
      {description && <Text size="md" tone="muted" align="center" className={styles.desc}>{description}</Text>}
      {action}
    </div>
  )
}
