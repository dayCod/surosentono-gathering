// scripts/generate-ticket-data.ts
import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";

const DATASHEETS_DIR = path.join(process.cwd(), "datasheets");
const OUTPUT_FILE = path.join(process.cwd(), "data", "ticket-families.ts");

// 1. Cari file xlsx terbaru di folder datasheets/ (sort descending by name)
const files = fs
  .readdirSync(DATASHEETS_DIR)
  .filter((f) => f.endsWith(".xlsx"))
  .sort()
  .reverse();

if (files.length === 0) {
  console.error("No xlsx files found in datasheets/");
  process.exit(1);
}

const latestFile = path.join(DATASHEETS_DIR, files[0]);
console.log(`Reading: ${latestFile}`);

// 2. Parse xlsx
const wb = XLSX.readFile(latestFile);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows: unknown[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

if (rows.length === 0) {
  console.error("Empty spreadsheet!");
  process.exit(1);
}

// 3. Cari index kolom "Nama Keluarga"
const headers = (rows[0] as unknown[]).map((h) =>
  String(h ?? "")
    .trim()
    .toLowerCase()
);
const familyColIdx = headers.findIndex((h) => h.includes("nama keluarga"));

if (familyColIdx === -1) {
  console.error("Column 'Nama Keluarga' not found! Headers found:", headers);
  process.exit(1);
}

// 4. Extract & clean family names
const familyNames = (rows as unknown[][])
  .slice(1)
  .map((row) => row[familyColIdx])
  .filter(Boolean)
  .map((name) => {
    const cleaned = String(name).trim();
    // Bersihkan prefix "KELUARGA " jika ada
    return cleaned.replace(/^KELUARGA\s+/i, "");
  });

const uniqueFamilies = [...new Set(familyNames)].sort();

// 5. Write output file
const output = `// AUTO-GENERATED — DO NOT EDIT MANUALLY
// Generated from: ${files[0]}
// Run: npm run generate-ticket-data

export const ticketFamilies: string[] = ${JSON.stringify(uniqueFamilies, null, 2)};
`;

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, output, "utf-8");
console.log(
  `Generated ${OUTPUT_FILE} with ${uniqueFamilies.length} families.`
);
