import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, BookOpen, Users, GraduationCap, Calendar } from 'lucide-react';
import { translations } from '../../lib/translations';
import { useApp } from '../../lib/AppContext';

export function ResourcesPage() {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.resourcesTitle}</CardTitle>
          <CardDescription>{t.resourcesSubtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <FileText className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle>{t.resource1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{t.resource1Desc}</p>
                <Button variant="outline" className="w-full">{t.viewResources}</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <BookOpen className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle>{t.resource2}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{t.resource2Desc}</p>
                <Button variant="outline" className="w-full">{t.browseGuides}</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <Users className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle>{t.resource3}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{t.resource3Desc}</p>
                <Button variant="outline" className="w-full">{t.getSupport}</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <GraduationCap className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle>{t.resource4}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{t.resource4Desc}</p>
                <Button variant="outline" className="w-full">{t.learnMoreBtn}</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <FileText className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle>{t.resource5}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{t.resource5Desc}</p>
                <Button variant="outline" className="w-full">{t.accessFiles}</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <Calendar className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle>{t.resource6}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{t.resource6Desc}</p>
                <Button variant="outline" className="w-full">{t.viewCalendar}</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
