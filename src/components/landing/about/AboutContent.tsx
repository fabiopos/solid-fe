'use client'

const stats = [
    {label: 'Simplicity', value: 'Everything your team needs — nothing it doesn’t.'},
    {label: 'Accountability', value: 'Keep everyone aligned and ready before game day.'},
    {label: 'Team spirit', value: 'Designed to help players, captains, and coaches work better together.'},
]

export default function AboutContent() {
    return (
        <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <h2 className="text-pretty text-4xl font-semibold tracking-tight text-cyan-300 sm:text-5xl">
                    Our mission
                </h2>
                <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                    <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                        <p className="text-xl/8 text-gray-300">
                            We believe amateur football deserves professional-level tools. Our mission is to simplify
                            how teams manage lineups, track performance, and communicate — so they can focus on what
                            really matters: playing the game they love.
                        </p>
                    </div>
                    <div className="lg:flex lg:flex-auto lg:justify-center">
                        <dl className="w-64 space-y-8 xl:w-80">
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                                    <dt className="text-base/7 text-gray-100">{stat.label}</dt>
                                    <dd className="text-lg font-semibold tracking-tight text-cyan-300">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}