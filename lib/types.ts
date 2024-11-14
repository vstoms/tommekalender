import { LucideIcon } from 'lucide-react'

export type WasteIconType = 'trash-2' | 'apple' | 'recycle' | 'file-text' | 'wine'

export interface WasteType {
  name: string
  icon: WasteIconType
  color?: string
}

export interface ProcessedWasteDay {
  date: Date
  types: WasteType[]
}

export interface WasteData {
  disposals: {
    date: string
    fraction: string
  }[]
}