import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Pendaftar — Suro Sentono Gathering",
  description: "Internal dashboard untuk monitoring pendaftar Halal Bi Halal Suro Sentono",
  robots: "noindex, nofollow",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
