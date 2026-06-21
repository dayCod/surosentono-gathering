"use client";

import { ticketFamilies } from "@/data/ticket-families";
import type { TicketData } from "./types";

interface TicketFormProps {
  ticket: TicketData;
  setTicket: React.Dispatch<React.SetStateAction<TicketData>>;
}

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  letterSpacing: "0.18em",
  fontWeight: 700,
  textTransform: "uppercase",
  color: "#c6f03c",
  marginBottom: 8,
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  background: "#241733",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 3,
  color: "#fff",
  fontFamily: "'Archivo', sans-serif",
  fontSize: 15,
  fontWeight: 600,
  padding: "13px 14px",
  outline: "none",
};

export default function TicketForm({ ticket, setTicket }: TicketFormProps) {
  const { nama, keluarga, jenis, pax } = ticket;
  const isMakan = jenis === "makan";
  const pricePerPax = isMakan ? 100000 : 200000;
  const total = pricePerPax * pax;
  const totalLabel =
    "Rp " + total.toLocaleString("id-ID");

  const reset = (partial: Partial<TicketData>) =>
    setTicket((s) => ({ ...s, ...partial, issued: false }));

  const activeBtnStyle: React.CSSProperties = {
    background: "#c6f03c",
    color: "#16101f",
    border: "1px solid #c6f03c",
    borderRadius: 3,
    fontFamily: "'Archivo', sans-serif",
    fontWeight: 800,
    fontSize: 13,
    lineHeight: 1.15,
    textTransform: "uppercase",
    padding: "12px 10px",
    cursor: "pointer",
    textAlign: "left",
  };

  const inactiveBtnStyle: React.CSSProperties = {
    background: "#241733",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 3,
    fontFamily: "'Archivo', sans-serif",
    fontWeight: 800,
    fontSize: 13,
    lineHeight: 1.15,
    textTransform: "uppercase",
    padding: "12px 10px",
    cursor: "pointer",
    textAlign: "left",
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 4,
        padding: "26px 24px",
      }}
    >
      {/* Section title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          marginBottom: 22,
        }}
      >
        <div style={{ width: 9, height: 22, background: "#c6f03c" }} />
        <h2
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 15,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Data Tiket
        </h2>
      </div>

      {/* Nama Lengkap */}
      <label style={LABEL_STYLE}>Nama Lengkap</label>
      <input
        type="text"
        className="tg-input"
        value={nama}
        onChange={(e) => reset({ nama: e.target.value })}
        placeholder="Tulis nama tamu"
        style={INPUT_STYLE}
      />

      {/* Nama Keluarga */}
      <label style={{ ...LABEL_STYLE, margin: "20px 0 8px" }}>
        Nama Keluarga
      </label>
      <div style={{ position: "relative" }}>
        <select
          className="tg-input"
          value={keluarga}
          onChange={(e) => reset({ keluarga: e.target.value })}
          style={{
            ...INPUT_STYLE,
            appearance: "none",
            WebkitAppearance: "none",
            paddingRight: 40,
            cursor: "pointer",
          }}
        >
          {ticketFamilies.map((k) => (
            <option key={k} value={k}>
              Keluarga {k}
            </option>
          ))}
        </select>
        <div
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "#c6f03c",
            fontSize: 12,
          }}
        >
          ▼
        </div>
      </div>

      {/* Jenis Tiket */}
      <label style={{ ...LABEL_STYLE, margin: "20px 0 8px" }}>
        Jenis Tiket
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        <button
          onClick={() => reset({ jenis: "makan" })}
          style={isMakan ? activeBtnStyle : inactiveBtnStyle}
        >
          Hanya Makan
          <br />
          <span style={{ fontSize: 11, opacity: 0.7 }}>100K / pax</span>
        </button>
        <button
          onClick={() => reset({ jenis: "kamar" })}
          style={!isMakan ? activeBtnStyle : inactiveBtnStyle}
        >
          Kamar &amp; Makan
          <br />
          <span style={{ fontSize: 11, opacity: 0.7 }}>200K / pax</span>
        </button>
      </div>

      {/* Jumlah Pax */}
      <label style={{ ...LABEL_STYLE, margin: "20px 0 8px" }}>
        Jumlah Pax
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          className="tg-stepper-btn"
          onClick={() =>
            reset({ pax: Math.max(1, pax - 1) })
          }
          style={{
            width: 46,
            height: 46,
            flex: "none",
            background: "#241733",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 3,
            color: "#c6f03c",
            fontSize: 22,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          −
        </button>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            background: "#241733",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 3,
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 20,
            padding: 11,
          }}
        >
          {pax}
        </div>
        <button
          className="tg-stepper-btn"
          onClick={() =>
            reset({ pax: Math.min(99, pax + 1) })
          }
          style={{
            width: 46,
            height: 46,
            flex: "none",
            background: "#241733",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 3,
            color: "#c6f03c",
            fontSize: 22,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>

      {/* Total */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          margin: "24px 0 4px",
          paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Total
        </span>
        <span
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 28,
            color: "#c6f03c",
          }}
        >
          {totalLabel}
        </span>
      </div>

      {/* Generate button */}
      <button
        className="tg-btn-generate"
        onClick={() =>
          setTicket((s) => ({ ...s, issued: true, serial: s.serial + 1 }))
        }
        style={{
          width: "100%",
          marginTop: 16,
          background: "#c6f03c",
          color: "#16101f",
          border: "none",
          borderRadius: 3,
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: 14,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: 16,
          cursor: "pointer",
        }}
      >
        Generate Tiket
      </button>

      {/* Print button */}
      <button
        className="tg-btn-print"
        onClick={() => window.print()}
        style={{
          width: "100%",
          marginTop: 9,
          background: "transparent",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 3,
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: 13,
          cursor: "pointer",
        }}
      >
        Cetak / Simpan PDF
      </button>
    </div>
  );
}
