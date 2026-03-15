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
  setPendingSeeker: (data: SeekerOnboardingData) => void
  setPendingEmployer: (data: EmployerOnboardingData) => void
  completeOtpVerification: () => VerifiedUser['userType'] | null
  reset: () => void
}

export const useOnboardingFlowStore = create<OnboardingFlowState>()(
  persist(
    (set, get) => ({
      pending: null,
      user: null,
      isVerified: false,

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

      reset: () => set({ pending: null, user: null, isVerified: false }),
    }),
    { name: 'onboarding-flow' },
  ),
)
