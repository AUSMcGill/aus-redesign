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

      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Governance' : 'Gouvernance'}
          </CardTitle>
          <CardDescription>
            {language === 'en'
              ? 'How the AUS is structured and how decisions are made.'
              : "Comment l’AÉFA est structurée et comment les décisions sont prises."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            {language === 'en'
              ? 'The AUS is a democratically elected student association representing all Arts and Arts & Science undergraduates. Its governance is rooted in a constitution and equity-focused bylaws that define the roles of the Executive, Council, committees, and affiliated associations.'
              : "L’AÉFA est une association étudiante démocratique qui représente l’ensemble des étudiant·e·s de premier cycle en Arts et en Arts et sciences. Sa gouvernance repose sur une constitution et des règlements axés sur l’équité, qui définissent les rôles de l’exécutif, du conseil, des comités et des associations affiliées."}
          </p>
          <p>
            {language === 'en'
              ? 'Council meetings, general assemblies, and referenda give members a direct voice in shaping priorities, approving budgets, and holding representatives accountable.'
              : "Les réunions du conseil, les assemblées générales et les référendums offrent aux membres un moyen direct de définir les priorités, d’approuver les budgets et de demander des comptes à leurs représentant·e·s."}
          </p>
        </CardContent>
      </Card>

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
            {executives.map((exec) => {
              const initials =
                exec.name
                  .split(' ')
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part.charAt(0).toUpperCase())
                  .join('') || '?';

              return (
                <Card key={`${exec.position}-${exec.name}`}>
                  <CardHeader className="pb-3 flex flex-row items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                      {exec.photoUrl ? (
                        // Using a plain img tag so photos can be hosted anywhere (sheet URLs or /public)
                        // without extra Next.js image domain configuration.
                        <img
                          src={exec.photoUrl}
                          alt={exec.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                          {initials}
                        </span>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">{exec.name}</CardTitle>
                      <CardDescription className="text-xs font-medium text-primary">
                        {exec.position}
                      </CardDescription>
                    </div>
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
              );
            })}
          </div>
        )}

        <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <iframe
            title={language === 'en' ? 'AUS Executive Council Office Hours' : 'Heures de bureau du conseil exécutif'}
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT3-7MBB3-LziWVdqxPMd5S-FrVDakPBAg1YfZMzLJxYz5toXAqzvBCm_E9_lpxRpqMUbMFWf3gjerG/pubhtml?gid=1296473483&single=true&widget=true&headers=false"
            className="w-full h-[1200px] md:h-[1400px]"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
