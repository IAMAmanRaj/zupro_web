import { createFileRoute } from '@tanstack/react-router'
import { LandingHero } from '../features/landing/components/Hero'
import { LandingBody } from '../features/landing/Landing'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <LandingHero />
      <LandingBody />
    </>
  )
}