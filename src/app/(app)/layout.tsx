import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "sonner";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const dmsans = DM_Sans({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Mmart",
  description: "Multivendor ecommerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmsans} antialiased`}
      ><NuqsAdapter><TRPCReactProvider>{children}<Toaster /></TRPCReactProvider></NuqsAdapter>

      </body>
    </html>
  );
}
