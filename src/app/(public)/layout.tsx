import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import PublicNavBar from "@/components/NavBar/PublicNavBar";
import "../globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="w-full flex justify-between px-5">
          <Image priority src={logo.src} alt="logo" width={45} height={45} />
          <PublicNavBar />
        </nav>
        {children}
      </body>
    </html>
  );
}
