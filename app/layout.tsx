import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getSiteConfig } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI提效工坊 · 研发内部分享",
  description: "公司内部 AI 运用场景技术分享网站",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="max-w-7xl mx-auto px-6">
          <Navbar config={siteConfig} />
          {children}
        </div>
      </body>
    </html>
  );
}
