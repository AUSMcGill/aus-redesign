import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../src/components/ui/card';
import { Button } from '../../../src/components/ui/button';
import Link from 'next/link';
import { fetchResourceSubtabs } from '../../../src/lib/resourceSubtabs';

export const dynamic = 'force-dynamic';

export default async function ResourceSubpage(props: any) {
  const tab: string = typeof props?.params?.tab === 'string' ? props.params.tab : '';
  const subtabs = await fetchResourceSubtabs();
  const activeTab = subtabs.find((item) => item.slug === tab) ?? null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resources - {activeTab?.name ?? tab.replace(/-/g, ' ')}</CardTitle>
          <CardDescription>
            Loaded live from the resources spreadsheet subtab.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/resources">Back to resources</Link>
            </Button>
            {subtabs.map((item) => (
              <Button
                asChild
                size="sm"
                key={`${item.slug}-${item.gid}`}
                variant={item.slug === tab ? 'default' : 'outline'}
              >
                <Link href={`/resources/${item.slug}`}>{item.name}</Link>
              </Button>
            ))}
          </div>
          {activeTab ? (
            <div className="w-full h-[85vh] min-h-[900px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <iframe
                src={`https://docs.google.com/spreadsheets/d/e/2PACX-1vTdYqXi8L_HjdpcpOCwG8tUiXIP5VMRQlHr9uU3FEWfm6ST2DODWTlemCQdcnQQF3LvPBibxJPwx23D/pubhtml?gid=${activeTab.gid}&single=true&widget=true&headers=false`}
                className="w-full h-full"
                loading="lazy"
                title={`Resources - ${activeTab.name}`}
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              This resource subtab was not found in the live spreadsheet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

