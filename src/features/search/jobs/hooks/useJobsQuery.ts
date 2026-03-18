import { useQuery } from '@tanstack/react-query'
import { JOBS_API_URL } from '../constants'
import type { Job } from '../types'

export type JobsQueryResponse = {
  jobs: Job[]
}

async function fetchJobs(signal?: AbortSignal): Promise<JobsQueryResponse> {
  const res = await fetch(JOBS_API_URL, { signal })
  if (!res.ok) throw new Error('Failed to fetch jobs')
  return res.json() as Promise<JobsQueryResponse>
}

export function useJobsQuery() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: ({ signal }) => fetchJobs(signal),
    staleTime: 0,
  })
}

