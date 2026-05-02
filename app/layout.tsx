import type { Metadata } from "next";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
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
  title: "Gathering Keluarga Surosentono 2025 - Mempererat Silaturahmi",
  description:
    "Undangan Gathering Keluarga Besar Surosentono 2025 di Bogor. Mari berkumpul mempererat tali silaturahmi antar generasi.",
  keywords: ["gathering", "keluarga", "surosentono", "silaturahmi", "bogor"],
  authors: [{ name: "Keluarga Surosentono" }],
  openGraph: {
    title: "Gathering Keluarga Surosentono 2025",
    description: "Mempererat Tali Silaturahmi Keluarga Besar",
    url: "https://surosentono-gathering.vercel.app",
    siteName: "Gathering Keluarga Surosentono",
    images: [
      {
        url: "/images/og-cover.svg",
        width: 1200,
        height: 630,
        alt: "Gathering Keluarga Surosentono 2025",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gathering Keluarga Surosentono 2025",
    description: "Mempererat Tali Silaturahmi Keluarga Besar",
    images: ["/images/og-cover.svg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
      <body className="min-h-full flex flex-col font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
