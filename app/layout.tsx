import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import Toast from "@/components/ui/Toast";
import PWAInstall from "@/components/PWAInstall";

export const metadata: Metadata = {
  title: "Fit Genie - AI 스마트 피트니스",
  description: "AI 기반 개인 맞춤 운동 루틴과 전문 트레이너 매칭",
  manifest: "/manifest.json",
  themeColor: "#00D9FF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Fit Genie",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Fit Genie" />
      </head>
      <body className="antialiased">
        <div className="w-full max-w-7xl mx-auto min-h-screen bg-cyber-dark relative">
          <main className="pb-16">
            {children}
          </main>
          <BottomNav />
          <Toast />
          <PWAInstall />
        </div>
      </body>
    </html>
  );
}
