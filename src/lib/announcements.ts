export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  link?: string;
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = '';
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

    if (char === ',' && !inQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function parseCsv(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) {
    return { headers: [], rows: [] };
  }

  const headerLine = lines[0];
  const headers = parseCsvLine(headerLine).map((header) => header.trim());
  const rows = lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = (cells[index] ?? '').trim();
    });
    return record;
  });

  return { headers, rows };
}

function getField(row: Record<string, string>, fieldNames: string[]): string {
  for (const [key, value] of Object.entries(row)) {
    const normalized = key.trim().toLowerCase();
    if (fieldNames.includes(normalized)) {
      return value?.trim?.() ?? '';
    }
  }
  return '';
}

function parseDateValue(dateValue: string): number {
  if (!dateValue) return 0;
  const parsed = Date.parse(dateValue);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatAnnouncementDate(dateValue: string): string {
  if (!dateValue) return 'No date';
  const parsed = Date.parse(dateValue);
  if (Number.isNaN(parsed)) return dateValue;
  return new Date(parsed).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  const announcementsCsvUrl =
    process.env.NEXT_PUBLIC_AUS_ANNOUNCEMENTS_CSV_URL ??
    process.env.VITE_AUS_ANNOUNCEMENTS_CSV_URL;

  if (!announcementsCsvUrl) {
    return [];
  }

  const response = await fetch(announcementsCsvUrl, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to fetch announcements CSV: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();
  const { rows } = parseCsv(text);
  const now = Date.now();

  const announcements = rows
    .map((row, index) => {
      const title = getField(row, [
        'title',
        'announcement title',
        'headline',
        'subject',
      ]);
      const body = getField(row, [
        'description under 100 words',
        'announcement',
        'message',
        'description',
        'details',
        'content',
      ]);
      const timestampRaw = getField(row, ['timestamp', 'created at', 'date']);
      const startDisplayRaw = getField(row, [
        'when should this start displaying?',
        'start date',
        'publish date',
      ]);
      const dateRaw = startDisplayRaw || timestampRaw;
      const link = getField(row, [
        'link you want associated',
        'link',
        'url',
        'announcement link',
      ]);
      const status = getField(row, ['status', 'published', 'publish']);

      // Allow drafts in the sheet while only exposing published rows.
      if (status) {
        const normalizedStatus = status.toLowerCase();
        if (
          normalizedStatus.includes('draft') ||
          normalizedStatus === 'false' ||
          normalizedStatus === 'no'
        ) {
          return null;
        }
      }

      if (!title || !body) {
        return null;
      }

      const startDisplayTimestamp = parseDateValue(startDisplayRaw || timestampRaw);
      if (startDisplayTimestamp && startDisplayTimestamp > now) {
        return null;
      }

      const normalized: Announcement & { _timestamp: number } = {
        id: `${index}-${title}`.toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
        title,
        body,
        date: formatAnnouncementDate(dateRaw),
        _timestamp: startDisplayTimestamp || parseDateValue(timestampRaw || dateRaw),
      };
      if (link) {
        normalized.link = link;
      }
      return normalized;
    })
    .filter((item): item is Announcement & { _timestamp: number } => item !== null)
    .sort((a, b) => b._timestamp - a._timestamp)
    .map(({ _timestamp, ...announcement }) => announcement);

  return announcements;
}
