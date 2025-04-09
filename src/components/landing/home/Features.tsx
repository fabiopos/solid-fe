import React from 'react'

const features = [
    {
        name: 'Manage lineups with ease',
        description:
            'Drag and drop players into formations and adjust positions before every match.',
        icon: ManageIcon,
    },
    {
        name: 'Schedule and reminders',
        description:
            'Stay on top of your next games with a synced calendar and location-based match info.',
        icon: ScheduleIcon,
    },
    {
        name: 'Track your league performance',
        description:
            'See your team’s current position, wins, losses, and goals in real time.',
        icon: ClockIcon,
    },
    {
        name: 'Player availability',
        description:
            'Know who’s in or out each matchday, with player status updates and injuries.',
        icon: UserIcon,
    },
    {
        name: 'Injury reports',
        description:
            'Track player injuries and expected recovery dates to better plan your squad.',
        icon: BatteryIcon,
    },
    {
        name: 'Player stats & history',
        description:
            'Check attendance, goals, and performance for every player on your roster.',
        icon: DeviceChartIcon,
    },
]

function ManageIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor"
             className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
        </svg>
    )
}

function ScheduleIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor"
             className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
        </svg>
    )
}

function ClockIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor"
             className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
    )
}

function UserIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor"
             className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
        </svg>
    )
}

function BatteryIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor"
             className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5h6.75V15H4.5v-4.5ZM3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z"/>
        </svg>
    )
}

function DeviceChartIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor"
             className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"/>
        </svg>
    )
}

export default async function Features() {
    return (
        <section
            id="features"
            aria-label="Features"
            className="py-20 sm:py-32"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    <h2 className="text-3xl font-medium tracking-tight text-cyan-300">
                        Now is the time to build your team.
                    </h2>
                    <p className="mt-2 text-lg text-gray-300">
                        Whether you’re a coach, captain or weekend warrior — Solid Manager gives you the tools to stay
                        organized, compete better, and enjoy the game like never before.
                    </p>
                </div>
                <ul
                    role="list"
                    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
                >
                    {features.map((feature) => (
                        <li
                            key={feature.name}
                            className="rounded-2xl border border-gray-200 p-8 bg-cyan-500/20 shadow-xl"
                        >
                            <feature.icon className="h-8 w-8"/>
                            <h3 className="mt-6 font-semibold text-cyan-400">
                                {feature.name}
                            </h3>
                            <p className="mt-2 text-gray-200">{feature.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
