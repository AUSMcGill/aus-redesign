import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { translations, Language } from '../../lib/translations';
import React from 'react';

interface AboutPageProps {
  language: Language;
}

export function AboutPage({ language }: AboutPageProps) {
  const t = translations[language];

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
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYxMzYyMTA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Team collaboration"
              className="w-full h-full object-cover"
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
            <CardTitle>{t.executiveTeam}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t.executiveDesc}</p>
            <Button variant="outline" className="mt-4 w-full">{t.meetTheTeam}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
