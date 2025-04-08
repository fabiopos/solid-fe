import {HeroImage} from "@/components/Images/HeroImage";
import {Features} from "@/components/landing/home/Features";
import {FirstUser} from "@/components/landing/home/FirstUser";

export default async function Home() {
    return (
        <div className="dark:bg-slate-800/40 py-24 sm:py-32 flex flex-1">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="flex items-center justify-center flex-col">
                        <h2 className="text-left text-6xl font-semibold text-cyan-300">
                            Solid Manager
                        </h2>
                        <p className="italic mt-2 max-w-lg text-balance text-center text-base font-semibold tracking-tight dark:text-slate-100 sm:text-3xl">
                            Take control of your team like never before.
                            Manage lineups, fixtures, injuries, and stats — all in one place.
                        </p>
                    </div>
                    <div className="h-auto">
                        <HeroImage
                            width={655}
                            height={680}
                            src="https://images.unsplash.com/photo-1517747614396-d21a78b850e8?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            sizes="(min-width: 1024px) 41rem, 31rem"
                            className="justify-center lg:justify-end"
                        />
                    </div>
                </div>
                <Features/>
                <FirstUser/>
                <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-background lg:rounded-l-[2rem]"></div>
                        <div
                            className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                            <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                    Mobile friendly
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                                    qui lorem cupidatat commodo.
                                </p>
                            </div>
                            <div
                                className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                                <div
                                    className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                                    <img
                                        className="size-full object-cover object-top"
                                        src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
                    </div>
                    <div className="relative max-lg:row-start-1">
                        <div className="absolute inset-px rounded-lg bg-background max-lg:rounded-t-[2rem]"></div>
                        <div
                            className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                    Team Setup
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit
                                    maiores impedit.
                                </p>
                            </div>
                            <div
                                className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                                <img
                                    className="w-full max-lg:max-w-xs"
                                    src="https://tailwindui.com/plus/img/component-images/bento-03-performance.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div
                            className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
                    </div>
                    <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                        <div className="absolute inset-px rounded-lg bg-background"></div>
                        <div
                            className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                    Match Stats
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                                    suspendisse semper morbi.
                                </p>
                            </div>
                            <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                                <img
                                    className="h-[min(152px,40cqw)] object-cover"
                                    src="https://tailwindui.com/plus/img/component-images/bento-03-security.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div
                            className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
                    </div>
                    <div className="relative lg:row-span-2">
                        <div
                            className="absolute inset-px rounded-lg bg-background max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                        <div
                            className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                            <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                    Powerful APIs
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Sit quis amet rutrum tellus ullamcorper ultricies libero dolor
                                    eget sem sodales gravida.
                                </p>
                            </div>
                            <div
                                className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                                <div
                                    className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                                    <img
                                        className="size-full object-cover object-top"
                                        src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
