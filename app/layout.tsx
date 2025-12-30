import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Wealth AI Co-pilot",
  description: "L'Intelligence Artificielle au service de l'Excellence Patrimoniale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`} suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
