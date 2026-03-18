'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Timeline } from '../ui/timeline';
import { useApp } from '../../lib/AppContext';
import { fetchPastExecutives, type PastExecutiveYear } from '../../lib/pastExecutives';

export function PastExecutivesPage() {
  const { language } = useApp();

  const directoryUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3-7MBB3-LziWVdqxPMd5S-FrVDakPBAg1YfZMzLJxYz5toXAqzvBCm_E9_lpxRpqMUbMFWf3gjerG/pubhtml';

  const [years, setYears] = useState<PastExecutiveYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchPastExecutives()
      .then((data) => {
        if (!isMounted) return;
        setYears(data);
        setError(null);
      })
      .catch(() => {
        if (!isMounted) return;
        setYears([]);
        setError(
          language === 'en'
            ? 'We were unable to load past executive teams at this time.'
            : "Nous n’avons pas pu charger les anciennes équipes exécutives pour le moment."
        );
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [language]);

  const timelineData = useMemo(() => {
    // Skip 2026-2027 per request
    const filtered = years.filter((y) => y.year !== '2026-2027');

    return filtered.map((y) => ({
      title: y.year,
      content: (
        <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-neutral-900 dark:text-neutral-100">
              {language === 'en' ? `Executive team` : `Équipe exécutive`}
            </CardTitle>
            <CardDescription>
              {language === 'en'
                ? 'Positions and names sourced live from the AUS Public Directory.'
                : "Postes et noms chargés en direct à partir de l’annuaire public de l’AÉFA."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {y.executives.map((e) => (
                <div
                  key={`${y.year}-${e.position}-${e.name}`}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3"
                >
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {e.position}
                  </p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">{e.name}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" size="sm">
                <a href={directoryUrl} target="_blank" rel="noreferrer">
                  {language === 'en' ? 'Open directory' : 'Ouvrir l’annuaire'}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ),
    }));
  }, [years, language]);

  const title =
    language === 'en' ? 'Past AUS Executive Teams' : "Anciennes équipes exécutives de l’AÉFA";
  const intro =
    language === 'en'
      ? 'Browse AUS executive teams by year. Data is sourced live from the AUS public directory.'
      : "Consultez les équipes exécutives de l’AÉFA par année. Les données proviennent en direct de l’annuaire public de l’AÉFA.";

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

      {loading && (
        <p className="text-sm text-muted-foreground">
          {language === 'en' ? 'Loading past executive teams…' : 'Chargement des anciennes équipes…'}
        </p>
      )}

      {!loading && error && <p className="text-sm text-destructive">{error}</p>}

      {!loading && !error && <Timeline data={timelineData} />}
    </div>
  );
}

