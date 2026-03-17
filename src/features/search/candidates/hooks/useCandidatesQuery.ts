import { useQuery } from '@tanstack/react-query'
import type { Candidate } from '../types'
import { CANDIDATES_API_URL } from '../constants'


export type CandidatesQueryResponse = {
  candidates: Candidate[]
}

async function fetchCandidates(
  signal?: AbortSignal,
): Promise<CandidatesQueryResponse> {
  const res = await fetch(CANDIDATES_API_URL, { signal })
  if (!res.ok) throw new Error('Failed to fetch candidates')
  return res.json() as Promise<CandidatesQueryResponse>
}

export function useCandidatesQuery() {
  return useQuery({
    queryKey: ['candidates'],
    queryFn: ({ signal }) => fetchCandidates(signal),
    staleTime: 0,
  })
}

