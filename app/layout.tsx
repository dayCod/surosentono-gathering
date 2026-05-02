import type { Metadata } from "next";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://surosentono-gathering.vercel.app"),
  title: "Gathering Keluarga Surosentono 2025",
  description:
    "Mempererat Tali Silaturahmi - Acara gathering tahunan keluarga besar Surosentono",
  openGraph: {
    title: "Gathering Keluarga Surosentono 2025",
    description: "Mempererat Tali Silaturahmi Keluarga Besar",
    images: ["/images/hero/hero-bg.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} ${dancing.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
