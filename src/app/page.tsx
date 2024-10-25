'use server'
import { authOptions } from "@/constants/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const { session } = await getData();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Home
        </h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <a href="/login">Login</a>
      </main>
    </div>
  );
}

const getData = async () => {
  const session = await getServerSession(authOptions);
  return { session };
};
