import { useState } from 'react'
import { themes, applyTheme, type ThemeName } from './theme'
import {
  Alert, Badge, Button, Card, CardHeader, Checkbox, ConfirmDialog, Dialog, EmptyState, Icon, IconButton,
  Input, Menu, ProgressBar, Select, Spinner, Stack, Switch, Table, TableBody, TableCell, TableHead,
  TableHeaderCell, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Text, Textarea, Tooltip,
} from './index'

/**
 * Página de desarrollo: muestra TODOS los componentes con el tema activo.
 * Úsala para ver cómo queda cada cambio en los 20 temas. No se incluye en producción
 * (móntala solo en dev: if (import.meta.env.DEV) …).
 */
export function UiKit() {
  const [themeName, setThemeName] = useState<ThemeName>('arctic')
  const setTheme = (name: ThemeName) => {
    setThemeName(name)
    applyTheme(name)
  }
  const [dialog, setDialog] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [tab, setTab] = useState('notas')
  const [check, setCheck] = useState<boolean | 'indeterminate'>(true)
  const [on, setOn] = useState(true)

  const themeOptions = (Object.keys(themes) as ThemeName[]).map((t) => ({ value: t, label: t }))

  return (
    <Stack gap="lg" style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
      <Stack direction="row" justify="between" align="center">
        <Text as="h1" size="xxl" weight="bold">UI Kit · Quickfy</Text>
        <div style={{ width: 220 }}>
          <Select options={themeOptions} value={themeName} onValueChange={(v) => setTheme(v as ThemeName)} />
        </div>
      </Stack>

      <Card>
        <CardHeader title="Botones" subtitle="primary · secondary · ghost · danger" icon="Sparkles" />
        <Stack direction="row" wrap gap="sm" style={{ marginTop: 16 }}>
          <Button icon="Plus">Primario</Button>
          <Button variant="secondary" icon="Pencil">Secundario</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger" icon="Trash2">Eliminar</Button>
          <Button loading>Guardando</Button>
          <Button disabled>Deshabilitado</Button>
          <Button size="sm">Pequeño</Button>
          <Button size="lg">Grande</Button>
          <Tooltip content="Descargar PDF"><IconButton icon="Download" label="Descargar" /></Tooltip>
          <IconButton icon="Settings" label="Ajustes" variant="secondary" />
          <Menu
            trigger={<IconButton icon="EllipsisVertical" label="Más opciones" />}
            items={[
              { label: 'Editar', icon: 'Pencil', onSelect: () => {} },
              { label: 'Duplicar', icon: 'Copy', onSelect: () => {} },
              { separator: true },
              { label: 'Eliminar', icon: 'Trash2', danger: true, onSelect: () => {} },
            ]}
          />
        </Stack>
      </Card>

      <Card>
        <CardHeader title="Formularios" icon="ClipboardList" />
        <Stack gap="md" style={{ marginTop: 16 }}>
          <Stack direction="row" gap="md" wrap>
            <div style={{ flex: 1, minWidth: 220 }}><Input label="Nombre del curso" placeholder="Ej. 3ro BGU A" hint="Como lo verán tus estudiantes" /></div>
            <div style={{ flex: 1, minWidth: 220 }}><Input label="Buscar" icon="Search" placeholder="Buscar estudiante…" /></div>
            <div style={{ width: 160 }}><Input label="Nota" error="Debe estar entre 0 y 10" defaultValue="15" /></div>
          </Stack>
          <Select
            label="Materia"
            options={[{ value: 'mat', label: 'Matemática' }, { value: 'len', label: 'Lengua' }, { value: 'fis', label: 'Física', disabled: true }]}
          />
          <Textarea label="Observaciones" placeholder="Escribe aquí…" />
          <Stack direction="row" gap="lg" wrap>
            <Checkbox label="Mostrar inactivos" checked={check} onCheckedChange={setCheck} />
            <Checkbox label="Indeterminado" checked="indeterminate" />
            <Switch label="Notificaciones" checked={on} onCheckedChange={setOn} />
          </Stack>
        </Stack>
      </Card>

      <Card>
        <CardHeader title="Estados" icon="Bell" />
        <Stack gap="sm" style={{ marginTop: 16 }}>
          <Stack direction="row" gap="sm" wrap align="center">
            <Badge>Neutral</Badge><Badge variant="accent" icon="Crown">Pro</Badge><Badge variant="success">Aprobado</Badge>
            <Badge variant="warning">Pendiente</Badge><Badge variant="error">Reprobado</Badge><Badge variant="info">Nuevo</Badge>
            <Spinner label="Cargando" />
          </Stack>
          <Alert variant="info" title="Sincronización">Tus datos están al día.</Alert>
          <Alert variant="warning">Llegaste al límite del plan Free.</Alert>
          <Alert variant="error" title="No se pudo guardar" onClose={() => {}}>Revisa tu conexión e inténtalo de nuevo.</Alert>
          <ProgressBar value={72} label="Dominio del estándar" showValue />
        </Stack>
      </Card>

      <Card>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="notas" icon="ClipboardList">Notas</TabsTrigger>
            <TabsTrigger value="asistencia" icon="ClipboardCheck">Asistencia</TabsTrigger>
            <TabsTrigger value="vacio" icon="Inbox">Vacío</TabsTrigger>
          </TabsList>
          <TabsContent value="notas">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Estudiante</TableHeaderCell>
                  <TableHeaderCell align="right">Quimestre 1</TableHeaderCell>
                  <TableHeaderCell align="right">Quimestre 2</TableHeaderCell>
                  <TableHeaderCell align="center">Estado</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[['Ana Pérez', 9.2, 8.8, 'success'], ['Luis Mora', 7.1, 6.4, 'warning'], ['Eva Ríos', 5.5, 4.9, 'error']].map(([n, a, b, s]) => (
                  <TableRow key={String(n)}>
                    <TableCell>{n}</TableCell>
                    <TableCell align="right">{a}</TableCell>
                    <TableCell align="right">{b}</TableCell>
                    <TableCell align="center"><Badge size="sm" variant={s as 'success' | 'warning' | 'error'}>{s === 'success' ? 'Aprobado' : s === 'warning' ? 'En riesgo' : 'Reprobado'}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="asistencia"><Text tone="muted">Contenido de asistencia…</Text></TabsContent>
          <TabsContent value="vacio">
            <EmptyState title="Aún no hay estudiantes" description="Importa un Excel o agrega estudiantes manualmente." action={<Button icon="Upload">Importar Excel</Button>} />
          </TabsContent>
        </Tabs>
      </Card>

      <Card>
        <CardHeader title="Diálogos" icon="MessageSquare" />
        <Stack direction="row" gap="sm" style={{ marginTop: 16 }}>
          <Button variant="secondary" onClick={() => setDialog(true)}>Abrir diálogo</Button>
          <Button variant="danger" onClick={() => setConfirm(true)}>Confirmar eliminación</Button>
          <Icon name="Star" label="Favorito" />
        </Stack>
      </Card>

      <Dialog
        open={dialog} onOpenChange={setDialog} title="Nuevo curso" description="Completa los datos básicos."
        footer={<><Button variant="ghost" onClick={() => setDialog(false)}>Cancelar</Button><Button onClick={() => setDialog(false)}>Crear</Button></>}
      >
        <Stack><Input label="Nombre" autoFocus /><Select label="Año lectivo" options={[{ value: '2026', label: '2026-2027' }]} /></Stack>
      </Dialog>
      <ConfirmDialog
        open={confirm} onOpenChange={setConfirm} danger title="¿Eliminar curso?"
        description="Se moverá a la papelera." confirmLabel="Eliminar"
        onConfirm={() => new Promise((r) => setTimeout(r, 800))}
      />
    </Stack>
  )
}
