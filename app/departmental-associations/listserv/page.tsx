import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../src/components/ui/card';
import { Button } from '../../../src/components/ui/button';

export const dynamic = 'force-dynamic';

interface ListservRow {
  name: string;
  description?: string;
  listservUrl?: string;
  websiteUrl?: string;
  logoUrl?: string;
}

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  const [headerLine, ...dataLines] = lines;
  const headers = headerLine.split(',').map((h) => h.trim());

  return dataLines.map((line) => {
    const cells = line.split(',');
    const record: Record<string, string> = {};
    headers.forEach((h, i) => {
      record[h] = (cells[i] ?? '').trim();
    });
    return record;
  });
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

  return rows.map((row) => {
    const name =
      row['Association'] ??
      row['Department'] ??
      row['Name'] ??
      '';

    const description =
      row['Description'] ??
      row['Notes'] ??
      row['Note'] ??
      '';

    const listservUrl =
      row['Listserv URL'] ??
      row['Listserv Link'] ??
      row['Signup URL'] ??
      row['Signup Link'] ??
      '';

    const websiteUrl =
      row['Website'] ??
      row['Website URL'] ??
      row['Instagram'] ??
      '';

    const logoUrl =
      row['Logo URL'] ??
      row['Logo'] ??
      '';

    return {
      name,
      description: description || undefined,
      listservUrl: listservUrl || undefined,
      websiteUrl: websiteUrl || undefined,
      logoUrl: logoUrl || undefined,
    };
  }).filter((row) => row.name);
}

export default async function DepartmentalListservPage() {
  const associations = await getListservRows();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Departmental Associations Listservs</CardTitle>
          <CardDescription>
            Subscribe to departmental listservs and stay up to date with news, events, and opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {associations.map((assoc) => (
              <Card key={assoc.name}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                    {assoc.logoUrl ? (
                      <img
                        src={assoc.logoUrl}
                        alt={`${assoc.name} logo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {assoc.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">{assoc.name}</CardTitle>
                    {assoc.description && (
                      <CardDescription className="text-xs mt-1">
                        {assoc.description}
                      </CardDescription>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 pt-0">
                  {assoc.listservUrl && (
                    <Button asChild size="sm">
                      <a href={assoc.listservUrl} target="_blank" rel="noopener noreferrer">
                        Join listserv
                      </a>
                    </Button>
                  )}
                  {assoc.websiteUrl && (
                    <Button asChild size="sm" variant="outline">
                      <a href={assoc.websiteUrl} target="_blank" rel="noopener noreferrer">
                        Learn more
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

