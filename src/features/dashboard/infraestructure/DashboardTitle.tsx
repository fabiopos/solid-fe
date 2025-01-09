import { TextEffect } from "@/components/ui/text-effect";

function DashboardTitle() {
  return (
    <>
      <h2 className="text-center text-base/7 font-semibold text-primary uppercase">
        <TextEffect per="char" preset="fade">
          Solid Manager
        </TextEffect>
      </h2>
      <TextEffect
        per="word"
        as="h3"
        preset="slide"
        speedReveal={1000}
        className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl dark:font-semibold tracking-tight dark:text-slate-100 sm:text-5xl"
      >
        Everything you need to manage your team
      </TextEffect>
    </>
  );
}

export default DashboardTitle;
