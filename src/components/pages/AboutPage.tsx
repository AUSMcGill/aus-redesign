'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { translations } from '../../lib/translations';
import { useApp } from '../../lib/AppContext';
import mcgillArtsImage from '../../assets/0dd661c2df700c302313b4e79dabfdf5ed77ee80.png';
import { AusExecutive, fetchAusExecutives } from '../../lib/ausExecutives';

export function AboutPage() {
  const { language } = useApp();
  const t = translations[language];
  const [executives, setExecutives] = useState<AusExecutive[]>([]);
  const [loadingExecs, setLoadingExecs] = useState<boolean>(true);
  const [execsError, setExecsError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Reset loading state whenever we re-fetch (e.g. when language changes)
    setLoadingExecs(true);

    fetchAusExecutives()
      .then((data) => {
        if (!isMounted) return;
        setExecutives(data);
        setExecsError(null);
      })
      .catch(() => {
        if (!isMounted) return;
        setExecsError(
          language === 'en'
            ? 'We were unable to load the AUS Executive Council at this time.'
            : "Nous n’avons pas pu charger le Conseil exécutif de l’AÉFA pour le moment."
        );
      })
      .finally(() => {
        if (!isMounted) return;
        setLoadingExecs(false);
      });

    return () => {
      isMounted = false;
    };
  }, [language]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.aboutTitle}</CardTitle>
          <CardDescription>{t.aboutSubtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            {t.aboutDesc}
          </p>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={mcgillArtsImage.src}
              alt={language === 'en' ? 'McGill Arts Building in Fall' : 'Bâtiment des Arts de McGill en automne'}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.ourMission}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t.missionDesc}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.ourValues}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>{t.value1}</li>
              <li>{t.value2}</li>
              <li>{t.value3}</li>
              <li>{t.value4}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Our History' : 'Notre histoire'}</CardTitle>
            <CardDescription>
              {language === 'en'
                ? 'Learn about previous AUS executive teams and how the society has evolved over time.'
                : "Découvrez les anciennes équipes exécutives de l’AÉFA et l’évolution de l’association au fil des ans."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/past-executives">
                {language === 'en' ? 'View past executive teams' : 'Voir les anciennes équipes exécutives'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-xl font-semibold">
            {language === 'en' ? 'AUS Executive Council' : "Conseil exécutif de l’AÉFA"}
          </h2>
          <p className="text-xs text-muted-foreground">
            {language === 'en'
              ? 'Loaded live from the AUS Executive Council tab of the Arts Public Directory.'
              : 'Chargé en direct de l’onglet Conseil exécutif de l’AÉFA dans le répertoire public des Arts.'}
          </p>
        </div>

        {loadingExecs && (
          <p className="text-sm text-muted-foreground">
            {language === 'en' ? 'Loading executive information…' : 'Chargement des informations sur le conseil…'}
          </p>
        )}

        {!loadingExecs && execsError && (
          <p className="text-sm text-destructive">{execsError}</p>
        )}

        {!loadingExecs && !execsError && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {executives.map((exec) => (
              <Card key={`${exec.position}-${exec.name}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{exec.name}</CardTitle>
                  <CardDescription className="text-xs font-medium text-primary">
                    {exec.position}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 text-xs">
                  {exec.officeHours && (
                    <p>
                      <span className="font-medium">
                        {language === 'en' ? 'Office hours: ' : 'Heures de bureau : '}
                      </span>
                      {exec.officeHours}
                    </p>
                  )}
                  {exec.email && (
                    <p>
                      <a
                        href={`mailto:${exec.email}`}
                        className="underline underline-offset-2"
                      >
                        {exec.email}
                      </a>
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
