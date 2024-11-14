import { Trash2, Apple, Recycle, FileText, Wine } from 'lucide-react'
import { WasteIconType } from './types'

export const WASTE_ICONS: Record<WasteIconType, typeof Trash2> = {
  'trash-2': Trash2,
  'apple': Apple,
  'recycle': Recycle,
  'file-text': FileText,
  'wine': Wine,
} as const

export const API_URL = 'https://kalender.renovasjonsportal.no/api/address/cc56f50c-c1b0-424d-a228-75e88b1e2d27/details'
