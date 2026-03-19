import { createFileRoute } from '@tanstack/react-router'
import { FeatureCards } from '../../features/home/components/FeatureCards'
import { HeroCarousel } from '../../features/home/components/HeroCarousel'
import { OnboardingModal } from '../../features/home/components/OnboardingModal'
import { LanguagePreferenceModal } from '../../features/home/components/LanguagePreferenceModal'
import { useOnboardingFlowStore } from '../../stores/onboardingFlowStore'
import {
  FEATURES,
  HIRER_PERKS,
  HOME_SLIDES,
  SEEKER_PERKS,
} from '../../features/home/constants'

export const Route = createFileRoute(`/home/`)({
  component: Index,
})

function Index() {
  const isVerified = useOnboardingFlowStore((s) => s.isVerified)
  const user = useOnboardingFlowStore((s) => s.user)
  const hasDismissedLanguageModal = useOnboardingFlowStore((s) => s.hasDismissedLanguageModal)
  const hasDismissedOnboardingModal = useOnboardingFlowStore((s) => s.hasDismissedOnboardingModal)
  const dismissLanguageModal = useOnboardingFlowStore((s) => s.dismissLanguageModal)

  const isLoggedIn = isVerified && !!user
  const showLanguageModal = !isLoggedIn && !hasDismissedLanguageModal
  const showOnboardingModal = !isLoggedIn && hasDismissedLanguageModal && !hasDismissedOnboardingModal

  return (
    <>
      <div className="flex-1 flex flex-col bg-white items-center pt-6 px-4 overflow-hidden">
        <HeroCarousel slides={HOME_SLIDES} />
        <FeatureCards features={FEATURES} />
      </div>
      {showLanguageModal && (
        <LanguagePreferenceModal
          onProceed={() => dismissLanguageModal()}
          onClose={() => dismissLanguageModal()}
        />
      )}
      {showOnboardingModal && (
        <OnboardingModal seekerPerks={SEEKER_PERKS} hirerPerks={HIRER_PERKS} />
      )}
    </>
  )
}
