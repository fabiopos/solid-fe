import AboutSection from "@/components/landing/about/AboutSection";
import AboutContent from "@/components/landing/about/AboutContent";
import AboutTeam from "@/components/landing/about/AboutTeam";
import AboutValues from "@/components/landing/about/AboutValues";

const AboutPage = () => {
    return (
        <div className="mx-auto pb-24">
            <AboutSection/>
            <AboutContent/>
            <AboutValues/>
            <AboutTeam/>
        </div>

    )
}

export default AboutPage