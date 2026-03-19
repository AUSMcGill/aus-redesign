'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../src/components/ui/button';
import { translations } from '../src/lib/translations';
import { useApp } from '../src/lib/AppContext';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  style: ['normal', 'italic'],
});

const partnerLogos = ['Logoipsum', 'LOCO', 'Logo-M', 'Logoipsum', 'Logois'];

export default function Page() {
  const { language } = useApp();
  const t = translations[language];

  const navItems = [
    { path: '/', label: t.navHome },
    { path: '/about', label: t.navAbout },
    { path: '/incoming-students', label: t.navIncomingStudents },
    { path: '/involvement', label: t.navInvolvement },
    { path: '/resources', label: t.navResources },
    { path: '/academics', label: t.navAcademics },
    { path: '/sponsorship', label: t.navSponsorship },
  ];

  return (
    <div className="bg-[#F3F3F3] py-2 md:py-3">
      <div className="mx-auto w-full max-w-[1380px] px-3 md:px-6">
        <div className="sticky top-0 z-30 mb-3 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)] md:mb-4 md:px-5 md:py-2.5">
          <div className="flex flex-wrap items-center gap-2 md:flex-nowrap md:justify-between">
            <Link href="/" className="text-sm font-medium text-[#111111] md:text-[15px]">
              {t.headerTitle}
            </Link>

            <nav className="order-3 flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-700 md:order-2 md:w-auto md:flex-nowrap md:gap-x-4 md:text-[12px]">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} className="transition-colors hover:text-[#111111]">
                  {item.label}
                </Link>
              ))}
            </nav>

            <Button
              asChild
              className="order-2 h-8 rounded-full bg-[#C8102E] px-3 text-xs font-medium text-white hover:bg-[#A60D26] md:order-3 md:h-9 md:px-4"
            >
              <Link href="/about" className="inline-flex items-center gap-2">
                <span>Get in touch</span>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/95 text-[#C8102E]">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Button>
          </div>
        </div>

        <section className="relative h-[510px] overflow-hidden rounded-2xl bg-[#111111] md:h-[580px]">
          <Image
            src="https://picsum.photos/id/1018/1800/1200"
            alt="Landing hero background"
            fill
            unoptimized
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-x-4 top-[44%] -translate-y-1/2 text-center md:inset-x-10">
            <h1
              className={`${playfairDisplay.className} text-[50px] font-bold italic leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[84px]`}
            >
              aris / aéfa
            </h1>
          </div>

          <div className="absolute inset-x-4 bottom-6 flex flex-col gap-4 md:inset-x-8 md:bottom-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className={`${playfairDisplay.className} text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[48px]`}>
                Arts Undergraduate Society
              </h2>
              <p className="mt-2 max-w-[540px] text-sm text-gray-200 md:text-base">
                Proudly representing B.A and B.A.&amp;B.Sc. Students across 32 departments since 1908
              </p>
            </div>

            <Button
              asChild
              className="h-10 w-full rounded-full bg-[#C8102E] px-4 text-sm text-white hover:bg-[#A60D26] md:h-11 md:w-auto md:px-5"
            >
              <Link href="/about" className="inline-flex items-center justify-center gap-2">
                <span>Learn what we do</span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#C8102E]">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-6 bg-white px-4 py-7 md:mt-7 md:px-6">
          <p className="text-center text-sm font-medium text-gray-500">We&apos;ve partnered with:</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:gap-5">
            {partnerLogos.map((logo, index) => (
              <motion.div
                key={`${logo}-${index}`}
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.15, duration: 0.45, ease: 'easeOut' }}
                className="flex h-12 w-[112px] items-center justify-center rounded-md border border-gray-200 bg-[#FAFAFA] text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500 md:w-[132px]"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

