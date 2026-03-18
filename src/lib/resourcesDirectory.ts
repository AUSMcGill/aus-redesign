export interface ResourcesDirectory {
  headers: string[];
  rows: Record<string, string>[];
}

function parseCsv(text: string): ResourcesDirectory {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  // Find the first line that looks like a header row with multiple comma-separated columns.
  const headerIndex = lines.findIndex((line) => {
    const parts = line.split(',');
    return parts.length > 1 && parts.some((p) => p.trim().length > 0);
  });

  if (headerIndex === -1 || headerIndex === lines.length - 1) {
    return { headers: [], rows: [] };
  }

  const headerLine = lines[headerIndex];
  const dataLines = lines.slice(headerIndex + 1);

  const headers = headerLine.split(',').map((h) => h.trim());

  const rows = dataLines.map((line) => {
    const cells = line.split(',');
    const record: Record<string, string> = {};
    headers.forEach((h, i) => {
      record[h] = (cells[i] ?? '').trim();
    });
    return record;
  });

  return { headers, rows };
}

export async function fetchResourcesDirectory(): Promise<ResourcesDirectory> {
  const url = import.meta.env.VITE_AUS_RESOURCES_CSV_URL as string | undefined;

  if (!url) {
    console.warn('VITE_AUS_RESOURCES_CSV_URL is not set');
    return { headers: [], rows: [] };
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch AUS resources CSV: ${res.status} ${res.statusText}`
    );
  }

  const text = await res.text();
  return parseCsv(text);
}

