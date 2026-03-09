import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { FeatureCards } from '../features/home/components/FeatureCards'
import { HeroCarousel } from '../features/home/components/HeroCarousel'
import { OnboardingModal } from '../features/home/components/OnboardingModal'
import { LanguagePreferenceModal } from '../features/home/components/LanguagePreferenceModal'
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
  const [showLanguageModal, setShowLanguageModal] = useState(true)
  const [showOnboardingModal, setShowOnboardingModal] = useState(false)

  const openOnboarding = () => {
    setShowLanguageModal(false)
    setShowOnboardingModal(true)
  }

  return (
    <>
      <div className="flex-1 flex flex-col items-center pt-6 px-4 overflow-hidden">
        <HeroCarousel slides={HOME_SLIDES} />
        <FeatureCards features={FEATURES} />
      </div>
      {showLanguageModal && (
        <LanguagePreferenceModal
          onProceed={() => openOnboarding()}
          onClose={openOnboarding}
        />
      )}
      {showOnboardingModal && (
        <OnboardingModal seekerPerks={SEEKER_PERKS} hirerPerks={HIRER_PERKS} />
      )}
    </>
  )
}
