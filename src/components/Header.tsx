'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BookOpen, Users, FileText, Calendar, Home, Languages, Moon, Sun, Menu, UserPlus, Handshake } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './ui/dropdown-menu';
import ausLogo from '../assets/aus-logo-v2.png';
import aefaLogo from '../assets/aefa-logo.png';
import { translations } from '../lib/translations';
import { useApp } from '../lib/AppContext';

export function Header() {
  const { language, darkMode, toggleLanguage, toggleDarkMode } = useApp();
  const pathname = usePathname();
  const t = translations[language];

  const navItems = [
    { path: '/', label: t.navHome, icon: Home },
    { path: '/about', label: t.navAbout, icon: Users },
    { path: '/incoming-students', label: t.navIncomingStudents, icon: UserPlus },
    { path: '/involvement', label: t.navInvolvement, icon: Calendar },
    { path: '/resources', label: t.navResources, icon: FileText },
    { path: '/academics', label: t.navAcademics, icon: BookOpen },
    { path: '/sponsorship', label: t.navSponsorship, icon: Handshake },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 text-red-700 dark:text-red-400 shadow-lg border-b-4 border-red-700 dark:border-red-600">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer">
            <ImageWithFallback
              src={language === 'fr' ? aefaLogo.src : ausLogo.src}
              alt={language === 'fr' ? 'AÉFA Logo' : 'AUS Logo'}
              className="h-[42px] w-[42px] md:h-[52px] md:w-[52px] object-contain"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="h-[42px] md:h-[52px] w-px bg-red-700 dark:bg-red-600"></div>
            <div>
              <h1 className="text-3xl">{t.headerTitle}</h1>
              <p className="text-red-600 dark:text-red-500 mt-1">{t.headerSubtitle}</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-red-700 dark:border-red-600 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Menu className="w-5 h-5 mr-2" />
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel className="text-red-700 dark:text-red-400">Navigation</DropdownMenuLabel>
                {navItems.map(({ path, label, icon: Icon }) => {
                  const isActive = pathname === path;
                  return (
                    <DropdownMenuItem key={path} asChild>
                      <Link
                        href={path}
                        className={`flex items-center gap-3 cursor-pointer py-3 ${
                          isActive ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400' : ''
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{label}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-red-700 dark:text-red-400">Settings</DropdownMenuLabel>
                <DropdownMenuItem onClick={toggleDarkMode} className="flex items-center gap-3 cursor-pointer py-3">
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleLanguage} className="flex items-center gap-3 cursor-pointer py-3">
                  <Languages className="w-5 h-5" />
                  <span>{language === 'en' ? 'Français' : 'English'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
