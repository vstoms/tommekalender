'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ProcessedWasteDay } from '@/lib/types'
import { processWasteData, getUpcomingDates, wasteTypes, validateWasteData } from '@/lib/waste-utils'
import { WasteTypeLegend } from './waste-types/WasteTypeLegend'
import { WasteScheduleList } from './waste-schedule/WasteScheduleList'
import { API_URL } from '@/lib/constants'
import { AlertCircle } from 'lucide-react'

export default function WasteManagement() {
  const [data, setData] = useState<ProcessedWasteDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(API_URL)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch waste data: ${response.statusText}`)
      }
      
      const rawData = await response.json()
      console.log('Raw API data:', rawData)
      
      if (!validateWasteData(rawData)) {
        console.error('Invalid data structure:', rawData)
        throw new Error('No waste collection data available for this address')
      }

      if (rawData.disposals.length === 0) {
        throw new Error('No upcoming waste collections scheduled')
      }

      const processedData = processWasteData(rawData)
      console.log('Processed data:', processedData)
      
      const upcomingDates = getUpcomingDates(processedData)
      console.log('Upcoming dates:', upcomingDates)
      
      setData(upcomingDates)
    } catch (err) {
      console.error('Error fetching waste data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load waste collection schedule')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Tømmekalender
        </h1>
        <p className="text-muted-foreground">
          Oversikt over avfallshenting
        </p>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          <WasteScheduleList 
            data={data} 
            loading={loading} 
          />
          <WasteTypeLegend />
        </>
      )}
    </div>
  )
}