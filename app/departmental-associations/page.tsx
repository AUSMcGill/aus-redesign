import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../src/components/ui/card';

export default function DepartmentalAssociationsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Departmental Associations Directory</CardTitle>
          <CardDescription>
            Browse all AUS-affiliated departmental associations in the Arts Public Directory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <iframe
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT3-7MBB3-LziWVdqxPMd5S-FrVDakPBAg1YfZMzLJxYz5toXAqzvBCm_E9_lpxRpqMUbMFWf3gjerG/pubhtml?gid=2134432085&single=true&widget=true&headers=false"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

