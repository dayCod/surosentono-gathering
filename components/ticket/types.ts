// Shared types for the Ticket Generator feature
export interface TicketData {
  nama: string;
  keluarga: string;
  jenis: "makan" | "kamar";
  pax: number;
  issued: boolean;
  serial: number;
}
