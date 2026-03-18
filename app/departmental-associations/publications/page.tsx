import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../src/components/ui/card';

export default function DepartmentalPublicationsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Departmental Publications Directory</CardTitle>
          <CardDescription>
            Explore student-run publications affiliated with AUS departmental associations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <iframe
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT3-7MBB3-LziWVdqxPMd5S-FrVDakPBAg1YfZMzLJxYz5toXAqzvBCm_E9_lpxRpqMUbMFWf3gjerG/pubhtml?gid=2046566544&single=true&widget=true&headers=false"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

