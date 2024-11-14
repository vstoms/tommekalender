import { WasteData, ProcessedWasteDay, WasteType } from './types'
import { format, parseISO, isSameDay } from 'date-fns'
import { nb } from 'date-fns/locale'
import { WasteDataSchema } from './schemas'

export const wasteTypes: Record<string, WasteType> = {
  'Restavfall': {
    name: 'Restavfall',
    icon: 'trash-2'
  },
  'Matavfall': {
    name: 'Matavfall',
    icon: 'apple'
  },
  'Papir': {
    name: 'Papir',
    icon: 'file-text'
  },
  'Plastemballasje': {
    name: 'Plastemballasje',
    icon: 'recycle'
  },
  'Glass og metallemballasje': {
    name: 'Glass og metallemballasje',
    icon: 'wine'
  }
} as const

export function validateWasteData(data: unknown): data is WasteData {
  try {
    WasteDataSchema.parse(data)
    return true
  } catch (error) {
    console.error('Validation error:', error)
    return false
  }
}

export function processWasteData(data: WasteData): ProcessedWasteDay[] {
  console.log('Raw data:', data)
  
  const dateMap = new Map<string, Set<string>>()

  data.disposals.forEach(disposal => {
    if (!dateMap.has(disposal.date)) {
      dateMap.set(disposal.date, new Set())
    }
    dateMap.get(disposal.date)?.add(disposal.fraction)
  })

  return Array.from(dateMap.entries())
    .map(([date, fractions]) => {
      const types = Array.from(fractions)
        .map(fraction => {
          console.log('Processing fraction:', fraction)
          return wasteTypes[fraction]
        })
        .filter(Boolean)
      
      console.log(`Types for ${date}:`, types)
      
      return {
        date: parseISO(date),
        types
      }
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

export function getUpcomingDates(processedData: ProcessedWasteDay[], days: number = 7): ProcessedWasteDay[] {
  const today = new Date()
  return processedData
    .filter(day => day.date >= today)
    .slice(0, days)
}

export function formatDate(date: Date): string {
  return format(date, 'EEEE d. MMMM', { locale: nb })
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}