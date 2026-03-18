import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';

export default function SponsorshipPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sponsorship</CardTitle>
          <CardDescription>
            Partnership and sponsorship information for organizations interested in collaborating with AUS.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Use this page to outline sponsorship packages, event opportunities, and audience details for
            potential partners. You can later connect this page to a dedicated intake form or media kit.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <Button variant="outline" disabled>
              Download Sponsorship Kit
            </Button>
            <Button variant="outline" disabled>
              View Partner Benefits
            </Button>
            <Button variant="outline" disabled>
              Submit Interest Form
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Who You Reach</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>- 8,600+ undergraduate Arts students at McGill.</p>
            <p>- High-visibility channels across events, digital, and campus spaces.</p>
            <p>- Opportunities for semester-long and campaign-specific partnerships.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sponsorship Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>- Event sponsorships and activations.</p>
            <p>- Student resource and service partnerships.</p>
            <p>- Custom collaborations with AUS portfolios and committees.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
