import {HeroImage} from "@/components/Images/HeroImage";

export default async function HeroSection() {
    return (
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
    )
}