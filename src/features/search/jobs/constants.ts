export const JOBS_API_URL = 'https://zupro-backend.vercel.app/api/v1/jobs'

export const PAY_TYPE_KEYS = ['all', 'perDay', 'perShift'] as const
export type PayFilterKey = (typeof PAY_TYPE_KEYS)[number]

export const JOBS_SEARCH_DEBOUNCE_MS = 380

