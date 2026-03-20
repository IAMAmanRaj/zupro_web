import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ReactLenis } from 'lenis/react'
import { Navbar } from '../features/General/Navbar'

export const Route = createRootRoute({
  component: () => (
    <div className="fixed inset-0 overscroll-none bg-[#f0f2f8] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
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
      </main>
    </div>
  ),
})
