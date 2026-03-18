import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../src/components/ui/card';
import { Button } from '../../../src/components/ui/button';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface ListservRow {
  name: string;
  submissionMethod?: string;
  submissionDeadline?: string;
  frequency?: string;
  links: string[];
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

function parseCsv(text: string): string[][] {
  return text
    .split(/\r?\n/)
    .map((line) => parseCsvLine(line))
    .filter((row) => row.some((cell) => cell.trim().length > 0));
}

function extractUrls(value: string): string[] {
  if (!value) return [];
  const urls = new Set<string>();
  const plainUrlMatches = value.match(/https?:\/\/[^\s,"]+/g) ?? [];
  plainUrlMatches.forEach((url) => urls.add(url));

  const hyperlinkFormulaRegex = /HYPERLINK\("([^"]+)"/gi;
  let match: RegExpExecArray | null = hyperlinkFormulaRegex.exec(value);
  while (match) {
    if (match[1]) urls.add(match[1]);
    match = hyperlinkFormulaRegex.exec(value);
  }

  return Array.from(urls);
}

async function getListservRows(): Promise<ListservRow[]> {
  const url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3-7MBB3-LziWVdqxPMd5S-FrVDakPBAg1YfZMzLJxYz5toXAqzvBCm_E9_lpxRpqMUbMFWf3gjerG/pub?gid=1116480262&single=true&output=csv';

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch departmental listserv CSV: ${res.status} ${res.statusText}`);
  }

  const text = await res.text();
  const rows = parseCsv(text);

  const headerIndex = rows.findIndex((row) =>
    row.some((cell) => cell.toLowerCase().includes('departmental association'))
  );

  if (headerIndex === -1) return [];

  const dataRows = rows.slice(headerIndex + 1);
  return dataRows
    .map((row) => {
      const name = (row[1] ?? row[2] ?? '').trim();
      if (!name || name.toLowerCase().includes('faculty-wide listservs')) return null;

      const submissionMethod = (row[3] ?? '').trim();
      const submissionDeadline = (row[4] ?? '').trim();
      const frequency = (row[5] ?? '').trim();
      const links = row.flatMap((cell) => extractUrls(cell));

      return {
        name,
        submissionMethod: submissionMethod || undefined,
        submissionDeadline: submissionDeadline || undefined,
        frequency: frequency || undefined,
        links,
      } satisfies ListservRow;
    })
    .filter((row): row is ListservRow => Boolean(row));
}

export default async function DepartmentalListservPage() {
  const associations = await getListservRows();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Departmental Associations Listservs</CardTitle>
          <CardDescription>
            Loaded live from the departmental listserv Google Sheet. Add logo file names later and replace each placeholder with uploaded logos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/departmental-associations">Directory</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/departmental-associations/publications">Publications</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {associations.map((assoc) => (
              <Card key={assoc.name}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-14 h-14 rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 text-center px-1">
                      Logo
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-base">{assoc.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {assoc.submissionMethod || 'Submission method not listed'}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="space-y-1 text-xs text-muted-foreground">
                    {assoc.submissionDeadline && <p><span className="font-medium">Deadline: </span>{assoc.submissionDeadline}</p>}
                    {assoc.frequency && <p><span className="font-medium">Frequency: </span>{assoc.frequency}</p>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {assoc.links.map((link, idx) => (
                      <Button asChild size="sm" key={`${assoc.name}-link-${idx}`}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          Open link {idx + 1}
                        </a>
                      </Button>
                    ))}
                    {assoc.links.length === 0 && (
                      <Button size="sm" variant="outline" disabled>
                        Link not published yet
                      </Button>
                    )}
                    <Button size="sm" variant="outline" disabled>
                      Upload logo later
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

