import type { Metadata } from "next";
import { Hedvig_Letters_Serif, Inter } from "next/font/google";
import "./globals.css";
import HeaderNavigation from "@/components/header-navigation";
import SidebarFilter from "@/components/sidebar-filter";
import Breadcrumbs from "@/components/breadcrumbs";

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
          <HeaderNavigation />
          <div className="px-30 py-6">
            <Breadcrumbs />
          </div>
          <div className="flex w-full flex-1 flex-col gap-8 px-30 pb-10 lg:flex-row">
            <div className="w-full lg:w-60">
              <SidebarFilter />
            </div>
            <main className="flex-1 space-y-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
