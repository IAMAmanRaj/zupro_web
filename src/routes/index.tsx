import { createFileRoute } from '@tanstack/react-router'
import { FeatureCards } from '../features/home/components/FeatureCards'
import { HeroCarousel } from '../features/home/components/HeroCarousel'
import { Navbar } from '../features/General/Navbar'
import { OnboardingModal } from '../features/home/components/OnboardingModal'
import {
  FEATURES,
  HIRER_PERKS,
  HOME_SLIDES,
  SEEKER_PERKS,
} from '../features/home/constants'

export const Route = createFileRoute(`/`)({
  component: Index,
})

function Index() {
  return (
    <div className="h-screen overflow-hidden bg-[#f0f2f8] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center pt-6 px-4">
        <HeroCarousel slides={HOME_SLIDES} />
        <FeatureCards features={FEATURES} />
      </main>
      <OnboardingModal seekerPerks={SEEKER_PERKS} hirerPerks={HIRER_PERKS} />
    </div>
  )
}
