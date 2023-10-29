"use client";
import "./globals.css";
import "../components/Editor/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import MediaLibrary from "@/context/mediaLibrary";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <MediaLibrary.Provider>
            {children}
            <Toaster />
          </MediaLibrary.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
