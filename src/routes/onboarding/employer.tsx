import { createFileRoute } from '@tanstack/react-router'
import { EmployerOnboardingForm } from '../../features/onboarding/EmployerOnboardingForm'

export const Route = createFileRoute('/onboarding/employer')({
  component: EmployerRoute,
})

function EmployerRoute() {
  return <EmployerOnboardingForm />
}
