import { ResourcesPage } from '../src/components/pages/ResourcesPage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../src/components/ui/card';

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

async function getResourcesByTab() {
  const url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTdYqXi8L_HjdpcpOCwG8tUiXIP5VMRQlHr9uU3FEWfm6ST2DODWTlemCQdcnQQF3LvPBibxJPwx23D/pub?output=csv';

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    console.error('Failed to fetch resources CSV', res.status, res.statusText);
    return {};
  }

  const text = await res.text();
  const { headers, rows } = parseCsv(text);

  const tabKey =
    headers.find((h) => h.toLowerCase() === 'tab') ??
    headers.find((h) => h.toLowerCase() === 'category') ??
    null;

  const grouped: Record<string, ResourceRow[]> = {};

  rows.forEach((row) => {
    const tabNameRaw = tabKey ? row[tabKey] : '';
    const tabName = (tabNameRaw || 'Other').trim() || 'Other';
    if (!grouped[tabName]) {
      grouped[tabName] = [];
    }
    grouped[tabName].push(row);
  });

  return grouped;
}

export const dynamic = 'force-dynamic';

export default async function Page() {
  const grouped = await getResourcesByTab();
  const tabNames = Object.keys(grouped);

  return (
    <div className="space-y-8">
      <ResourcesPage />

      {tabNames.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Resource Directory</h2>
          <p className="text-sm text-muted-foreground">
            These sections are loaded live from the AUS Resources spreadsheet. Each section
            corresponds to a spreadsheet subtab or category.
          </p>

          <div className="space-y-6">
            {tabNames.map((tab) => (
              <Card key={tab}>
                <CardHeader>
                  <CardTitle>{tab}</CardTitle>
                  <CardDescription>
                    Resources from the &quot;{tab}&quot; subtab of the shared spreadsheet.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {grouped[tab].map((row, idx) => {
                    const title =
                      row['Name'] ??
                      row['Title'] ??
                      row['Resource'] ??
                      `Resource ${idx + 1}`;
                    const description = row['Description'] ?? '';
                    const link =
                      row['Link'] ??
                      row['URL'] ??
                      row['Website'] ??
                      '';

                    return (
                      <div
                        key={`${title}-${idx}`}
                        className="border rounded-lg px-4 py-3 bg-background"
                      >
                        <h3 className="font-semibold text-sm">{title}</h3>
                        {description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {description}
                          </p>
                        )}
                        {link && (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex text-xs text-primary underline underline-offset-4"
                          >
                            Open resource
                          </a>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

