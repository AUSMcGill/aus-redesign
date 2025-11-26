import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar } from 'lucide-react';
import { translations } from '../../lib/translations';
import { useApp } from '../../lib/AppContext';

export function InvolvementPage() {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.involvementTitle}</CardTitle>
          <CardDescription>{t.involvementSubtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            {t.involvementDesc}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle>{t.committees}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">{t.committee1}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.committee1Desc}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t.committee2}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.committee2Desc}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t.committee3}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.committee3Desc}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t.committee4}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.committee4Desc}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>{t.upcomingOpportunities}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{t.opportunity1}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.opportunity1Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{t.opportunity2}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.opportunity2Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{t.opportunity3}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.opportunity3Desc}</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">{t.applyNow}</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Google Calendar Integration */}
      <Card>
        <CardHeader>
          <CardTitle>{t.calendarTitle}</CardTitle>
          <CardDescription>{t.calendarDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FToronto&bgcolor=%23ffffff&src=en.canadian%23holiday%40group.v.calendar.google.com&color=%230B8043"
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
              title="AUS Events Calendar"
            ></iframe>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            <strong>{language === 'en' ? 'Note:' : 'Remarque :'}</strong> {t.calendarNote}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}