import * as RadixTabs from '@radix-ui/react-tabs'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { Icon, type IconName } from './Icon'
import { cx } from './utils'
import styles from './Tabs.module.css'

/**
 * Uso:
 * <Tabs value={tab} onValueChange={setTab}>
 *   <TabsList>
 *     <TabsTrigger value="notas" icon="ClipboardList">Notas</TabsTrigger>
 *     <TabsTrigger value="asistencia">Asistencia</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="notas">…</TabsContent>
 *   <TabsContent value="asistencia">…</TabsContent>
 * </Tabs>
 */
export const Tabs = RadixTabs.Root

export const TabsList = forwardRef<ElementRef<typeof RadixTabs.List>, ComponentPropsWithoutRef<typeof RadixTabs.List>>(
  function TabsList({ className, ...props }, ref) {
    return <RadixTabs.List ref={ref} className={cx(styles.list, className)} {...props} />
  }
)

export interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof RadixTabs.Trigger> {
  icon?: IconName
}

export const TabsTrigger = forwardRef<ElementRef<typeof RadixTabs.Trigger>, TabsTriggerProps>(
  function TabsTrigger({ className, icon, children, ...props }, ref) {
    return (
      <RadixTabs.Trigger ref={ref} className={cx(styles.trigger, className)} {...props}>
        {icon && <Icon name={icon} size="sm" />}
        {children}
      </RadixTabs.Trigger>
    )
  }
)

export const TabsContent = forwardRef<ElementRef<typeof RadixTabs.Content>, ComponentPropsWithoutRef<typeof RadixTabs.Content>>(
  function TabsContent({ className, ...props }, ref) {
    return <RadixTabs.Content ref={ref} className={cx(styles.content, className)} {...props} />
  }
)
