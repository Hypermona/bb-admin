"use client"
import Content from "@/context/content";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Content.Provider>{children}</Content.Provider>;
}
