import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: () => (
        <>
            <h1>My App</h1>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
})