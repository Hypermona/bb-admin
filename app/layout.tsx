"use client";
import "./globals.css";
import "../components/Editor/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import MediaLibrary from "@/context/mediaLibrary";
import Content from "@/context/content";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <MediaLibrary.Provider>
            <Content.Provider>
              {children}
              <Toaster />
            </Content.Provider>
          </MediaLibrary.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
