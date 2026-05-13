"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Pendaftar {
  no: number;
  timestamp: string;
  nama: string;
  kontak: string;
  jumlahOrang: number;
  kota: string;
  status: "Hadir" | "Tidak Hadir" | "Pending";
  kontribusi: number;
}

// ── Mock data (ganti dengan fetch Google Sheets jika sudah tersedia) ──────────
const MOCK_DATA: Pendaftar[] = [
  { no: 1, timestamp: "2026-05-01 08:12", nama: "Budi Santoso", kontak: "081234567890", jumlahOrang: 4, kota: "Jakarta", status: "Hadir", kontribusi: 200000 },
  { no: 2, timestamp: "2026-05-02 09:30", nama: "Siti Rahayu", kontak: "082345678901", jumlahOrang: 2, kota: "Bogor", status: "Hadir", kontribusi: 100000 },
  { no: 3, timestamp: "2026-05-03 10:45", nama: "Ahmad Fauzi", kontak: "083456789012", jumlahOrang: 6, kota: "Depok", status: "Pending", kontribusi: 300000 },
  { no: 4, timestamp: "2026-05-04 11:00", nama: "Dewi Kusuma", kontak: "084567890123", jumlahOrang: 3, kota: "Bekasi", status: "Hadir", kontribusi: 150000 },
  { no: 5, timestamp: "2026-05-05 13:15", nama: "Hendra Wijaya", kontak: "085678901234", jumlahOrang: 5, kota: "Tangerang", status: "Tidak Hadir", kontribusi: 0 },
  { no: 6, timestamp: "2026-05-06 14:20", nama: "Rina Puspita", kontak: "086789012345", jumlahOrang: 2, kota: "Surabaya", status: "Hadir", kontribusi: 100000 },
  { no: 7, timestamp: "2026-05-07 15:35", nama: "Joko Susilo", kontak: "087890123456", jumlahOrang: 7, kota: "Bandung", status: "Hadir", kontribusi: 350000 },
  { no: 8, timestamp: "2026-05-08 16:40", nama: "Wati Handayani", kontak: "088901234567", jumlahOrang: 3, kota: "Yogyakarta", status: "Pending", kontribusi: 150000 },
  { no: 9, timestamp: "2026-05-09 08:00", nama: "Dodi Prasetyo", kontak: "089012345678", jumlahOrang: 4, kota: "Semarang", status: "Hadir", kontribusi: 200000 },
  { no: 10, timestamp: "2026-05-10 09:10", nama: "Lestari Ningrum", kontak: "081123456789", jumlahOrang: 2, kota: "Malang", status: "Hadir", kontribusi: 100000 },
];

const PASSWORD = "surosentono2027event";

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

// ── Sub-components ────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color }: { icon: string; label: string; value: string; sub?: string; color: string }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #1E1538 0%, #2D1B5E 100%)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 16, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 28 }}>{icon}</div>
      <p style={{ fontSize: 13, color: "#9F8CC2", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
      <p style={{ fontSize: 36, fontWeight: 800, color, lineHeight: 1.1 }}>{value}</p>
      {sub && <p style={{ fontSize: 13, color: "#9F8CC2" }}>{sub}</p>}
    </div>
  );
}

