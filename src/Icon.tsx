import {
  Archive, ArrowLeft, ArrowRight, Bell, Bot, BookOpen, CalendarDays, Calculator, ChartColumn,
  Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleCheck, CircleX, ClipboardCheck,
  ClipboardList, CloudOff, Copy, Crown, Download, Ellipsis, EllipsisVertical, Eye, EyeOff, FileText,
  Filter, Folder, GraduationCap, GripVertical, House, Inbox, Info, LayoutDashboard, ListChecks, Lock,
  LogOut, Menu, MessageSquare, Minus, Moon, Palette, Pencil, Percent, Plus, Printer, Redo2, RefreshCw,
  RotateCcw, Save, Search, Send, Settings, Sparkles, Star, Sun, Trash2, TriangleAlert, Type, Undo2,
  Upload, User, Users, X,
  // ── añadidos para HomeVista / HeaderVistaNotas ──
  ChartPie, CircleHelp, Clock, FileSpreadsheet, Gem, LayoutGrid, List, Maximize, Minimize, Server, Square,
  // ── añadidos para DrawerFinal ──
  Table, SlidersHorizontal, SquarePen, FlaskConical, Monitor, Music, Goal, Trophy, Sigma,
  Microscope, Landmark, Mic, Library, Brain, Languages, ScrollText, Wrench, Braces, Activity,
  Globe, Compass, Lightbulb, HeartPulse, Dumbbell, Drama, Paintbrush, ChartLine,
  // ── añadidos para ModalReutilizable / configuración ──
  Columns3, Package, Database, Keyboard, Images, Puzzle,Code,Merge, Focus, MoreHorizontal, Tag, ExternalLink,Unlink,Sheet, LayoutTemplate, History , CheckCircle2,  Circle, 
  FileType, AlignLeft, ToggleLeft, ArrowLeftRight, PenLine, Zap , FolderOpen, Cloud, Book ,Repeat, Mail , Receipt, FolderPlus ,  Image , Video, File ,  Target , 
  Bold , Italic , Heading1 , Heading2, Heading3, ListOrdered , Strikethrough, Underline, Highlighter, Quote, Superscript, Subscript,
  CheckSquare , Link , AlignCenter ,AlignRight , Timer , ZoomOut , ZoomIn ,
  type LucideProps
} from 'lucide-react'

/**
 * ÚNICO archivo del proyecto que importa de 'lucide-react'.
 * Para agregar un icono: impórtalo arriba y añádelo al mapa ICONS (el nombre es PascalCase;
 * en lucide.dev/icons los nombres salen en kebab-case: "arrow-left" -> ArrowLeft).
 * Solo se empaquetan los iconos listados aquí (tree-shaking).
 */
const ICONS = {
  Archive, ArrowLeft, ArrowRight, Bell, Bot, BookOpen, CalendarDays, Calculator, ChartColumn,
  Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleCheck, CircleX, ClipboardCheck,
  ClipboardList, CloudOff, Copy, Crown, Download, Ellipsis, EllipsisVertical, Eye, EyeOff, FileText,
  Filter, Folder, GraduationCap, GripVertical, House, Inbox, Info, LayoutDashboard, ListChecks, Lock,
  LogOut, Menu, MessageSquare, Minus, Moon, Palette, Pencil, Percent, Plus, Printer, Redo2, RefreshCw,
  RotateCcw, Save, Search, Send, Settings, Sparkles, Star, Sun, Trash2, TriangleAlert, Type, Undo2,
  Upload, User, Users, X,
  // ── añadidos para HomeVista / HeaderVistaNotas ──
  ChartPie, CircleHelp, Clock, FileSpreadsheet, Gem, LayoutGrid, List, Maximize, Minimize, Server, Square,
  // ── añadidos para DrawerFinal ──
  Table, SlidersHorizontal, SquarePen, FlaskConical, Monitor, Music, Goal, Trophy, Sigma,
  Microscope, Landmark, Mic, Library, Brain, Languages, ScrollText, Wrench, Braces, Activity,
  Globe, Compass, Lightbulb, HeartPulse, Dumbbell, Drama, Paintbrush, ChartLine,
  // ── añadidos para ModalReutilizable / configuración ──
  Columns3, Package, Database, Keyboard, Images, Puzzle,Code,Merge , Focus, MoreHorizontal , Tag , ExternalLink,Unlink,Sheet,LayoutTemplate, History,CheckCircle2, Circle 
  ,FileType ,AlignLeft , ToggleLeft , ArrowLeftRight, PenLine , Zap , FolderOpen , Cloud, Book , Repeat, Mail , Receipt , FolderPlus , Image , Video , File , Target,
  Bold , Italic , Heading1, Heading2, Heading3, ListOrdered , Strikethrough, Underline,Highlighter, Quote, Superscript, Subscript,
  CheckSquare , Link , AlignCenter ,AlignRight , Timer,  ZoomOut , ZoomIn
}

export type IconName = keyof typeof ICONS
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZES: Record<IconSize, number> = { xs: 14, sm: 16, md: 20, lg: 24, xl: 32 }

export interface IconProps extends Omit<LucideProps, 'size' | 'name' | 'ref'> {
  name: IconName
  size?: IconSize
  /** Si el icono comunica algo por sí solo (sin texto al lado), pon un label accesible. */
  label?: string
}

export function Icon({ name, size = 'md', label, strokeWidth = 1.75, ...props }: IconProps) {
  const Cmp = ICONS[name]
  return (
    <Cmp
      size={SIZES[size]}
      strokeWidth={strokeWidth}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      {...props}
    />
  )
}