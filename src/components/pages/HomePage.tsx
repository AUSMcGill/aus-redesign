import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, Users, BookOpen, Mail, Bell, ArrowRight, Newspaper, GraduationCap, FileText, MapPin } from 'lucide-react';
import { translations, Language } from '../../lib/translations';
import React from 'react';

interface HomePageProps {
  language: Language;
}

export function HomePage({ language }: HomePageProps) {
  const t = translations[language];

  return (
    <div className="space-y-6">
      {/* Quick Links Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="opacity-90 bg-gradient-to-br from-red-500 to-red-700 text-white hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <Calendar className="w-10 h-10 mb-2" />
            <CardTitle>{t.quickUpcomingEvents}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-50 mb-3">{t.quickUpcomingEventsDesc}</p>
            <Button variant="secondary" size="sm" className="w-full">{t.viewCalendar}</Button>
          </CardContent>
        </Card>

        <Card className="opacity-90 bg-gradient-to-br from-red-500 to-red-700 text-white hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <Users className="w-10 h-10 mb-2" />
            <CardTitle>{t.quickJoinCommittee}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-50 mb-3">{t.quickJoinCommitteeDesc}</p>
            <Button variant="secondary" size="sm" className="w-full">{t.applyNow}</Button>
          </CardContent>
        </Card>

        <Card className="opacity-90 bg-gradient-to-br from-red-500 to-red-700 text-white hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <BookOpen className="w-10 h-10 mb-2" />
            <CardTitle>{t.quickStudyResources}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-50 mb-3">{t.quickStudyResourcesDesc}</p>
            <Button variant="secondary" size="sm" className="w-full">{t.browse}</Button>
          </CardContent>
        </Card>

        <Card className="opacity-90 bg-gradient-to-br from-red-500 to-red-700 text-white hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <Mail className="w-10 h-10 mb-2" />
            <CardTitle>{t.quickContactUs}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-50 mb-3">{t.quickContactUsDesc}</p>
            <Button variant="secondary" size="sm" className="w-full">{t.sendMessage}</Button>
          </CardContent>
        </Card>
      </div>

      {/* Announcements and Events */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-600" />
              <CardTitle>{t.latestAnnouncements}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-red-600 pl-4 py-2">
              <p className="font-semibold">{t.announcement1Title}</p>
              <p className="text-sm text-gray-600 mb-1">{t.announcement1Desc}</p>
              <p className="text-xs text-gray-500">{t.announcement1Date}</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <p className="font-semibold">{t.announcement2Title}</p>
              <p className="text-sm text-gray-600 mb-1">{t.announcement2Desc}</p>
              <p className="text-xs text-gray-500">{t.announcement2Date}</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4 py-2">
              <p className="font-semibold">{t.announcement3Title}</p>
              <p className="text-sm text-gray-600 mb-1">{t.announcement3Desc}</p>
              <p className="text-xs text-gray-500">{t.announcement3Date}</p>
            </div>
            <Button variant="outline" className="w-full mt-2">
              <span>{t.viewAllAnnouncements}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" />
              <CardTitle>{t.upcomingEvents}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-center">
                <div className="bg-red-600 text-white rounded-lg p-2 w-14">
                  <p className="text-xs">{language === 'en' ? 'OCT' : 'OCT'}</p>
                  <p className="text-2xl">28</p>
                </div>
              </div>
              <div className="flex-grow">
                <p className="font-semibold">{t.event1Title}</p>
                <p className="text-sm text-gray-600">{t.event1Desc}</p>
                <p className="text-xs text-gray-500 mt-1">{t.event1Time}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-center">
                <div className="bg-blue-600 text-white rounded-lg p-2 w-14">
                  <p className="text-xs">{language === 'en' ? 'NOV' : 'NOV'}</p>
                  <p className="text-2xl">2</p>
                </div>
              </div>
              <div className="flex-grow">
                <p className="font-semibold">{t.event2Title}</p>
                <p className="text-sm text-gray-600">{t.event2Desc}</p>
                <p className="text-xs text-gray-500 mt-1">{t.event2Time}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-center">
                <div className="bg-green-600 text-white rounded-lg p-2 w-14">
                  <p className="text-xs">{language === 'en' ? 'NOV' : 'NOV'}</p>
                  <p className="text-2xl">10</p>
                </div>
              </div>
              <div className="flex-grow">
                <p className="font-semibold">{t.event3Title}</p>
                <p className="text-sm text-gray-600">{t.event3Desc}</p>
                <p className="text-xs text-gray-500 mt-1">{t.event3Time}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-2">
              <span>{t.viewFullCalendar}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Resources Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-red-600" />
            <CardTitle>{t.quickAccessResources}</CardTitle>
          </div>
          <CardDescription>{t.quickAccessDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start h-auto py-3 px-4">
              <div className="flex items-center gap-3 w-full">
                <GraduationCap className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <p className="font-semibold">{t.minerva}</p>
                  <p className="text-xs text-gray-500">{t.minervaDesc}</p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4">
              <div className="flex items-center gap-3 w-full">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="font-semibold">{t.myCourses}</p>
                  <p className="text-xs text-gray-500">{t.myCoursesDesc}</p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4">
              <div className="flex items-center gap-3 w-full">
                <FileText className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="font-semibold">{t.library}</p>
                  <p className="text-xs text-gray-500">{t.libraryDesc}</p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4">
              <div className="flex items-center gap-3 w-full">
                <Users className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <p className="font-semibold">{t.studentServices}</p>
                  <p className="text-xs text-gray-500">{t.studentServicesDesc}</p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4">
              <div className="flex items-center gap-3 w-full">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div className="text-left">
                  <p className="font-semibold">{t.academicCalendar}</p>
                  <p className="text-xs text-gray-500">{t.academicCalendarDesc}</p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4">
              <div className="flex items-center gap-3 w-full">
                <MapPin className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <p className="font-semibold">{t.campusMap}</p>
                  <p className="text-xs text-gray-500">{t.campusMapDesc}</p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>{t.welcomeTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {t.welcomeDesc}
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button className="bg-red-700 hover:bg-red-800">{t.learnMore}</Button>
            <Button variant="outline">{t.getInvolved}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Land Acknowledgement */}
      <div className="py-4 px-6 bg-gray-100 rounded-lg border border-gray-200">
        <p className="text-base text-gray-600 text-justify max-w-4xl mx-auto leading-relaxed">{t.landAcknowledgement}</p>
      </div>
    </div>
  );
}
