export interface AusExecutive {
  position: string;
  name: string;
  email: string;
  officeHours: string;
  photoUrl?: string;
}

function parseDelimitedLine(line: string, delimiter: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === delimiter && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function parseTable(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return [];

  // The published CSV includes a directory section before the actual table.
  // Find the first row that looks like the AUS Executive Council header.
  const headerIndex = lines.findIndex((line) => {
    const lower = line.toLowerCase();
    return lower.includes("position") && lower.includes("name") && lower.includes("email");
  });

  if (headerIndex === -1 || headerIndex === lines.length - 1) {
    return [];
  }

  const headerLine = lines[headerIndex];
  const dataLines = lines.slice(headerIndex + 1);

  // Detect delimiter: TSV from the provided URL, but fall back to CSV.
  const delimiter = headerLine.includes("\t") ? "\t" : ",";
  const headers = parseDelimitedLine(headerLine, delimiter);

  return dataLines.map((line) => {
    const cells = parseDelimitedLine(line, delimiter);
    const record: Record<string, string> = {};
    headers.forEach((h, i) => {
      record[h] = (cells[i] ?? "").trim();
    });
    return record;
  });
}

function mapExecutives(rows: Record<string, string>[]): AusExecutive[] {
  return rows
    .map((row) => {
      const position =
        row["Position | Poste"] ?? row["Position"] ?? row["Role"] ?? "";
      const name = row["Name | Nom"] ?? row["Name"] ?? "";
      const email =
        row["AUS Email | Courriel AÉFA"] ??
        row["AUS Email | Courriel AEFA"] ??
        row["AUS Email"] ??
        row["Email"] ??
        "";
      const officeHours =
        row["Office Hours | Heures de Bureau"] ??
        row["Office Hours"] ??
        "";
      const photoUrl =
        row["Photo URL"] ??
        row["Headshot URL"] ??
        row["Image URL"] ??
        row["Photo"] ??
        "";

      return {
        position,
        name,
        email,
        officeHours,
        photoUrl: photoUrl || undefined,
      };
    })
    .filter((exec) => exec.position && exec.name);
}

async function fetchFromUrl(url: string): Promise<AusExecutive[]> {
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch AUS executives CSV: ${res.status} ${res.statusText}`
    );
  }

  const text = await res.text();
  return mapExecutives(parseTable(text));
}

export async function fetchAusExecutives(): Promise<AusExecutive[]> {
  const defaultUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3-7MBB3-LziWVdqxPMd5S-FrVDakPBAg1YfZMzLJxYz5toXAqzvBCm_E9_lpxRpqMUbMFWf3gjerG/pub?gid=0&single=true&output=csv";

  const configuredUrl =
    process.env.NEXT_PUBLIC_AUS_EXEC_CSV_URL ??
    process.env.VITE_AUS_EXEC_CSV_URL ??
    defaultUrl;

  if (!configuredUrl) {
    console.warn("NEXT_PUBLIC_AUS_EXEC_CSV_URL is not set");
    return [];
  }

  const urlsToTry = Array.from(new Set([configuredUrl, defaultUrl]));
  let lastError: Error | null = null;

  for (const url of urlsToTry) {
    try {
      const executives = await fetchFromUrl(url);
      if (executives.length > 0) {
        return executives;
      }
    } catch (error) {
      lastError = error as Error;
    }
  }

  if (lastError) {
    throw lastError;
  }

  return [];
}

