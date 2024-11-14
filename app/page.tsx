import { ErrorBoundary } from '@/components/ErrorBoundary'
import WasteManagement from '@/components/WasteManagement'

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-3xl">
      <ErrorBoundary>
        <WasteManagement />
      </ErrorBoundary>
    </main>
  )
}