/** Une clases CSS ignorando valores falsos. Uso: cx(styles.btn, active && styles.active, className) */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