function Badge({ status }: { status: Pendaftar["status"] }) {
  const styles: Record<string, React.CSSProperties> = {
    Hadir: { background: "rgba(52,211,153,0.15)", color: "#34D399", border: "1px solid rgba(52,211,153,0.4)" },
    "Tidak Hadir": { background: "rgba(248,113,113,0.15)", color: "#F87171", border: "1px solid rgba(248,113,113,0.4)" },
    Pending: { background: "rgba(251,191,36,0.15)", color: "#FBD024", border: "1px solid rgba(251,191,36,0.4)" },
  };
  return (
    <span style={{ ...styles[status], borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>
      {status}
    </span>
  );
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0A1A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter, sans-serif)" }}>
      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .login-card { animation: fadeIn 0.5s ease forwards; }
        .login-shake { animation: shake 0.5s ease; }
      `}</style>
      <div className={`login-card${shake ? " login-shake" : ""}`} style={{ width: "100%", maxWidth: 400, margin: "0 16px" }}>
        <div style={{ background: "linear-gradient(135deg, #1E1538, #2D1B5E)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 20, padding: 40, boxShadow: "0 25px 60px rgba(109,40,217,0.3)" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "var(--font-outfit, sans-serif)" }}>Dashboard Panitia</h1>
            <p style={{ fontSize: 14, color: "#9F8CC2", marginTop: 6 }}>Halal Bi Halal Suro Sentono 2027</p>
          </div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: "#9F8CC2", fontWeight: 500, display: "block", marginBottom: 6 }}>Password Panitia</label>
              <input
                type="password"
                value={pw}
                onChange={e => { setPw(e.target.value); setError(false); }}
                placeholder="Masukkan password..."
                style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: `1px solid ${error ? "#F87171" : "rgba(139,92,246,0.3)"}`, borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box" }}
                autoFocus
              />
              {error && <p style={{ color: "#F87171", fontSize: 12, marginTop: 6 }}>Password salah. Coba lagi.</p>}
            </div>
            <button type="submit" style={{ padding: "13px", background: "linear-gradient(135deg, #6D28D9, #8B5CF6)", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseOver={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseOut={e => (e.currentTarget.style.opacity = "1")}>
              Masuk →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [data] = useState<Pendaftar[]>(MOCK_DATA);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"Semua" | Pendaftar["status"]>("Semua");
  const [sortField, setSortField] = useState<keyof Pendaftar>("no");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [lastUpdated] = useState(new Date().toLocaleString("id-ID"));

  // Check sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("dashboard_auth") === "1") {
      setAuthed(true);
    }
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem("dashboard_auth", "1");
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("dashboard_auth");
    setAuthed(false);
  };

  const toggleSort = useCallback((field: keyof Pendaftar) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  }, [sortField]);

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  // Stats
  const hadir = data.filter(d => d.status === "Hadir");
  const totalOrang = data.reduce((s, d) => s + d.jumlahOrang, 0);
  const totalHadir = hadir.reduce((s, d) => s + d.jumlahOrang, 0);
  const totalDana = data.filter(d => d.kontribusi > 0).reduce((s, d) => s + d.kontribusi, 0);
  const totalPendaftar = data.length;

  // Filter + search + sort
  const filtered = data
    .filter(d => filterStatus === "Semua" || d.status === filterStatus)
    .filter(d =>
      d.nama.toLowerCase().includes(search.toLowerCase()) ||
      d.kota.toLowerCase().includes(search.toLowerCase()) ||
      d.kontak.includes(search)
    )
    .sort((a, b) => {
      const av = a[sortField], bv = b[sortField];
      const cmp = String(av).localeCompare(String(bv), "id", { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });

  const SortIcon = ({ field }: { field: keyof Pendaftar }) => (
    <span style={{ marginLeft: 4, opacity: sortField === field ? 1 : 0.3, fontSize: 11 }}>
      {sortField === field ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0F0A1A", fontFamily: "var(--font-inter, sans-serif)", color: "#fff" }}>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .dash-anim { animation: fadeInUp 0.4s ease forwards; }
        .th-btn:hover { background: rgba(139,92,246,0.12) !important; }
        .tr-row:hover td { background: rgba(139,92,246,0.06) !important; }
        input::placeholder { color: #9F8CC2; }
        @media(max-width:640px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .table-wrap { font-size: 12px !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #1E1538, #2D1B5E)", borderBottom: "1px solid rgba(139,92,246,0.2)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, fontFamily: "var(--font-outfit, sans-serif)", background: "linear-gradient(90deg, #C4B5FD, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            📋 Dashboard Panitia
          </h1>
          <p style={{ margin: 0, fontSize: 12, color: "#9F8CC2", marginTop: 2 }}>Halal Bi Halal Suro Sentono 2027 · Update: {lastUpdated}</p>
        </div>
        <button onClick={handleLogout} style={{ padding: "8px 18px", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 8, color: "#F87171", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Keluar
        </button>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>

        {/* Stats Grid */}
        <div className="stats-grid dash-anim" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          <StatCard icon="👥" label="Total Pendaftar" value={`${totalPendaftar}`} sub={`${totalOrang} orang keseluruhan`} color="#C4B5FD" />
          <StatCard icon="✅" label="Konfirmasi Hadir" value={`${hadir.length}`} sub={`${totalHadir} orang hadir`} color="#34D399" />
          <StatCard icon="💰" label="Estimasi Dana" value={formatRupiah(totalDana)} sub="Dari yang konfirmasi" color="#FBD024" />
          <StatCard icon="📊" label="Rata-rata/KK" value={`${(totalOrang / totalPendaftar || 0).toFixed(1)}`} sub="orang per keluarga" color="#60A5FA" />
        </div>

        {/* Progress Bar */}
        <div className="dash-anim" style={{ background: "linear-gradient(135deg, #1E1538, #2D1B5E)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 16, padding: "20px 24px", marginBottom: 28, animationDelay: "0.1s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#E2D9F3" }}>📈 Progress Konfirmasi</span>
            <span style={{ fontSize: 13, color: "#9F8CC2" }}>{hadir.length} dari {totalPendaftar} pendaftar ({Math.round(hadir.length / totalPendaftar * 100)}%)</span>
          </div>
          <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${hadir.length / totalPendaftar * 100}%`, background: "linear-gradient(90deg, #6D28D9, #34D399)", borderRadius: 999, transition: "width 1s ease" }} />
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 14, flexWrap: "wrap" }}>
            {(["Hadir", "Tidak Hadir", "Pending"] as const).map(s => {
              const count = data.filter(d => d.status === s).length;
              const colors = { Hadir: "#34D399", "Tidak Hadir": "#F87171", Pending: "#FBD024" };
              return (
                <span key={s} style={{ fontSize: 13, color: "#9F8CC2" }}>
                  <span style={{ color: colors[s], fontWeight: 700 }}>● </span>{s}: <strong style={{ color: "#fff" }}>{count}</strong>
                </span>
              );
            })}
          </div>
        </div>

        {/* Filter + Search */}
        <div className="dash-anim" style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", animationDelay: "0.15s" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍  Cari nama, kota, atau nomor..."
            style={{ flex: 1, minWidth: 200, padding: "10px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 10, color: "#fff", fontSize: 14, outline: "none" }}
          />
          {(["Semua", "Hadir", "Tidak Hadir", "Pending"] as const).map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1px solid", transition: "all 0.2s",
                background: filterStatus === s ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.04)",
                borderColor: filterStatus === s ? "#8B5CF6" : "rgba(139,92,246,0.2)",
                color: filterStatus === s ? "#C4B5FD" : "#9F8CC2" }}>
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="dash-anim table-wrap" style={{ background: "linear-gradient(135deg, #1E1538, #2D1B5E)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 16, overflow: "hidden", animationDelay: "0.2s", fontSize: 14 }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(109,40,217,0.2)", borderBottom: "1px solid rgba(139,92,246,0.3)" }}>
                  {([
                    { key: "no", label: "No" },
                    { key: "timestamp", label: "Waktu Daftar" },
                    { key: "nama", label: "Nama" },
                    { key: "kontak", label: "Kontak", mobile: false },
                    { key: "jumlahOrang", label: "Jml Orang" },
                    { key: "kota", label: "Kota", mobile: false },
                    { key: "status", label: "Status" },
                    { key: "kontribusi", label: "Kontribusi", mobile: false },
                  ] as { key: keyof Pendaftar; label: string; mobile?: boolean }[]).map(col => (
                    <th key={col.key}
                      className={`th-btn${col.mobile === false ? " hide-mobile" : ""}`}
                      onClick={() => toggleSort(col.key)}
                      style={{ padding: "14px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#9F8CC2", textTransform: "uppercase", letterSpacing: "0.06em", cursor: "pointer", background: "transparent", whiteSpace: "nowrap" }}>
                      {col.label}<SortIcon field={col.key} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: "center", padding: 40, color: "#9F8CC2" }}>Tidak ada data yang cocok.</td></tr>
                ) : filtered.map((row, i) => (
                  <tr key={row.no} className="tr-row" style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(139,92,246,0.1)" : "none" }}>
                    <td style={{ padding: "13px 16px", color: "#9F8CC2", fontWeight: 600 }}>{row.no}</td>
                    <td style={{ padding: "13px 16px", color: "#9F8CC2", fontSize: 12, whiteSpace: "nowrap" }}>{row.timestamp}</td>
                    <td style={{ padding: "13px 16px", color: "#E2D9F3", fontWeight: 600 }}>{row.nama}</td>
                    <td className="hide-mobile" style={{ padding: "13px 16px", color: "#9F8CC2" }}>{row.kontak}</td>
                    <td style={{ padding: "13px 16px", textAlign: "center", fontWeight: 700, color: "#C4B5FD" }}>{row.jumlahOrang}</td>
                    <td className="hide-mobile" style={{ padding: "13px 16px", color: "#9F8CC2" }}>{row.kota}</td>
                    <td style={{ padding: "13px 16px" }}><Badge status={row.status} /></td>
                    <td className="hide-mobile" style={{ padding: "13px 16px", color: row.kontribusi > 0 ? "#34D399" : "#9F8CC2", fontWeight: row.kontribusi > 0 ? 700 : 400 }}>
                      {row.kontribusi > 0 ? formatRupiah(row.kontribusi) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(139,92,246,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 13, color: "#9F8CC2" }}>Menampilkan {filtered.length} dari {data.length} pendaftar</span>
            <span style={{ fontSize: 13, color: "#9F8CC2" }}>Total: <strong style={{ color: "#FBD024" }}>{formatRupiah(filtered.reduce((s, d) => s + d.kontribusi, 0))}</strong></span>
          </div>
        </div>
      </main>
    </div>
  );
}
