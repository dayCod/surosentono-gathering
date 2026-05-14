import type { Metadata } from "next";
import { Outfit, Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://surosentono-gathering.vercel.app"),
  title: "Halal Bi Halal — Jejak Warisan Suro Sentono 2027",
  description:
    "Halal Bi Halal Keluarga Besar Suro Sentono, 27-28 Maret 2027 di Bina Karakter Hall. Organized by the Prakoso.",
  keywords: ["gathering", "keluarga", "surosentono", "silaturahmi", "bogor", "halal bi halal"],
  authors: [{ name: "Keluarga Surosentono" }],
  openGraph: {
    title: "Halal Bi Halal — Jejak Warisan Suro Sentono 2027",
    description: "Jejak Warisan Keluarga Besar Suro Sentono",
    url: "https://surosentono-gathering.vercel.app",
    siteName: "Halal Bi Halal Suro Sentono",
    images: [
      {
        url: "/images/og-cover.svg",
        width: 1200,
        height: 630,
        alt: "Halal Bi Halal Suro Sentono 2027",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Halal Bi Halal — Jejak Warisan Suro Sentono 2027",
    description: "Jejak Warisan Keluarga Besar Suro Sentono",
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
      className={`${outfit.variable} ${inter.variable} ${playfair.variable} h-full antialiased`}
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
