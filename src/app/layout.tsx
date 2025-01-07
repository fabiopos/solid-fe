import type { Metadata } from "next";
import { Exo_2 } from 'next/font/google'

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/context/Providers";
import { SidebarProvider } from "@/components/ui/sidebar";
import GlobalNavBar from "@/components/NavBar/GlobalNavBar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Exo_2({
  variable: '--font-inter',
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '200', '300', '500'],
  display: 'swap'
})

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <GlobalNavBar />
            <SidebarProvider>{children}</SidebarProvider>
          </Providers>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
