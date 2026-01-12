import type { Metadata } from "next";
import { Suspense } from "react";
import { Hedvig_Letters_Serif, Inter } from "next/font/google";
import "./globals.css";
import HeaderNavigation from "@/components/header-navigation";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import HeaderNavigationProvider from "@/contexts/header-navigation-providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const hedvigSerif = Hedvig_Letters_Serif({
  variable: "--font-hedvig-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IONA Marketplace",
  description: "Discover unique and handcrafted items at IONA Marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${hedvigSerif.variable} antialiased`}>
        <div className="min-h-screen text-amber-900 flex flex-col mx-auto w-full">
          <HeaderNavigationProvider>
            <HeaderNavigation />
            <div className="px-4 py-4 sm:px-6 md:px-10 lg:px-20 xl:px-30">
              <Suspense>
                <Breadcrumbs />
              </Suspense>
            </div>
            <div className="px-4 pb-10 flex-1 sm:px-6 md:px-10 lg:px-20 xl:px-30">
              {children}
            </div>
          </HeaderNavigationProvider>
        </div>
      </body>
    </html>
  );
}
