import { memo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const LoadingSkeleton = memo(() => (
  <>
    {Array.from({ length: 4 }).map((_, i) => (
      <Skeleton key={i} className="h-24 w-full" />
    ))}
  </>
))

LoadingSkeleton.displayName = 'LoadingSkeleton' 