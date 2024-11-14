'use client'

import { ProcessedWasteDay } from '@/lib/types'
import { WasteScheduleCard } from './WasteScheduleCard'
import { Skeleton } from '@/components/ui/skeleton'

interface WasteScheduleListProps {
  data: ProcessedWasteDay[]
  loading: boolean
}

export function WasteScheduleList({ data, loading }: WasteScheduleListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Kommende tømminger</h2>
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))
        ) : (
          data.map((day) => (
            <WasteScheduleCard 
              key={day.date.toISOString()} 
              date={day.date}
              types={day.types}
            />
          ))
        )}
      </div>
    </div>
  )
}