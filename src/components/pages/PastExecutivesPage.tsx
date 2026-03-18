import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Timeline } from '../ui/timeline';
import { useApp } from '../../lib/AppContext';

export function PastExecutivesPage() {
  const { language } = useApp();

  const directoryUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3-7MBB3-LziWVdqxPMd5S-FrVDakPBAg1YfZMzLJxYz5toXAqzvBCm_E9_lpxRpqMUbMFWf3gjerG/pubhtml';

  const title =
    language === 'en' ? 'Past AUS Executive Teams' : "Anciennes équipes exécutives de l’AÉFA";
  const intro =
    language === 'en'
      ? 'Explore how AUS leadership has changed over time and find links to records in the AUS public directory.'
      : "Découvrez l’évolution du leadership de l’AÉFA au fil du temps et trouvez des liens vers les archives dans l’annuaire public de l’AÉFA.";

  const items =
    language === 'en'
      ? [
          {
            title: 'Recent Executives (2020–Present)',
            period: '2020 – Present',
            description: (
              <p>
                A modern era focused on student advocacy, equity initiatives, and adapting to
                remote and hybrid learning. For detailed rosters and portfolios, consult the{' '}
                <a
                  href={directoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  AUS Public Directory
                </a>
                .
              </p>
            )
          },
          {
            title: '2010s: Growth and Renewal',
            period: '2010 – 2019',
            description: (
              <p>
                A decade marked by large‑scale events, new services, and renewed focus on academic
                representation. Earlier executive teams and council records are progressively being
                added to the public directory as archives are digitized.
              </p>
            )
          },
          {
            title: 'Earlier History',
            period: 'Before 2010',
            description: (
              <p>
                Earlier AUS executives laid the foundations for today’s governance structure,
                services, and departmental associations network. Historical records are currently
                maintained by the AUS and Faculty of Arts; for archival requests, please contact the
                AUS.
              </p>
            )
          }
        ]
      : [
          {
            title: 'Exécutifs récents (2020–présent)',
            period: '2020 – présent',
            description: (
              <p>
                Une ère moderne axée sur la défense des étudiant·e·s, les initiatives en matière
                d’équité et l’adaptation à l’apprentissage à distance et hybride. Pour les
                compositions détaillées et les portefeuilles, consultez l’
                <a
                  href={directoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  annuaire public de l’AÉFA
                </a>
                .
              </p>
            )
          },
          {
            title: 'Années 2010 : croissance et renouveau',
            period: '2010 – 2019',
            description: (
              <p>
                Une décennie marquée par de grands événements, de nouveaux services et un regain
                d’importance de la représentation académique. Les anciennes équipes exécutives et
                les procès-verbaux du Conseil sont progressivement ajoutés à l’annuaire public à
                mesure que les archives sont numérisées.
              </p>
            )
          },
          {
            title: 'Histoire antérieure',
            period: 'Avant 2010',
            description: (
              <p>
                Les premières équipes exécutives de l’AÉFA ont jeté les bases de la structure de
                gouvernance, des services et du réseau d’associations départementales d’aujourd’hui.
                Les archives historiques sont actuellement conservées par l’AÉFA et la Faculté des
                arts; pour toute demande, veuillez communiquer avec l’AÉFA.
              </p>
            )
          }
        ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{intro}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild variant="outline">
            <a href={directoryUrl} target="_blank" rel="noreferrer">
              {language === 'en'
                ? 'Open AUS Public Directory'
                : "Ouvrir l’annuaire public de l’AÉFA"}
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en'
              ? 'AUS leadership through the years'
              : "Leadership de l’AÉFA au fil des ans"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Timeline items={items} />
        </CardContent>
      </Card>
    </div>
  );
}

