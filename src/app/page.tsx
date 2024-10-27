import { auth } from "@/auth";
import LoginButton from "@/components/Login/LoginButton/LoginButton";
import LogoutButton from "@/components/Logout/LogoutButton";
import { H1 } from "@/components/ui/typograhpy";
import Landing from "@/features/landing/infraestructure/Landing";
export default async function Home() {
  const session = await auth();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <H1>Home</H1>
        <Landing />
        <LogoutButton />
        <LoginButton />
      </main>
    </div>
  );
}
