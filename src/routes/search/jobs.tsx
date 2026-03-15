import { createFileRoute, redirect } from '@tanstack/react-router'
import { useOnboardingFlowStore } from '../../stores/onboardingFlowStore'

export const Route = createFileRoute('/search/jobs')({
  beforeLoad: () => {
    const { isVerified, user } = useOnboardingFlowStore.getState()
    if (!isVerified || !user) {
      throw redirect({ to: '/' })
    }
    if (user.userType !== 'seeker') {
      throw redirect({ to: '/search/candidates' })
    }
  },
  component: JobsRoute,
})

function JobsRoute() {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white border border-slate-100 shadow-sm rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Work in progress</h1>
        <p className="text-sm text-slate-500 mt-2">Job search will appear here.</p>
      </div>
    </div>
  )
}

