export interface PastExecutiveRow {
  position: string;
  name: string;
}

export interface PastExecutiveYear {
  year: string; // e.g. "2025-2026"
  executives: PastExecutiveRow[];
}

const FALLBACK_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3-7MBB3-LziWVdqxPMd5S-FrVDakPBAg1YfZMzLJxYz5toXAqzvBCm_E9_lpxRpqMUbMFWf3gjerG/pub?gid=102539587&single=true&output=csv';

function parseLine(line: string): string[] {
  // The sheet output is simple enough that split(",") is sufficient for now.
  // If the sheet later introduces quoted commas, swap this for a real CSV parser.
  return line.split(',').map((c) => c.trim());
}

function getNonEmptyCells(cells: string[]): string[] {
  return cells.filter((c) => c.length > 0);
}

function isYearCell(value: string): boolean {
  return /^\d{4}\s*-\s*\d{4}$/.test(value);
}

function normalizeYear(value: string): string {
  return value.replace(/\s+/g, '').replace('-', '-');
}

export function parsePastExecutivesCsv(text: string): PastExecutiveYear[] {
  const lines = text.split(/\r?\n/).map((l) => l.trimEnd());
  const years: PastExecutiveYear[] = [];

  let currentYear: PastExecutiveYear | null = null;
  let expectingHeader = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const cells = parseLine(line);
    const nonEmpty = getNonEmptyCells(cells);

    // Year marker rows look like: ",2025-2026," (only one meaningful cell)
    if (nonEmpty.length === 1 && isYearCell(nonEmpty[0])) {
      const year = normalizeYear(nonEmpty[0]);

      // Flush any previous year
      if (currentYear && currentYear.executives.length) {
        years.push(currentYear);
      } else if (currentYear && !currentYear.executives.length) {
        years.push(currentYear);
      }

      currentYear = { year, executives: [] };
      expectingHeader = true;
      continue;
    }

    if (!currentYear) {
      continue;
    }

    // After a year marker, the sheet includes a header row like "Position | Poste,Name | Nom"
    if (expectingHeader) {
      const lower = nonEmpty.join(' ').toLowerCase();
      if (lower.includes('position') && lower.includes('name')) {
        expectingHeader = false;
        continue;
      }
      // Some years might be missing/odd; if not a header, just proceed and treat as data.
      expectingHeader = false;
    }

    // Data rows: first two cells are position + name (with potential leading empties)
    const position = cells.find((c) => c.length > 0) ?? '';
    const name = (() => {
      // find second non-empty cell (position is first)
      const firstIdx = cells.findIndex((c) => c.length > 0);
      if (firstIdx === -1) return '';
      for (let i = firstIdx + 1; i < cells.length; i++) {
        if (cells[i] && cells[i].trim().length > 0) return cells[i].trim();
      }
      return '';
    })();

    if (position && name) {
      currentYear.executives.push({ position, name });
    }
  }

  if (currentYear) {
    years.push(currentYear);
  }

  // Filter out empty years and ensure newest-first (sheet appears newest-first already)
  return years.filter((y) => y.year && y.executives.length > 0);
}

export async function fetchPastExecutives(): Promise<PastExecutiveYear[]> {
  const url =
    process.env.NEXT_PUBLIC_AUS_PAST_EXECS_CSV_URL ??
    process.env.VITE_AUS_PAST_EXECS_CSV_URL ??
    FALLBACK_URL;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch past executives CSV: ${res.status} ${res.statusText}`);
  }

  const text = await res.text();
  return parsePastExecutivesCsv(text);
}

