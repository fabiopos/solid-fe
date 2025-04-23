interface LayoutProps {
    children: React.ReactNode;
}

export default function LayoutLogin(props: LayoutProps) {
    return (
        <main className="w-full items-center flex border justify-center">
            <div className="border p-5 rounded-lg bg-cyan-900/30 dark:bg-cyan-700">
                <h1 className="text-xl text-right font-bold mb-5">Login</h1>
                {props.children}
            </div>
        </main>
    );
}
