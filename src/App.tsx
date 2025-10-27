import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { BookOpen, Users, FileText, Calendar, Mail, Home, Languages } from 'lucide-react';
import ausLogo from './assets/d06d6acabec83a5b5d33976ef83c79eba8569e6a.png';
import mcgillBuilding from './assets/1729019422528.jpeg';
import { translations, Language } from './lib/translations';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { InvolvementPage } from './components/pages/InvolvementPage';
import { ResourcesPage } from './components/pages/ResourcesPage';
import { AcademicsPage } from './components/pages/AcademicsPage';
import { ContactPage } from './components/pages/ContactPage';
import React from 'react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white text-red-700 shadow-lg border-b-4 border-red-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={ausLogo} alt="AUS Logo" className="h-16 w-16 md:h-20 md:w-20" />
              <div className="h-16 md:h-20 w-px bg-red-700"></div>
              <div>
                <h1 className="text-3xl">{t.headerTitle}</h1>
                <p className="text-red-600 mt-1">{t.headerSubtitle}</p>
              </div>
            </div>
            <Button
              onClick={toggleLanguage}
              variant="outline"
              className="flex items-center gap-2 border-red-700 text-red-700 hover:bg-red-50"
            >
              <Languages className="w-4 h-4" />
              <span>{language === 'en' ? 'FR' : 'EN'}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <ImageWithFallback
          src={mcgillBuilding}
          alt="McGill Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 to-red-700/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl md:text-5xl mb-3">{t.heroTitle}</h2>
            <p className="text-xl md:text-2xl">{t.heroSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-2 h-auto bg-white shadow-md p-2 mb-8">
            <TabsTrigger value="home" className="flex items-center gap-2 py-3">
              <Home className="w-4 h-4" />
              <span>{t.navHome}</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2 py-3">
              <Users className="w-4 h-4" />
              <span>{t.navAbout}</span>
            </TabsTrigger>
            <TabsTrigger value="involved" className="flex items-center gap-2 py-3">
              <Calendar className="w-4 h-4" />
              <span>{t.navInvolvement}</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2 py-3">
              <FileText className="w-4 h-4" />
              <span>{t.navResources}</span>
            </TabsTrigger>
            <TabsTrigger value="academics" className="flex items-center gap-2 py-3">
              <BookOpen className="w-4 h-4" />
              <span>{t.navAcademics}</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2 py-3">
              <Mail className="w-4 h-4" />
              <span>{t.navContact}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <HomePage language={language} />
          </TabsContent>

          <TabsContent value="about">
            <AboutPage language={language} />
          </TabsContent>

          <TabsContent value="involved">
            <InvolvementPage language={language} />
          </TabsContent>

          <TabsContent value="resources">
            <ResourcesPage language={language} />
          </TabsContent>

          <TabsContent value="academics">
            <AcademicsPage language={language} />
          </TabsContent>

          <TabsContent value="contact">
            <ContactPage language={language} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="mb-3">{t.headerTitle}</h3>
              <p className="text-sm text-gray-300">
                {t.footerDesc}
              </p>
            </div>
            <div>
              <h3 className="mb-3">{t.footerQuickLinks}</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">{t.mcgillUniversity}</a></li>
                <li><a href="#" className="hover:text-white">{t.facultyOfArts}</a></li>
                <li><a href="#" className="hover:text-white">{t.ssmu}</a></li>
                <li><a href="#" className="hover:text-white">{t.minerva}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3">{t.footerResources}</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">{t.studentServices}</a></li>
                <li><a href="#" className="hover:text-white">{t.resource3}</a></li>
                <li><a href="#" className="hover:text-white">{t.academicCalendar}</a></li>
                <li><a href="#" className="hover:text-white">{t.campusMap}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            <p>{t.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
