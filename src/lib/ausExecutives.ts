export interface AusExecutive {
  position: string;
  name: string;
  email: string;
  officeHours: string;
}

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return [];

  const [headerLine, ...dataLines] = lines;
  const headers = headerLine.split(",").map((h) => h.trim());

  return dataLines.map((line) => {
    const cells = line.split(",");
    const record: Record<string, string> = {};
    headers.forEach((h, i) => {
      record[h] = (cells[i] ?? "").trim();
    });
    return record;
  });
}

export async function fetchAusExecutives(): Promise<AusExecutive[]> {
  const url = import.meta.env.VITE_AUS_EXEC_CSV_URL as string | undefined;

  if (!url) {
    console.warn("VITE_AUS_EXEC_CSV_URL is not set");
    return [];
  }

  const res = await fetch(url);

  if (!res.ok) {
    console.error("Failed to fetch AUS executives CSV", res.status, res.statusText);
    return [];
  }

  const text = await res.text();
  const rows = parseCsv(text);

  // Try to map common header variants based on the provided sheet structure
  return rows
    .map((row) => {
      const position =
        row["Position | Poste"] ?? row["Position"] ?? row["Role"] ?? "";
      const name = row["Name | Nom"] ?? row["Name"] ?? "";
      const email =
        row["AUS Email | Courriel AEFA"] ?? row["AUS Email"] ?? row["Email"] ?? "";
      const officeHours =
        row["Office Hours | Heures de Bureau"] ??
        row["Office Hours"] ??
        "";

      return {
        position,
        name,
        email,
        officeHours
      };
    })
    .filter((exec) => exec.position && exec.name);
}

