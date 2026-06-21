// Override root layout — halaman tiket tidak pakai Navbar/Footer
export default function TicketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
