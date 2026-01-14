import { Link, NavLink } from 'react-router-dom';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BookOpen, Users, FileText, Calendar, Mail, Home, Languages, Moon, Sun, Menu } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';
import ausLogo from '../assets/d06d6acabec83a5b5d33976ef83c79eba8569e6a.png';
import { translations } from '../lib/translations';
import { useApp } from '../lib/AppContext';

export function Header() {
  const { language, darkMode, toggleLanguage, toggleDarkMode } = useApp();
  const t = translations[language];

  const navItems = [
    { path: '/', label: t.navHome, icon: Home },
    { path: '/about', label: t.navAbout, icon: Users },
    { path: '/involvement', label: t.navInvolvement, icon: Calendar },
    { path: '/resources', label: t.navResources, icon: FileText },
    { path: '/academics', label: t.navAcademics, icon: BookOpen },
    { path: '/contact', label: t.navContact, icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-red-700/20 dark:border-red-600/20 bg-white/85 dark:bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer">
            <ImageWithFallback
              src={ausLogo}
              alt="AUS Logo"
              className="h-16 w-16 md:h-20 md:w-20 object-contain"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="h-16 md:h-20 w-px bg-red-700 dark:bg-red-600"></div>
            <div>
              <h1 className="text-2xl md:text-3xl text-red-800 dark:text-red-300">{t.headerTitle}</h1>
              <p className="text-red-600/90 dark:text-red-400 mt-1">{t.headerSubtitle}</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-3">
            <nav aria-label="Primary" className="flex items-center gap-1 rounded-full border border-red-700/15 dark:border-red-600/20 bg-white/60 dark:bg-gray-900/40 px-2 py-1 backdrop-blur">
              {navItems.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    [
                      "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60",
                      isActive
                        ? "bg-red-700 text-white shadow-sm"
                        : "text-gray-700 hover:bg-red-50 hover:text-red-800 dark:text-gray-200 dark:hover:bg-red-950/60 dark:hover:text-red-200",
                    ].join(" ")
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={toggleDarkMode}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                className="border-red-700/25 dark:border-red-600/25"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={toggleLanguage}
                aria-label={language === 'en' ? "Switch to French" : "Switch to English"}
                className="border-red-700/25 dark:border-red-600/25"
              >
                <Languages className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile nav */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="border-red-700/25 dark:border-red-600/25"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Open menu"
                  className="border-red-700/25 dark:border-red-600/25"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <SheetHeader className="border-b p-4">
                  <SheetTitle className="text-red-800 dark:text-red-300">Menu</SheetTitle>
                </SheetHeader>

                <div className="p-4">
                  <nav aria-label="Mobile primary" className="space-y-2">
                    {navItems.map(({ path, label, icon: Icon }) => (
                      <SheetClose asChild key={path}>
                        <NavLink
                          to={path}
                          className={({ isActive }) =>
                            [
                              "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                              isActive
                                ? "bg-red-700 text-white"
                                : "text-gray-800 hover:bg-red-50 dark:text-gray-100 dark:hover:bg-red-950/60",
                            ].join(" ")
                          }
                        >
                          <Icon className="h-5 w-5" />
                          <span>{label}</span>
                        </NavLink>
                      </SheetClose>
                    ))}
                  </nav>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start gap-3 border-red-700/20 dark:border-red-600/25"
                      onClick={toggleDarkMode}
                    >
                      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start gap-3 border-red-700/20 dark:border-red-600/25"
                      onClick={toggleLanguage}
                    >
                      <Languages className="h-5 w-5" />
                      <span>{language === 'en' ? "Français" : "English"}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
