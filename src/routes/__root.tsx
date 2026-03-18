import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Navbar } from '../features/General/Navbar'

export const Route = createRootRoute({
  component: () => (
    <div className="fixed inset-0 overflow-hidden overscroll-none bg-[#f0f2f8] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  ),
})
