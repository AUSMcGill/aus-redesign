import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { translations } from '../../lib/translations';
import { useApp } from '../../lib/AppContext';

export function AcademicsPage() {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.academicsTitle}</CardTitle>
          <CardDescription>{t.academicsSubtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1580699228119-7be487b3137f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzdHVkeXxlbnwxfHx8fDE3NjEzNzE0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Library study area"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="mb-3">{t.academicPrograms}</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold">{t.program1}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.program1Desc}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold">{t.program2}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.program2Desc}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold">{t.program3}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.program3Desc}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3">{t.academicAdvocacy}</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold">{t.advocacy1}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.advocacy1Desc}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold">{t.advocacy2}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.advocacy2Desc}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold">{t.advocacy3}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.advocacy3Desc}</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle>{t.importantDates}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>{t.date1Label}</span>
                  <span className="font-semibold">{t.date1Value}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t.date2Label}</span>
                  <span className="font-semibold">{t.date2Value}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t.date3Label}</span>
                  <span className="font-semibold">{t.date3Value}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t.date4Label}</span>
                  <span className="font-semibold">{t.date4Value}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}