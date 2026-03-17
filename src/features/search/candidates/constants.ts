export const CANDIDATES_API_URL = 'https://zupro-backend.vercel.app/api/v1/candidates'

export const EXPERIENCE_FILTER_KEYS = ['all', '0_2', '2_4', '4_plus'] as const
export type ExpFilterKey = (typeof EXPERIENCE_FILTER_KEYS)[number]

export const CANDIDATES_SEARCH_DEBOUNCE_MS = 380
