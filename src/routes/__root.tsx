import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Navbar } from '../features/General/Navbar'

export const Route = createRootRoute({
  component: () => (
    <div className="fixed inset-0 overscroll-none bg-[#f0f2f8] flex flex-col">
      <Navbar />
      <main className="flex-1 no-scrollbar flex flex-col overflow-y-auto">
        <Outlet />
      </main>
    </div>
  ),
})
