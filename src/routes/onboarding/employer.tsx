import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding/employer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/onboarding/employer"!</div>
}
