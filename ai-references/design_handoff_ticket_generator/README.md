# Handoff: Ticket Generator — "Jejak Warisan: Suro Sentono"

## Overview
A single-page **ticket generator**. A user fills a small form (full name, **family name select**, ticket type, pax count) and a live, print-ready event ticket renders beside it — styled after the printed "Suro Sentono" reunion ticket. The user can issue a ticket number ("Generate") and print / save to PDF.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing the intended look and behavior, **not production code to copy directly**. The task is to **recreate this design in the target codebase's existing environment** (React, Vue, Svelte, etc.) using its established patterns, component library, and conventions. If no environment exists yet, pick the most appropriate framework and implement it there. The HTML prototype uses a small internal runtime (`.dc.html` + `support.js`) — ignore that wrapper; reimplement the UI natively.

- `Ticket Generator.dc.html` — the full prototype (markup + logic). Read it for exact values; the logic class at the bottom holds all computed strings, theming, and the pseudo-QR generation.
- `reference_ticket.jpg` — the original printed-ticket mockup the design is based on.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, layout, and interactions are all intentional. Recreate pixel-for-pixel using the codebase's libraries. Where a real QR / barcode library is available, **prefer a real QR encoder** over the prototype's decorative pseudo-QR (see Assets).

---

## Screens / Views
Single screen, two-column layout on desktop.

### Page shell
- **Background:** `radial-gradient(120% 90% at 85% 0%, #2a1340 0%, #16101f 55%, #0e0a16 100%)` (dark plum).
- **Font:** `Archivo` (body, weights 400–900, plus italic) and `Archivo Black` (display). Google Fonts.
- **Max content width:** `1180px`, centered, `padding: 40px 28px 72px`.
- **Text color:** white; lime `#c6f03c` for accents/labels.

### Top bar
- Flex row, space-between, wraps. Left: a `13×40px` lime block + eyebrow `JEJAK WARISAN` (11px, letter-spacing `.42em`, lime, 700) over `SURO SENTONO` (Archivo Black, 21px). Right: `27–28 MARET 2027` / `BINA KARAKTER HALL` (11px, letter-spacing `.22em`, muted white; hall in lime), right-aligned.

### Heading block
- `BUAT TIKET` / `KAMU SENDIRI.` — Archivo Black, `clamp(38px,6vw,72px)`, line-height `.92`, uppercase; 2nd line lime. Sub-paragraph below, max-width 480px, 15px, `rgba(255,255,255,.6)`.

### Layout grid
- `grid-template-columns: 380px minmax(0,1fr)`, `gap: 30px`, `align-items: start`. **The `minmax(0,1fr)` on the right column is required** so the ticket shrinks instead of forcing horizontal scroll. Collapse to a single column under ~760px.

### Form card (left, 380px)
- Card: `background: rgba(255,255,255,.04)`, `border: 1px solid rgba(255,255,255,.1)`, `border-radius: 4px`, `padding: 26px 24px`.
- Section title `DATA TIKET` with a `9×22px` lime block, Archivo Black 15px, letter-spacing `.16em`.
- **Field labels** (all): 11px, letter-spacing `.18em`, 700, uppercase, color `#c6f03c`, `margin-bottom: 8px`.
- **Inputs/selects** share: `background:#241733`, `border:1px solid rgba(255,255,255,.14)`, `border-radius:3px`, white text, Archivo 15px/600, `padding:13px 14px`, `outline:none`; **focus** → `border-color:#c6f03c`.

