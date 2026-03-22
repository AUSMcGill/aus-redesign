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
      <section className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
        <h1 className="text-balance text-3xl font-semibold text-gray-900 md:text-4xl">
          Student resources and service directory
        </h1>
        <p className="mt-3 max-w-3xl text-pretty text-sm leading-6 text-gray-600 md:text-base">
          Browse live AUS resource data, then jump directly into category-specific
          subtabs for faster access to forms, contacts, and support information.
        </p>
      </section>

      <ResourcesPage />
      <Card>
        <CardHeader>
          <CardTitle>Resource Subtabs</CardTitle>
          <CardDescription>
            Open each resources spreadsheet subtab as its own page, loaded live from Google Sheets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subtabs.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subtabs.map((tab) => (
                <Button
                  key={`${tab.slug}-${tab.gid}`}
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-11 w-full justify-start px-4 text-left"
                >
                  <Link href={`/resources/${tab.slug}`}>{tab.name}</Link>
                </Button>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 p-4">
              <p className="text-sm text-gray-600">
                No subtabs are available right now.
              </p>
              <div className="mt-3">
                <Button asChild size="sm">
                  <Link href="/resources">Open the full resources directory</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

