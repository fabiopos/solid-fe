'use client'

import Image from "next/image";

const team = [
    {
        name: 'Fabio Posada',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
]

export default function AboutTeam() {
    return (
        <div>
            <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
                <Image
                    height={500}
                    width={500}
                    alt=""
                    src="https://images.unsplash.com/photo-1598826859769-e62543ab62b0?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
                />
            </div>
            <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-pretty text-4xl font-semibold tracking-tight text-cyan-300 sm:text-5xl">Our
                        team</h2>
                    <p className="mt-6 text-lg/8 text-gray-300">
                        We’re a dynamic group of individuals who are passionate about what we do and dedicated to
                        delivering the
                        best results for our clients.
                    </p>
                </div>
                <ul
                    role="list"
                    className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                >
                    {team.map((person) => (
                        <li key={person.name}>
                            <Image width={45} height={45} alt="" src={person.imageUrl}
                                   className="mx-auto size-24 rounded-full"/>
                            <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-cyan-300">{person.name}</h3>
                            <p className="text-sm/6 text-gray-300">{person.role}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}