interface LayoutProps {
    children: React.ReactNode;
  }
  
  export default function LayoutSubscription(props: LayoutProps) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Subscription
          </h1>        
          {props.children}
          
        </main>
      </div>
    );
  }
  