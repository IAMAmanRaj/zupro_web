import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { ReactLenis } from 'lenis/react'
import { Navbar } from '../features/General/Navbar'

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  // These routes contain nested scroll containers (e.g. `zupro-scroll`) where
  // Lenis can interfere with native scrolling.
  const shouldDisableLenis =
    pathname.startsWith('/onboarding/seeker') ||
    pathname.startsWith('/onboarding/employer') ||
    pathname.startsWith('/auth')

  return (
    <div className="fixed inset-0 overscroll-none bg-[#f0f2f8] flex flex-col">
      <Navbar />
      <main
        className={`flex-1 flex flex-col min-h-0 ${
          shouldDisableLenis ? 'overflow-y-auto' : 'overflow-hidden'
        }`}
      >
        {shouldDisableLenis ? (
          <Outlet />
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
