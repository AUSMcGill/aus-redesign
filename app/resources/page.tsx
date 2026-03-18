import { ResourcesPage } from '../../src/components/pages/ResourcesPage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../src/components/ui/card';
import Link from 'next/link';
import { Button } from '../../src/components/ui/button';
import { fetchResourceSubtabs } from '../../src/lib/resourceSubtabs';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const subtabs = await fetchResourceSubtabs();

  return (
    <div className="space-y-8">
      <ResourcesPage />
      <Card>
        <CardHeader>
          <CardTitle>Resource Subtabs</CardTitle>
          <CardDescription>
            Open each resources spreadsheet subtab as its own page, loaded live from Google Sheets.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {subtabs.map((tab) => (
            <Button key={`${tab.slug}-${tab.gid}`} asChild size="sm" variant="outline">
              <Link href={`/resources/${tab.slug}`}>{tab.name}</Link>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

