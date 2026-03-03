import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(`/`)({
    component:Index,
})

function Index() {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold'>Hello World</h1>
            <p className='text-lg'>This is the index page</p>
        </div>
    )
}