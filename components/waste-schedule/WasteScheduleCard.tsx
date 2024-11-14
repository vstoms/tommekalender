'use client'

import { format } from 'date-fns'
import { nb } from 'date-fns/locale'
import { WASTE_ICONS } from '@/lib/constants'
import { Card } from '@/components/ui/card'
import { WasteType } from '@/lib/types'

interface WasteScheduleCardProps {
  date: Date
  types: WasteType[]
}

export function WasteScheduleCard({ date, types }: WasteScheduleCardProps) {
  console.log('Card received types:', types)

  return (
    <Card className="p-4 transition-colors hover:bg-accent">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-shrink-0">
          <div className="text-sm text-muted-foreground">
            {format(date, 'EEEE', { locale: nb })}
          </div>
          <div className="text-xl font-semibold">
            {format(date, 'd. MMMM', { locale: nb })}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 sm:ml-auto">
          {types && types.length > 0 ? (
            types.map((type, index) => {
              const Icon = WASTE_ICONS[type.icon]
              return Icon ? (
                <div 
                  key={index} 
                  className="flex items-center gap-2 bg-secondary rounded-lg p-2 w-fit"
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm hidden sm:inline whitespace-nowrap">
                    {type.name}
                  </span>
                </div>
              ) : null
            })
          ) : (
            <div className="text-sm text-muted-foreground">
              Ingen avfallstyper registrert
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}