import type { Metadata } from "next";
import { Cinzel, Inter, Poppins, Share_Tech_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const cinzel = Cinzel({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  display: "swap",
});

const blackOpsOne = localFont({
  src: "../assets/fonts/BlackOpsOne-Regular.ttf",
  variable: "--font-black-ops",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "KEDANTRA ",
  description:
    "Advanced, secure, and intelligent digital systems Built for the future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${poppins.variable} ${inter.variable} ${shareTechMono.variable} ${blackOpsOne.variable}`}
    >
      <body className="font-body bg-black text-white antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
