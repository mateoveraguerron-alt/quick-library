import { type HTMLAttributes, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react'
import { cx } from './utils'
import styles from './Table.module.css'

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  density?: 'compact' | 'comfortable'
  /** Cabecera fija al hacer scroll. Dale una altura máxima al Table vía `className` (max-height). */
  stickyHeader?: boolean
}

/** Uso: <Table><TableHead><TableRow><TableHeaderCell>…</TableHeaderCell></TableRow></TableHead><TableBody>…</TableBody></Table> */
export function Table({ density = 'comfortable', stickyHeader, className, children, ...props }: TableProps) {
  return (
    <div className={cx(styles.wrap, className)}>
      <table className={cx(styles.table, styles[density], stickyHeader && styles.sticky)} {...props}>
        {children}
      </table>
    </div>
  )
}

export function TableHead(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
}

export function TableRow({ selected, className, ...props }: TableRowProps) {
  return <tr className={cx(styles.row, selected && styles.selected, className)} aria-selected={selected} {...props} />
}

type Align = 'left' | 'center' | 'right'

export function TableHeaderCell({ align = 'left', className, ...props }: ThHTMLAttributes<HTMLTableCellElement> & { align?: Align }) {
  return <th className={cx(styles.th, styles[align], className)} {...props} />
}

/** Para notas/números usa align="right" o "center". */
export function TableCell({ align = 'left', className, ...props }: TdHTMLAttributes<HTMLTableCellElement> & { align?: Align }) {
  return <td className={cx(styles.td, styles[align], className)} {...props} />
}
