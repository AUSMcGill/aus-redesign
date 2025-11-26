import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { translations } from '../../lib/translations';
import { useApp } from '../../lib/AppContext';
import mcgillArtsImage from '../../assets/0dd661c2df700c302313b4e79dabfdf5ed77ee80.png';

export function AboutPage() {
  const { language } = useApp();
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
            <img
              src={mcgillArtsImage}
              alt={language === 'en' ? 'McGill Arts Building in Fall' : 'Bâtiment des Arts de McGill en automne'}
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
