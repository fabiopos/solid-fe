import Features from "@/components/landing/home/Features";
import FirstUser from "@/components/landing/home/FirstUser";
import HeroSection from "@/components/landing/home/HeroSection";
import AppExamples from "@/components/landing/home/AppExamples";

export default async function Home() {
    return (
        <div className="dark:bg-slate-800/40 py-24 sm:py-32 flex flex-1">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <HeroSection/>
                <Features/>
                <AppExamples/>
                <FirstUser/>
            </div>
        </div>
    );
}
