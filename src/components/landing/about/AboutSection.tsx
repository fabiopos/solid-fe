'use client'

import Image from "next/image";

export default function AboutSection() {
    return (
        <div className="relative isolate -z-10">

            <div
                aria-hidden="true"
                className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                    }}
                    className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-white to-cyan-500 opacity-40"
                />
            </div>
            <div className="overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                    <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                        <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                            <h1 className="text-pretty text-5xl font-semibold tracking-tight text-cyan-300 sm:text-7xl">
                                We’re changing the way people connect
                            </h1>
                            <p className="mt-8 text-pretty text-lg font-medium text-gray-300 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                                Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis cupidatat mollit
                                aute velit. Et
                                labore commodo nulla aliqua proident mollit ullamco exercitation tempor. Sint
                                aliqua anim nulla sunt
                                mollit id pariatur in voluptate cillum. Eu voluptate tempor esse minim amet
                                fugiat veniam occaecat
                                aliqua.
                            </p>
                        </div>
                        <div
                            className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                            <div
                                className="ml-auto w-44 h-auto flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                <div className="relative h-60">
                                    <Image
                                        fill
                                        alt="People"
                                        src="https://images.unsplash.com/photo-1453060113865-968cea1ad53a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        className="aspect-[2/3] w-full h-full rounded-xl size-full object-cover shadow-lg"
                                    />
                                    <div
                                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"/>
                                </div>
                            </div>
                            <div className="mr-auto w-44 h-auto flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                <div className="relative h-60">
                                    <Image
                                        fill
                                        alt="People"
                                        src="https://images.unsplash.com/photo-1573633509389-0e3075dea01b?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        className="aspect-[2/3] w-full h-full rounded-xl object-cover shadow-lg"
                                    />
                                    <div
                                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"/>
                                </div>
                                <div className="relative h-60">
                                    <Image
                                        fill
                                        alt=""
                                        src="https://images.unsplash.com/photo-1576763013267-01343ca79876?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        className="aspect-[2/3] w-full h-full rounded-xl object-cover shadow-lg"
                                    />
                                    <div
                                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"/>
                                </div>
                            </div>
                            <div className="w-44 h-auto flex-none space-y-8 pt-32 sm:pt-0">
                                <div className="relative h-60">
                                    <Image
                                        fill
                                        alt=""
                                        src="https://images.unsplash.com/photo-1632910121591-29e2484c0259?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        className="aspect-[2/3] w-full h-full rounded-xl object-cover shadow-lg"
                                    />
                                    <div
                                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"/>
                                </div>
                                <div className="relative h-60">
                                    <Image
                                        fill
                                        alt=""
                                        src="https://images.unsplash.com/photo-1601510145916-f07c8e1100eb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        className="aspect-[2/3] w-full h-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div
                                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}