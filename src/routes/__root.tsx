import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { ReactLenis } from 'lenis/react'
import { Navbar } from '../features/General/Navbar'

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  // Lenis wheel-based scrolling can break on real touch devices if we lock native
  // scrolling via `overflow-hidden`. Prefer native scrolling on touch/coarse pointer.
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ((typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) ||
      window.matchMedia?.('(pointer: coarse)')?.matches === true)

  // These routes contain nested scroll containers (e.g. `zupro-scroll`) where
  // Lenis can interfere with native scrolling.
  const shouldDisableLenis =
    isTouchDevice ||
    pathname.startsWith('/onboarding/seeker') ||
    pathname.startsWith('/onboarding/employer') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/search/jobs')
  || pathname.startsWith('/search/candidates')

  return (
    <div className="fixed inset-0 bg-[#f0f2f8] flex flex-col">
      <Navbar />
      <main
        className={`flex-1 flex flex-col min-h-0`}
      >
        {shouldDisableLenis ? (
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden touch-pan-y">
            <Outlet />
          </div>
        ) : (
          <ReactLenis
            root={false}
            options={{
              autoRaf: true,
              lerp: 0.08,
              smoothWheel: true,
              wheelMultiplier: 1,
              touchMultiplier: 1.5,
            }}
            className="flex-1 flex flex-col overflow-hidden min-h-0"
          >
            <Outlet />
          </ReactLenis>
        )}
      </main>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
