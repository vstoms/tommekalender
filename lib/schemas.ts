import { z } from 'zod'

export const WasteDisposalSchema = z.object({
  date: z.string(),
  fraction: z.string(),
})

export const WasteDataSchema = z.object({
  disposals: z.array(WasteDisposalSchema),
})

export type WasteData = z.infer<typeof WasteDataSchema> 