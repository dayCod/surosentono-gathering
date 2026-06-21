"use client";

import { useState } from "react";
import { ticketFamilies } from "@/data/ticket-families";
import TicketForm from "@/components/ticket/TicketForm";
import TicketPreview from "@/components/ticket/TicketPreview";
import type { TicketData } from "@/components/ticket/types";

export default function TicketPage() {
  const [ticket, setTicket] = useState<TicketData>({
    nama: "",
    keluarga: ticketFamilies[0] ?? "",
    jenis: "makan",
    pax: 1,
    issued: false,
    serial: 0,
  });

  return (
    <>
      {/* Google Fonts — Archivo (khusus halaman ini) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500;1,700;1,900&family=Archivo+Black&display=swap"
        rel="stylesheet"
      />

      {/* Interactive + responsive + print CSS */}
      <style>{`
        .tg-input:focus { border-color: #c6f03c !important; }
        .tg-btn-print:hover { border-color: #c6f03c !important; color: #c6f03c !important; }
        .tg-btn-generate:hover { background: #d6ff52 !important; }
        .tg-stepper-btn:hover { border-color: rgba(255,255,255,.35) !important; }
        ::selection { background: #c6f03c; color: #16101f; }
        input::placeholder { color: rgba(255,255,255,.35); }
        select option { background: #241733; color: #fff; }
        @media (max-width: 760px) {
          .tg-grid { grid-template-columns: 1fr !important; }
          .tg-preview-sticky { position: static !important; }
        }
        @media print {
          @page { size: landscape; margin: 0; }
          body * { visibility: hidden !important; }
          #ticketPrintArea, #ticketPrintArea * { visibility: visible !important; }
          #ticketPrintArea { position: fixed; inset: 0; margin: auto; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(120% 90% at 85% 0%, #2a1340 0%, #16101f 55%, #0e0a16 100%)",
          fontFamily: "'Archivo', sans-serif",
          color: "#fff",
          padding: "40px 28px 72px",
        }}
      >
        {/* TOP BAR */}
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto 34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{ width: 13, height: 40, background: "#c6f03c" }}
            />
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.42em",
                  fontWeight: 700,
                  color: "#c6f03c",
                  textTransform: "uppercase",
                }}
              >
                Jejak Warisan
              </div>
              <div
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: 21,
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                  marginTop: 3,
                }}
              >
                SURO SENTONO
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: "right",
              fontSize: 11,
              letterSpacing: "0.22em",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            27–28 Maret 2027
            <br />
            <span style={{ color: "#c6f03c" }}>Bina Karakter Hall</span>
          </div>
        </div>

        {/* HEADING */}
        <div style={{ maxWidth: 1180, margin: "0 auto 26px" }}>
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(38px, 6vw, 72px)",
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
            }}
          >
            Buat Tiket
            <br />
            <span style={{ color: "#c6f03c" }}>Kamu Sendiri.</span>
          </h1>
          <p
            style={{
              marginTop: 14,
              maxWidth: 480,
              fontSize: 15,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Pilih nama keluarga dan jenis tiket, lalu tiket reuni akbar akan
            langsung jadi. Cetak atau simpan untuk dibawa ke acara.
          </p>
        </div>

        {/* MAIN GRID */}
        <div
          className="tg-grid"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "380px minmax(0, 1fr)",
            gap: 30,
            alignItems: "start",
          }}
        >
          <TicketForm ticket={ticket} setTicket={setTicket} />
          <TicketPreview ticket={ticket} />
        </div>
      </div>
    </>
  );
}
