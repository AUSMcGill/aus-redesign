'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, Users, BookOpen, Bell, ArrowRight, Newspaper, GraduationCap, FileText, MapPin } from 'lucide-react';
import { translations } from '../../lib/translations';
import { useApp } from '../../lib/AppContext';
import mcgillArtsImage from '../../assets/0dd661c2df700c302313b4e79dabfdf5ed77ee80.png';
import type { Announcement } from '../../lib/announcements';

interface HomePageProps {
  announcements?: Announcement[];
}

export function HomePage({ announcements = [] }: HomePageProps) {
  const { language } = useApp();
  const t = translations[language];
  const latestAnnouncements = announcements.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden -mx-4 md:-mx-0 mb-6 rounded-none md:rounded-lg">
        <img
          src={mcgillArtsImage.src}
          alt={language === 'en' ? 'McGill Arts Building in Fall' : 'Bâtiment des Arts de McGill en automne'}
          className="w-full h-full object-cover"
          decoding="async"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 to-red-700/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl md:text-5xl mb-3">{t.heroTitle}</h2>
            <p className="text-xl md:text-2xl">{t.heroSubtitle}</p>
          </div>
        </div>
      </div>

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
              <FileText className="w-10 h-10 mb-2" />
              <CardTitle>{t.quickJoinCommittee}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-50 mb-3">{t.quickJoinCommitteeDesc}</p>
              <Button variant="secondary" size="sm" className="w-full">{t.browse}</Button>
            </CardContent>
          </Card>

          <Card className="opacity-90 bg-gradient-to-br from-red-500 to-red-700 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Users className="w-10 h-10 mb-2" />
              <CardTitle>{t.quickStudyResources}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-50 mb-3">{t.quickStudyResourcesDesc}</p>
              <Button variant="secondary" size="sm" className="w-full">
                {language === 'en' ? 'Open directory' : 'Ouvrir l’annuaire'}
              </Button>
            </CardContent>
          </Card>

          <Card className="opacity-90 bg-gradient-to-br from-red-500 to-red-700 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <BookOpen className="w-10 h-10 mb-2" />
              <CardTitle>{t.quickContactUs}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-50 mb-3">{t.quickContactUsDesc}</p>
              <Button variant="secondary" size="sm" className="w-full">
                {language === 'en' ? 'See governance' : 'Voir la gouvernance'}
              </Button>
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
              {latestAnnouncements.length > 0 ? (
                latestAnnouncements.map((announcement, index) => {
                  const borderColorClass =
                    index === 0
                      ? 'border-red-600'
                      : index === 1
                        ? 'border-blue-600'
                        : 'border-green-600';
                  return (
                    <div key={announcement.id} className={`border-l-4 ${borderColorClass} pl-4 py-2`}>
                      <p className="font-semibold">{announcement.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{announcement.body}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{announcement.date}</p>
                      {announcement.link && (
                        <a
                          href={announcement.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs underline underline-offset-2 mt-1 inline-block"
                        >
                          {language === 'en' ? 'Read update' : 'Lire la mise à jour'}
                        </a>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="border-l-4 border-gray-300 pl-4 py-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'en'
                      ? 'No announcements yet. Connect the announcements Google Sheet to publish updates automatically.'
                      : "Aucune annonce pour le moment. Connectez la feuille Google des annonces pour publier automatiquement."}
                  </p>
                </div>
              )}
              <Button asChild variant="outline" className="w-full mt-2">
                <Link href="/announcements">
                <span>{t.viewAllAnnouncements}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
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
              <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <iframe
                  src="https://calendar.google.com/calendar/embed?mode=AGENDA&src=c0a4c1356471c498c008851ab20dcfafc4e57d9e2ad173d57c76479a2f2f31c1%40group.calendar.google.com&ctz=America%2FToronto"
                  className="w-full h-[520px] border-0"
                  frameBorder="0"
                  scrolling="no"
                  title="AUS Upcoming Events"
                />
              </div>
              <Button asChild variant="outline" className="w-full mt-2">
                <Link href="/involvement">
                <span>{t.viewFullCalendar}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.minervaDesc}</p>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                <div className="flex items-center gap-3 w-full">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-semibold">{t.myCourses}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.myCoursesDesc}</p>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                <div className="flex items-center gap-3 w-full">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold">{t.library}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.libraryDesc}</p>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                <div className="flex items-center gap-3 w-full">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div className="text-left">
                    <p className="font-semibold">{t.studentServices}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.studentServicesDesc}</p>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                <div className="flex items-center gap-3 w-full">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <div className="text-left">
                    <p className="font-semibold">{t.academicCalendar}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.academicCalendarDesc}</p>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                <div className="flex items-center gap-3 w-full">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <div className="text-left">
                    <p className="font-semibold">{t.campusMap}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.campusMapDesc}</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Welcome Image */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <img
              src="/images/welcome-aus.png"
              alt={language === 'en' ? 'Welcome to AUS' : 'Bienvenue à l’AUS'}
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
