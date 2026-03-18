import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../src/components/ui/card';

export const dynamic = 'force-dynamic';

interface ResourceRow {
  [key: string]: string;
}

function parseCsv(text: string): { headers: string[]; rows: ResourceRow[] } {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return { headers: [], rows: [] };

  const [headerLine, ...dataLines] = lines;
  const headers = headerLine.split(',').map((h) => h.trim());

  const rows = dataLines.map((line) => {
    const cells = line.split(',');
    const record: ResourceRow = {};
    headers.forEach((h, i) => {
      record[h] = (cells[i] ?? '').trim();
    });
    return record;
  });

  return { headers, rows };
}

async function getResources(): Promise<{ headers: string[]; rows: ResourceRow[] }> {
  const url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTdYqXi8L_HjdpcpOCwG8tUiXIP5VMRQlHr9uU3FEWfm6ST2DODWTlemCQdcnQQF3LvPBibxJPwx23D/pub?output=csv';

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch resources CSV: ${res.status} ${res.statusText}`);
  }

  const text = await res.text();
  return parseCsv(text);
}

export default async function ResourceSubpage({ params }: { params: { tab: string } }) {
  const { tab } = params;
  const { headers, rows } = await getResources();

  // Try to filter by a "Tab" or "Category" column if present; otherwise show all rows.
  const normalizedTab = tab.replace(/-/g, ' ').toLowerCase();
  const categoryKey =
    headers.find((h) => h.toLowerCase() === 'tab') ??
    headers.find((h) => h.toLowerCase() === 'category') ??
    null;

  const filtered = categoryKey
    ? rows.filter((row) => (row[categoryKey] ?? '').toLowerCase() === normalizedTab)
    : rows;

  const displayRows = filtered.length > 0 ? filtered : rows;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resources – {tab.replace(/-/g, ' ')}</CardTitle>
          <CardDescription>
            Loaded live from the AUS Resources spreadsheet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {displayRows.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No resources found for this section yet.
            </p>
          )}
          <div className="space-y-3">
            {displayRows.map((row, idx) => (
              <div
                key={`${row['Name'] ?? row['Title'] ?? idx}-${idx}`}
                className="border rounded-lg px-4 py-3 bg-background"
              >
                <h3 className="font-semibold text-sm">
                  {row['Name'] ?? row['Title'] ?? row['Resource'] ?? 'Resource'}
                </h3>
                {row['Description'] && (
                  <p className="text-xs text-muted-foreground mt-1">{row['Description']}</p>
                )}
                {row['Link'] && (
                  <a
                    href={row['Link']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-xs text-primary underline underline-offset-4"
                  >
                    Open resource
                  </a>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