Fields, in order:
1. **Nama Lengkap** — text input, placeholder `Tulis nama tamu`. Clears the "issued" state on change.
2. **Nama Keluarga** — `<select>` (this is the core requested component). `appearance:none` with a custom lime `▼` chevron absolutely positioned right (14px, pointer-events:none); right padding `40px`. Options rendered as `Keluarga {name}`. **Option values:** `Prakoso, Wibowo, Hadiningrat, Sastrowardoyo, Notonegoro, Kusumo, Atmodjo`. Default `Prakoso`. `<option>` styled `background:#241733; color:#fff`.
3. **Jenis Tiket** — two segmented buttons in a `1fr 1fr` grid, gap 8px. Each: uppercase, Archivo 800/13px, `border-radius:3px`, `padding:12px 10px`, left-aligned, with a small `100K / pax` / `200K / pax` subline (11px, opacity .7). **Active** button: `background:#c6f03c; color:#16101f; border:1px solid #c6f03c`. **Inactive:** `background:#241733; color:#fff; border:1px solid rgba(255,255,255,.14)`. Options: `Hanya Makan` (value `makan`) and `Kamar & Makan` (value `kamar`).
4. **Jumlah Pax** — stepper: `−` button, value display, `+` button. Buttons `46×46px`, `background:#241733`, lime glyph 22px/700. Value box flex:1, centered, Archivo Black 20px. Clamp pax to `1…99`.
5. **Total** row — top border `1px solid rgba(255,255,255,.1)`, label `TOTAL` (11px/.18em, muted) + value (Archivo Black 28px, lime). Total = `pricePerPax × pax`, formatted `Rp 1.234.567` via `toLocaleString('id-ID')`.
6. **Generate Tiket** button — full width, `background:#c6f03c`, color `#16101f`, Archivo Black 14px, letter-spacing `.14em`, uppercase, `padding:16px`, `border-radius:3px`; **hover** `#d6ff52`. Sets `issued=true` and reveals the real ticket number.
7. **Cetak / Simpan PDF** button — full width, transparent, `border:1px solid rgba(255,255,255,.2)`, white, 700/13px uppercase; **hover** `border-color:#c6f03c; color:#c6f03c`. Calls `window.print()`.

### Ticket preview (right)
Sticky (`top:24px`). Eyebrow `PRATINJAU TIKET` (+ `· TERBIT` once issued). Then the ticket, then a footer row: `No. Tiket: <number>` (lime) and a code label.

**Ticket container** (`#ticketPrintArea`): `aspect-ratio: 3.35 / 1`, `border-radius:5px`, `overflow:hidden`, `box-shadow:0 30px 70px -20px rgba(0,0,0,.7)`, `display:flex`. **No `min-height`** (it would re-introduce horizontal overflow). Background = current theme body color.

- **Stub (left, width 23%)** — `border-right: 3px dashed <bodyBg>` (perforation). Vertical stack: a barcode strip (top), a 13×13 QR grid (bottom), and a rotated vertical title (`writing-mode: vertical-rl; transform: rotate(180deg)`, Archivo Black `clamp(15px,2.4vw,30px)`, uppercase) reading `TIKET HANYA MAKAN` or `TIKET KAMAR & MAKAN`.
  - **Barcode:** width 62%, height 20%, painted with `repeating-linear-gradient(90deg, <fg> 0 2px, transparent 2px 3px, <fg> 3px 7px, transparent 7px 9px, <fg> 9px 11px, transparent 11px 14px)`.
  - **QR:** 52% wide square, `display:grid; grid-template-columns:repeat(13,1fr); grid-template-rows:repeat(13,1fr)`; each cell filled `<fg>` or transparent.
- **Body (right, flex:1)** — relative, `overflow:hidden`, padding `5.5% 5%`. Layers:
  - **Contour bg:** `repeating-radial-gradient(ellipse 130% 90% at 22% 55%, transparent 0 13px, <contour> 13px 15px)`, opacity .5.
  - **Diagonal accent block:** absolute fill, `clip-path: polygon(72% 0, 100% 0, 100% 100%, 88% 100%)`, background = theme `diag` color, with a second contour gradient over it.
  - Content: left-bar header (`border-left:3px solid <fg>`) — italic `JEJAK WARISAN`, Archivo Black `SURO SENTONO` (`clamp(22px,4.3vw,52px)`), `27–28 MARET 2027`. Then `BINA KARAKTER / HALL`. Then a bottom row: left = `ATAS NAMA :` + holder name (uppercase) + `KELUARGA <X> · <n> PAX` + description line; right = `PRICE` + big `100K/PAX`|`200K/PAX`. Bottom-right italic `organized by the prakoso.`

---

