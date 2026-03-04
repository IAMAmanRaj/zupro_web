import { createFileRoute } from '@tanstack/react-router'
import { SeekerOnboardingForm } from '../../features/onboarding/SeekerOnboardingForm'

export const Route = createFileRoute('/onboarding/seeker')({
  component: SeekerRoute,
})

function SeekerRoute() {
  return <SeekerOnboardingForm />
}
