import { z } from 'zod'

// Program schemas
export const createProgramSchema = z.object({
  name: z.string().min(1, 'Program name is required'),
  tokenAddr: z.string().min(1, 'Token address is required'),
  ownerAddr: z.string().min(1, 'Owner address is required'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export const createMilestoneSchema = z.object({
  name: z.string().min(1, 'Milestone name is required'),
  amount: z.string().min(1, 'Amount is required'),
  criteria: z.string().min(1, 'Criteria is required'),
})

// PoD schemas
export const createPodSchema = z.object({
  disbursementId: z.string().min(1, 'Disbursement ID is required'),
  beneficiaryId: z.string().min(1, 'Beneficiary ID is required'),
  gpsLat: z.number().optional(),
  gpsLng: z.number().optional(),
  photoUri: z.string().optional(),
  podHash: z.string().min(1, 'PoD hash is required'),
})

// Batch schemas
export const anchorBatchSchema = z.object({
  milestoneId: z.string().min(1, 'Milestone ID is required'),
})

// Verification schemas
export const verifyPodSchema = z.object({
  podId: z.string().optional(),
  podJson: z.string().optional(),
}).refine(data => data.podId || data.podJson, {
  message: 'Either podId or podJson must be provided',
})

export type CreateProgramInput = z.infer<typeof createProgramSchema>
export type CreateMilestoneInput = z.infer<typeof createMilestoneSchema>
export type CreatePodInput = z.infer<typeof createPodSchema>
export type AnchorBatchInput = z.infer<typeof anchorBatchSchema>
export type VerifyPodInput = z.infer<typeof verifyPodSchema>
