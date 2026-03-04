import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding/seeker')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/onboarding/seeker"!</div>
}
