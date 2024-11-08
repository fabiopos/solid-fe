import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/context/Providers";
import NavBar from "@/components/NavBar/NavBar";
import SelectTeamModal from "@/features/team-select/infraestructure/SelectTeamModal";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Solid Manager",
  description: "Soccer teams manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-950 dark:text-white`}
      >
        <Providers>
          <nav className="w-full flex justify-between px-5">
            <Image priority src={logo.src} alt="logo" width={45} height={45} />
            <NavBar />
          </nav>
          <SidebarProvider>
            <main>{children}</main>
          </SidebarProvider>

          <SelectTeamModal />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}