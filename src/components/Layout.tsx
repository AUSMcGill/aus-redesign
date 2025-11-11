import { Header } from './Header';
import { translations } from '../lib/translations';
import { useApp } from '../lib/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { language, darkMode } = useApp();
  const t = translations[language];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <h3 className="mb-3">{t.headerTitle}</h3>
                <p className="text-sm text-gray-300 dark:text-gray-400">
                  {t.footerDesc}
                </p>
              </div>
              <div>
                <h3 className="mb-3">{t.footerQuickLinks}</h3>
                <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
                  <li><a href="#" className="hover:text-white">{t.mcgillUniversity}</a></li>
                  <li><a href="#" className="hover:text-white">{t.facultyOfArts}</a></li>
                  <li><a href="#" className="hover:text-white">{t.ssmu}</a></li>
                  <li><a href="#" className="hover:text-white">{t.minerva}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3">{t.footerResources}</h3>
                <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
                  <li><a href="#" className="hover:text-white">{t.studentServices}</a></li>
                  <li><a href="#" className="hover:text-white">{t.resource3}</a></li>
                  <li><a href="#" className="hover:text-white">{t.academicCalendar}</a></li>
                  <li><a href="#" className="hover:text-white">{t.campusMap}</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 dark:border-gray-800 pt-6 text-center text-sm text-gray-400 dark:text-gray-500">
              <p>{t.footerCopyright}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
