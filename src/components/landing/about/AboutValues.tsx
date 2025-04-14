'use client'

const values = [
    {
        name: 'Be organized',
        description:
            'Bring structure to your team with lineups, attendance, and match info in one place.',
    },
    {
        name: 'Make coaching easier',
        description:
            'Know who’s in, who’s out, and build your matchday squad fast — without last-minute surprises.',
    },
    {
        name: 'Focus on the game',
        description:
            'Spend less time solving logistics and more time doing what matters: enjoying football.',
    },
    {
        name: 'Bring your team together',
        description:
            'Keep everyone informed with shared calendars, availability updates, and smooth communication.',
    },
    {
        name: 'Play smarter',
        description:
            'Track performance, match history, and player stats to evolve as a team — game after game.',
    },
    {
        name: 'Save time, every week',
        description:
            'Forget the spreadsheets and group chats. Solid Manager simplifies your workflow so you can coach better.',
    },
]

export default function AboutValues() {
    return (
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-pretty text-4xl font-semibold tracking-tight text-cyan-300 sm:text-5xl">
                    What drives us
                </h2>
                <p className="mt-6 text-lg/8 text-gray-300">
                    We designed Solid Manager to simplify the game off the pitch — for everyone who makes football
                    happen every weekend.
                </p>
            </div>
            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {values.map((value) => (
                    <div key={value.name}>
                        <dt className="font-semibold text-cyan-300">{value.name}</dt>
                        <dd className="mt-1 text-gray-300">{value.description}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}