'use client'

import { WASTE_ICONS } from '@/lib/constants'
import { wasteTypes } from '@/lib/waste-utils'
import { Card } from '@/components/ui/card'

export function WasteTypeLegend() {
  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">Avfallstyper</h2>
      <div className="flex flex-wrap gap-4">
        {Object.values(wasteTypes).map((type) => {
          const Icon = WASTE_ICONS[type.icon]
          return Icon ? (
            <div
              key={type.name}
              className="inline-flex items-center gap-2 p-2 bg-secondary rounded-lg shrink-0"
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm whitespace-nowrap">{type.name}</span>
            </div>
          ) : null
        })}
      </div>
    </Card>
  )
}