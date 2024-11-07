import { H1, H2 } from "@/components/ui/typograhpy";

export default function Custom404() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <H1>
            404  <span className="text-muted font-normal">|</span> <span className="font-normal">Page Not Found</span>
          </H1>
        </div>
      </main>
    </div>
  );
}
