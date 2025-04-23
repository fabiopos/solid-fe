import Image from "next/image";

export default async function AppExamples() {
    return (
        <section
            id="photos-examples"
            aria-label="Photos examples"
            className=" pb-24 sm:pb-32"
        >
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-center text-base/7 font-semibold  text-cyan-600 dark:text-cyan-300">
                    All in one place
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-600 dark:text-gray-300 sm:text-5xl">
                    Everything you need to coaching a team in your app
                </p>
                <div className="mt-10 grid gap-4 grid-cols-1 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                    <div className="relative lg:row-span-2">
                        <div
                            className="absolute inset-px rounded-lg bg-cyan-200/30 lg:rounded-l-[2rem]"></div>
                        <div
                            className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                            <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                <p className="mt-2 text-2xl font-medium tracking-tight  text-cyan-600 dark:text-cyan-300 max-lg:text-center">
                                    Save time before every match
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-800 dark:text-white max-lg:text-center">
                                    No more chasing players manually or guessing who’s available.
                                </p>
                            </div>
                            <div
                                className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                                <div
                                    className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                                    <Image
                                        fill
                                        className="size-full object-cover object-top"
                                        src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="futbol"
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
                    </div>
                    <div className="relative max-lg:row-start-1">
                        <div className="absolute inset-px rounded-lg bg-transparent max-lg:rounded-t-[2rem]"></div>
                        <div
                            className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10 z-10">
                                <p className=" text-2xl font-semibold tracking-tight text-gray-800 dark:text-white max-lg:text-center">
                                    🏅 Why Solid Manager works for real teams
                                </p>
                            </div>
                            <div
                                className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2 -z-20">
                                <Image
                                    fill
                                    className="w-auto object-cover"
                                    src="https://images.unsplash.com/photo-1473075109809-7a17d327bdf6?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="soccer"
                                />
                            </div>
                        </div>
                        <div
                            className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
                    </div>
                    <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                        <div className="absolute inset-px rounded-lg bg-transparent"></div>
                        <div
                            className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-cyan-600 dark:text-cyan-300 max-lg:text-center">
                                    Play smarter, not harder
                                </p>
                                <p className="mt-2 max-w-60 sm:max-w-lg text-sm/6 text-black max-lg:text-center bg-white w-96 sm:w-64 sm:p-2 mx-auto rounded-lg">
                                    Plan lineups, keep backups, and adapt on the go.
                                </p>
                            </div>
                            <div
                                className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2 -z-10">
                                <Image
                                    fill
                                    className="h-[min(152px,40cqw)] object-cover"
                                    src="https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div
                            className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
                    </div>
                    <div className="relative lg:row-span-2">
                        <div
                            className="absolute inset-px rounded-lg bg-gray-300/50 dark:bg-white/50 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                        <div
                            className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                            <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-800 dark:text-white max-lg:text-center">
                                    Build team commitment
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-800 max-lg:text-center">
                                    Track attendance and performance, and keep players engaged.
                                </p>
                            </div>
                            <div className="relative min-h-[30rem] w-full grow">
                                <div
                                    className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                                        <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                                            <div
                                                className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                                                Lineups
                                            </div>
                                            <div className="border-r border-gray-600/10 px-4 py-2">Notifications</div>
                                        </div>
                                    </div>
                                    <div className="px-6 pb-14 pt-6">{
                                        <Image
                                            fill
                                            className="h-[min(152px,40cqw)] object-cover pt-10"
                                            src="https://images.unsplash.com/photo-1569184777314-103b0f84d8e6?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt=""
                                        />

                                    }</div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}