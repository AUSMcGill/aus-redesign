import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { fetchAnnouncements } from '../../src/lib/announcements';

export const dynamic = 'force-dynamic';

export default async function AnnouncementsPage() {
  const announcements = await fetchAnnouncements();
  const [latestAnnouncement, ...pastAnnouncements] = announcements;
  const formUrl = process.env.NEXT_PUBLIC_AUS_ANNOUNCEMENTS_FORM_URL;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AUS Announcements</CardTitle>
          <CardDescription>
            This page pulls live announcements from your Google Form-linked Google Sheet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Update Logic</p>
            <p className="mt-1">
              New Form submissions create new Sheet rows, then this page reads that sheet live and automatically places
              the newest post at the top. Older entries appear in the Past Updates section below.
            </p>
          </div>
          {formUrl ? (
            <Button asChild>
              <a href={formUrl} target="_blank" rel="noopener noreferrer">
                Open Announcement Submission Form
              </a>
            </Button>
          ) : (
            <Button variant="outline" disabled>
              Add NEXT_PUBLIC_AUS_ANNOUNCEMENTS_FORM_URL to enable form button
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Latest Update</CardTitle>
          <CardDescription>The most recent published announcement.</CardDescription>
        </CardHeader>
        <CardContent>
          {latestAnnouncement ? (
            <div className="space-y-2 border-l-4 border-red-600 pl-4 py-2">
              <p className="font-semibold">{latestAnnouncement.title}</p>
              <p className="text-sm text-muted-foreground">{latestAnnouncement.body}</p>
              <p className="text-xs text-muted-foreground">{latestAnnouncement.date}</p>
              {latestAnnouncement.link && (
                <a
                  href={latestAnnouncement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs underline underline-offset-2 inline-block"
                >
                  Open link
                </a>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No announcements found yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Updates</CardTitle>
          <CardDescription>Previous announcements are archived here automatically.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {pastAnnouncements.length === 0 ? (
            <p className="text-sm text-muted-foreground">No past updates yet.</p>
          ) : (
            pastAnnouncements.map((announcement) => (
              <div key={announcement.id} className="rounded-lg border px-4 py-3">
                <p className="font-medium">{announcement.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{announcement.body}</p>
                <p className="text-xs text-muted-foreground mt-1">{announcement.date}</p>
                {announcement.link && (
                  <a
                    href={announcement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline underline-offset-2 mt-1 inline-block"
                  >
                    Open link
                  </a>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