## Interactions & Behavior
- **Everything is live**: typing the name, changing family, switching type, or stepping pax updates the ticket instantly.
- **Any edit resets `issued` to false** → ticket number masks to `—— —— ——` and the code label reverts to "Belum digenerate", so a stale number is never shown.
- **Generate Tiket** sets `issued=true`, increments an internal serial, and reveals a deterministic ticket number.
- **Print:** `window.print()`. Print CSS hides everything except `#ticketPrintArea` (visibility-based isolation), `@page { size: landscape; margin:0 }`, and the ticket is fixed/centered.
- **Theme swap** is the key visual behavior — see below.
- **Responsive:** single column under ~760px; ticket scales by `aspect-ratio` + `clamp()` type. No fixed heights on the ticket.

## State Management
State variables: `nama` (string), `keluarga` (string, default `Prakoso`), `jenis` (`'makan' | 'kamar'`, default `makan`), `pax` (int 1–99, default 1), `issued` (bool), `serial` (int).
Triggers: input/select change → set field **and** `issued=false`; stepper → clamp pax + `issued=false`; Generate → `issued=true`, `serial++`.

### Theme (driven by `jenis`)
| | `makan` (Hanya Makan) | `kamar` (Kamar & Makan) |
|---|---|---|
| stub background | `#c6f03c` (lime) | `#9d1ae0` (purple) |
| stub foreground (text/QR/barcode) | `#9d1ae0` | `#c6f03c` |
| body background | `#9d1ae0` | `#c6f03c` |
| body foreground | `#c6f03c` | `#9d1ae0` |
| diagonal accent | `#9d1ae0` | `#c6f03c` |
| price | `100K/PAX` (Rp 100.000) | `200K/PAX` (Rp 200.000) |
| stub title | `TIKET HANYA MAKAN` | `TIKET KAMAR & MAKAN` |
| description | `Berlaku 1 orang, sudah termasuk 3 kali makan.` | `Berlaku 1 orang, sudah termasuk kamar 1 kasur & 3 kali makan.` |

The two states correspond exactly to the two tickets in `reference_ticket.jpg` (lime-stub vs purple-stub).

### Derived/computed values
- `namaLabel` = name uppercased, or `NAMA TAMU` when empty.
- `keluargaLabel` = `KELUARGA <X uppercased>`.
- `ticketNo` (when issued) = `SS27-<M|K>-<5 digits>`, digits from `hash(seed) % 90000 + 10000`.
- `seed` = `"<name|TAMU>|<keluarga>|<jenis>"` — drives both ticket number and QR pattern (deterministic, stable per input).

## Design Tokens
**Colors**
- Lime accent: `#c6f03c` (hover/brighter: `#d6ff52`)
- Purple: `#9d1ae0`
- Page plum stops: `#2a1340`, `#16101f`, `#0e0a16`
- Input fill: `#241733`
- Borders: `rgba(255,255,255,.10)` / `.14` / `.20`
- Muted text: `rgba(255,255,255,.35 / .40 / .45 / .55 / .60)`

**Typography:** `Archivo` (400/500/600/700/800/900 + italic 500/700/900) and `Archivo Black`. Display uses Archivo Black, uppercase, negative tracking on big sizes (`-.01em`); labels use wide tracking (`.16em`–`.42em`).

**Radius:** cards `4px`, inputs/buttons `3px`, ticket `5px`.
**Shadow:** ticket `0 30px 70px -20px rgba(0,0,0,.7)`.
**Spacing:** card padding `26px 24px`; field rhythm ~`20px`; page gutters `40px 28px`.

## Assets
- **No image assets required.** The reference photos (buffet / hotel room) on the printed ticket are replaced by the diagonal accent + contour pattern in the generator. If you want photos in the diagonal panel, add an image fill clipped to the same `clip-path` polygon.
- **Barcode & QR are decorative** in the prototype (CSS gradient + a deterministic pseudo-random 13×13 grid with three 7×7 finder squares). For production, swap in a real barcode/QR library encoding the ticket number or a check-in URL; keep the same colors and the stub layout.
- Fonts via Google Fonts (`Archivo`, `Archivo Black`).

## Files
- `Ticket Generator.dc.html` — full prototype; logic class (bottom) is the source of truth for theming, computed strings, formatting, and QR/serial generation.
- `reference_ticket.jpg` — original printed-ticket reference.
