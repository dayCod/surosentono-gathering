"use client";

import type { TicketData } from "./types";

interface TicketPreviewProps {
  ticket: TicketData;
}

// FNV-1a 32-bit hash
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// 13×13 deterministic pseudo-QR with finder squares
function makeQR(seed: string): number[][] {
  const N = 13;
  let s = hash(seed) || 1;
  const rnd = () => {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    return (s >>> 8) / (1 << 24);
  };
  const grid: number[][] = Array.from({ length: N }, () => Array(N).fill(0));
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) grid[y][x] = rnd() > 0.5 ? 1 : 0;

  const finder = (ox: number, oy: number) => {
    for (let y = 0; y < 7; y++)
      for (let x = 0; x < 7; x++) {
        const edge = x === 0 || x === 6 || y === 0 || y === 6;
        const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        grid[oy + y][ox + x] = edge || core ? 1 : 0;
      }
  };
  finder(0, 0);
  finder(N - 7, 0);
  finder(0, N - 7);
  return grid;
}

export default function TicketPreview({ ticket }: TicketPreviewProps) {
  const { nama, keluarga, jenis, pax, issued } = ticket;
  const isMakan = jenis === "makan";

  // Theme
  const lime = "#c6f03c";
  const purple = "#9d1ae0";
  const theme = isMakan
    ? { stubBg: lime, stubFg: purple, bodyBg: purple, bodyFg: lime, diag: purple, org: lime }
    : { stubBg: purple, stubFg: lime, bodyBg: lime, bodyFg: purple, diag: lime, org: purple };

  // Barcode gradient
  const barcodeStyle = `repeating-linear-gradient(90deg, ${theme.stubFg} 0 2px, transparent 2px 3px, ${theme.stubFg} 3px 7px, transparent 7px 9px, ${theme.stubFg} 9px 11px, transparent 11px 14px)`;

  // Topo contour
  const contour = isMakan ? "rgba(255,255,255,0.16)" : "rgba(157,26,224,0.16)";
  const topoStyle = `repeating-radial-gradient(ellipse 130% 90% at 22% 55%, transparent 0 13px, ${contour} 13px 15px)`;
  const contour2 = isMakan ? "rgba(157,26,224,0.5)" : "rgba(255,255,255,0.35)";
  const topoStyle2 = `repeating-radial-gradient(ellipse 120% 90% at 90% 40%, transparent 0 11px, ${contour2} 11px 13px)`;

  // Seed & QR
  const seed = (nama.trim() || "TAMU") + "|" + keluarga + "|" + jenis;
  const grid = makeQR(seed);
  const qrCells: { bg: string }[] = [];
  for (let y = 0; y < 13; y++)
    for (let x = 0; x < 13; x++)
      qrCells.push({ bg: grid[y][x] ? theme.stubFg : "transparent" });

  // Derived values
  const namaLabel = nama.trim() ? nama.trim().toUpperCase() : "NAMA TAMU";
  const keluargaLabel = "KELUARGA " + keluarga.toUpperCase();
  const paxLabel = pax + " PAX";
  const stubTitle = isMakan ? "TIKET HANYA MAKAN" : "TIKET KAMAR & MAKAN";
  const deskripsi = isMakan
    ? "Berlaku 1 orang, sudah termasuk 3 kali makan."
    : "Berlaku 1 orang, sudah termasuk kamar 1 kasur & 3 kali makan.";
  const priceLabel = isMakan ? "100K/PAX" : "200K/PAX";

  const h = hash(seed);
  const ticketNo = issued
    ? "SS27-" + (isMakan ? "M" : "K") + "-" + String((h % 90000) + 10000)
    : "—— —— ——";
  const qrSeedLabel = issued
    ? "KODE " + (h % 1000000).toString().padStart(6, "0")
    : "Belum digenerate";

  return (
    <div className="tg-preview-sticky" style={{ position: "sticky", top: 24 }}>
      {/* Eyebrow */}
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          marginBottom: 12,
        }}
      >
        Pratinjau Tiket{issued ? " · TERBIT" : ""}
      </div>

      {/* Ticket */}
      <div
        id="ticketPrintArea"
        style={{
          width: "100%",
          aspectRatio: "3.35 / 1",
          borderRadius: 5,
          overflow: "hidden",
          boxShadow: "0 30px 70px -20px rgba(0,0,0,0.7)",
          display: "flex",
          background: theme.bodyBg,
        }}
      >
        {/* STUB */}
        <div
          style={{
            width: "23%",
            flex: "none",
            background: theme.stubBg,
            color: theme.stubFg,
            position: "relative",
            display: "flex",
            alignItems: "stretch",
            borderRight: `3px dashed ${theme.bodyBg}`,
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "5% 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Barcode */}
            <div
              style={{
                width: "62%",
                height: "20%",
                background: barcodeStyle,
              }}
            />
            {/* QR */}
            <div
              style={{
                width: "52%",
                aspectRatio: "1",
                display: "grid",
                gridTemplateColumns: "repeat(13, 1fr)",
                gridTemplateRows: "repeat(13, 1fr)",
              }}
            >
              {qrCells.map((c, i) => (
                <div key={i} style={{ background: c.bg }} />
              ))}
            </div>
          </div>
          {/* Vertical title */}
          <div
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(15px, 2.4vw, 30px)",
              letterSpacing: "0.01em",
              textTransform: "uppercase",
              padding: "6% 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            {stubTitle}
          </div>
        </div>

        {/* BODY */}
        <div
          style={{
            flex: 1,
            position: "relative",
            color: theme.bodyFg,
            overflow: "hidden",
          }}
        >
          {/* Topo contour bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: topoStyle,
              opacity: 0.5,
            }}
          />
          {/* Diagonal accent block */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: theme.diag,
              clipPath: "polygon(72% 0, 100% 0, 100% 100%, 88% 100%)",
            }}
          />
          {/* Diagonal contour overlay */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "30%",
              background: topoStyle2,
              opacity: 0.5,
              clipPath: "polygon(72% 0, 100% 0, 100% 100%, 88% 100%)",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              height: "100%",
              padding: "5.5% 5%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                borderLeft: `3px solid ${theme.bodyFg}`,
                paddingLeft: 14,
                flex: "none",
              }}
            >
              <div
                style={{
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: "clamp(9px, 1.4vw, 14px)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Jejak Warisan
              </div>
              <div
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "clamp(22px, 4.3vw, 52px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                }}
              >
                Suro Sentono
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(8px, 1.1vw, 12px)",
                  letterSpacing: "0.18em",
                  marginTop: 3,
                }}
              >
                27–28 MARET 2027
              </div>
            </div>

            {/* Venue */}
            <div
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "clamp(13px, 2.1vw, 24px)",
                lineHeight: 1,
                textTransform: "uppercase",
                marginTop: "auto",
              }}
            >
              Bina Karakter
              <br />
              Hall
            </div>

            {/* Bottom row: name + price */}
            <div
              style={{
                display: "flex",
                gap: "6%",
                alignItems: "flex-end",
                marginTop: "auto",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(8px, 1.2vw, 13px)",
                    letterSpacing: "0.06em",
                  }}
                >
                  ATAS NAMA :
                </div>
                <div
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "clamp(12px, 1.9vw, 21px)",
                    lineHeight: 1.02,
                    textTransform: "uppercase",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {namaLabel}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(8px, 1.15vw, 13px)",
                    letterSpacing: "0.04em",
                    marginTop: 2,
                    opacity: 0.85,
                  }}
                >
                  {keluargaLabel} · {paxLabel}
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(7px, 1vw, 11px)",
                    letterSpacing: "0.05em",
                    marginTop: 5,
                    opacity: 0.7,
                  }}
                >
                  {deskripsi}
                </div>
              </div>
              <div style={{ flex: "none" }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(8px, 1.2vw, 13px)",
                    letterSpacing: "0.1em",
                  }}
                >
                  PRICE
                </div>
                <div
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "clamp(18px, 3.4vw, 40px)",
                    lineHeight: 0.9,
                    whiteSpace: "nowrap",
                  }}
                >
                  {priceLabel}
                </div>
              </div>
            </div>

            {/* Organized by */}
            <div
              style={{
                position: "absolute",
                right: "5%",
                bottom: "4%",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(8px, 1.1vw, 13px)",
                color: theme.org,
              }}
            >
              organized by the{" "}
              <span style={{ fontWeight: 900 }}>prakoso.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: ticket number + code */}
      <div
        style={{
          marginTop: 12,
          fontSize: 12,
          letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.45)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          No. Tiket:{" "}
          <span style={{ color: "#c6f03c", fontWeight: 700 }}>{ticketNo}</span>
        </span>
        <span>{qrSeedLabel}</span>
      </div>
    </div>
  );
}
