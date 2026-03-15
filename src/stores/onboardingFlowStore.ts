import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserType = 'seeker' | 'employer'

export type SeekerOnboardingData = {
  name: string
  age: string
  gender: string
  profession: string
  location: string
  education: string
}

export type EmployerOnboardingData = {
  employerName: string
  jobTitle: string
  jobDescription: string
  jobLocation: string
  payAmount: string
  payType: 'monthly' | 'yearly'
  educationLevel: string
}

type PendingOnboarding =
  | { kind: 'seeker'; data: SeekerOnboardingData; submittedAt: number }
  | { kind: 'employer'; data: EmployerOnboardingData; submittedAt: number }

type VerifiedUser =
  | { userType: 'seeker'; data: SeekerOnboardingData }
  | { userType: 'employer'; data: EmployerOnboardingData }

type OnboardingFlowState = {
  pending: PendingOnboarding | null
  user: VerifiedUser | null
  isVerified: boolean
  hasDismissedLanguageModal: boolean
  hasDismissedOnboardingModal: boolean
  setPendingSeeker: (data: SeekerOnboardingData) => void
  setPendingEmployer: (data: EmployerOnboardingData) => void
  completeOtpVerification: () => VerifiedUser['userType'] | null
  dismissLanguageModal: () => void
  dismissOnboardingModal: () => void
  reset: () => void
}

export const useOnboardingFlowStore = create<OnboardingFlowState>()(
  persist(
    (set, get) => ({
      pending: null,
      user: null,
      isVerified: false,
      hasDismissedLanguageModal: false,
      hasDismissedOnboardingModal: false,

      setPendingSeeker: (data) => {
        set({
          pending: { kind: 'seeker', data, submittedAt: Date.now() },
          user: null,
          isVerified: false,
        })
      },

      setPendingEmployer: (data) => {
        set({
          pending: { kind: 'employer', data, submittedAt: Date.now() },
          user: null,
          isVerified: false,
        })
      },

      completeOtpVerification: () => {
        const pending = get().pending
        if (!pending) return null

        if (pending.kind === 'seeker') {
          set({
            user: { userType: 'seeker', data: pending.data },
            isVerified: true,
            pending: null,
          })
          return 'seeker'
        }

        set({
          user: { userType: 'employer', data: pending.data },
          isVerified: true,
          pending: null,
        })
        return 'employer'
      },

      dismissLanguageModal: () => set({ hasDismissedLanguageModal: true }),
      dismissOnboardingModal: () => set({ hasDismissedOnboardingModal: true }),

      reset: () => set({ pending: null, user: null, isVerified: false }),
    }),
    {
      name: 'onboarding-flow',
      version: 2,
      migrate: (persistedState) => {
        const s = persistedState as Partial<OnboardingFlowState> | undefined
        const merged: Partial<OnboardingFlowState> = {
          pending: null,
          user: null,
          isVerified: false,
          hasDismissedLanguageModal: false,
          hasDismissedOnboardingModal: false,
          ...(s ?? {}),
        }

        const userType = (merged.user as { userType?: unknown } | null | undefined)?.userType

        if (merged.isVerified && !merged.user) {
          merged.isVerified = false
        }

        if (merged.user && userType !== 'seeker' && userType !== 'employer') {
          merged.user = null
          merged.isVerified = false
        }

        return merged as OnboardingFlowState
      },
    },
  ),
)
