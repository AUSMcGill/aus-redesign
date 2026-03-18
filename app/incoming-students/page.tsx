import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';

export default function IncomingStudentsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Incoming Students</CardTitle>
          <CardDescription>
            Start here for key AUS links, support services, and next steps for your first term at McGill Arts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This page is designed as a central entry point for newly admitted and newly arrived Arts students.
            You can expand it over time with orientation schedules, advising timelines, and onboarding checklists.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <Button asChild variant="outline">
              <Link href="/about">About AUS</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/resources">Student Resources</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/academics">Academic Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Suggested First Week Checklist</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>- Join AUS channels and social media.</p>
            <p>- Review departmental association options.</p>
            <p>- Explore study spaces and services.</p>
            <p>- Save important deadlines from the academics page.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Need Department-Specific Support?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              Departmental associations are often the fastest way to find peer mentors, course advice,
              and program-specific updates.
            </p>
            <Button asChild size="sm">
              <Link href="/departmental-associations">Open Departmental Associations</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
