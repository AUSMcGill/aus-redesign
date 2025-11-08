import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import {
    Landmark, Users, FileText, Mail, ArrowRight, Calendar, CheckCircle2
} from 'lucide-react';
import { translations, Language } from '../../lib/translations';

interface GovernancePageProps {
    language: Language;
}

export function GovernancePage({ language }: GovernancePageProps) {
    const t = translations[language];

    return (
        <div className="space-y-6">
            {/* Quick Links (same vibe as HomePage) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="opacity-90 bg-gradient-to-br from-red-500 to-red-700 text-white hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                        <Landmark className="w-10 h-10 mb-2" />
                        <CardTitle>{t.govStructureHeading}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-red-50 mb-3">{t.govSubtitle}</p>
                        <Button variant="secondary" size="sm" className="w-full" onClick={() => scrollToId('structure')}>
                            {t.govQuickStructure}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="opacity-90 bg-gradient-to-br from-red-500 to-red-700 text-white hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                        <Users className="w-10 h-10 mb-2" />
                        <CardTitle>{t.govExecHeading}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-red-50 mb-3">{t.govExecIntro}</p>
                        <Button variant="secondary" size="sm" className="w-full" onClick={() => scrollToId('exec')}>
                            {t.govExecHeading}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="opacity-90 bg-gradient-to-br from-red-500 to-red-700 text-white hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                        <FileText className="w-10 h-10 mb-2" />
                        <CardTitle>{t.govQuickBylaws}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-red-50 mb-3">{t.govQuickTransparency}</p>
                        <Button variant="secondary" size="sm" className="w-full" onClick={() => scrollToId('docs')}>
                            {t.viewResources ?? 'View'}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="opacity-90 bg-gradient-to-br from-red-500 to-red-700 text-white hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                        <Mail className="w-10 h-10 mb-2" />
                        <CardTitle>{t.govQuickHaveYourSay}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-red-50 mb-3">{t.govSubtitle}</p>
                        <Button variant="secondary" size="sm" className="w-full">
                            {t.sendMessage}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Structure + Docs (two-column like HomePage’s Announcements/Events) */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Structure */}
                <Card id="structure">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Landmark className="w-5 h-5 text-red-600" />
                            <CardTitle>{t.govStructureHeading}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* TOP */}
                        <div className="border-l-4 border-red-600 pl-4 py-2">
                            <p className="font-semibold">{t.govTopTitle}</p>
                            <p className="text-sm text-gray-600 mb-1">{t.govTopRole}</p>
                            <p className="text-xs text-gray-500">{t.govTopPoint1}</p>
                        </div>
                        {/* Legislative */}
                        <div className="border-l-4 border-blue-600 pl-4 py-2">
                            <p className="font-semibold">{t.govLegTitle}</p>
                            <p className="text-sm text-gray-600 mb-1">{t.govLegRole}</p>
                            <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
                                <li>{t.govLegPoint1}</li>
                                <li>{t.govLegPoint2}</li>
                                <li>{t.govLegPoint3}</li>
                                <li>{t.govLegPoint4}</li>
                                <li>{t.govLegPoint5}</li>
                            </ul>
                        </div>
                        {/* Executive */}
                        <div className="border-l-4 border-green-600 pl-4 py-2">
                            <p className="font-semibold">{t.govExecTitle}</p>
                            <p className="text-sm text-gray-600 mb-1">{t.govExecRole}</p>
                            <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
                                <li>{t.govExecPoint1}</li>
                                <li>{t.govExecPoint2}</li>
                            </ul>
                        </div>
                        {/* Departments */}
                        <div className="border-l-4 border-purple-600 pl-4 py-2">
                            <p className="font-semibold">{t.govDeptTitle}</p>
                            <p className="text-sm text-gray-600 mb-1">{t.govDeptRole}</p>
                            <p className="text-xs text-gray-500">{t.govDeptPoint1}</p>
                        </div>
                        {/* Committees */}
                        <div className="border-l-4 border-orange-600 pl-4 py-2">
                            <p className="font-semibold">{t.govComTitle}</p>
                            <p className="text-sm text-gray-600 mb-1">{t.govComRole}</p>
                            <p className="text-xs text-gray-500">{t.govComPoint1}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Docs / Fees / Meetings */}
                <Card id="docs">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-red-600" />
                            <CardTitle>{t.govQuickBylaws}</CardTitle>
                        </div>
                        <CardDescription>{t.govQuickTransparency}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <OutlineLink title="Constitution" desc="Foundational principles" />
                        <OutlineLink title="By-laws" desc="Operating rules & procedures" />
                        <OutlineLink title="Meeting Minutes" desc="Approved records" />
                        <div className="flex items-start gap-3 pt-1">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <p className="font-semibold">{t.govQuickHowFees}</p>
                                <p className="text-sm text-gray-600">{t.govSubtitle}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Executive Roles grid (styled like Quick Access grid) */}
            {/* Section: Executive roles */}
            <section id="exec" className="scroll-mt-24">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-red-600" />
                            <CardTitle>{t.govExecHeading}</CardTitle>
                        </div>
                        <CardDescription>{t.govExecIntro}</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <RoleItem
                                title={t.govRolePresidentTitle}
                                desc={t.govRolePresidentDesc}
                            />
                            <RoleItem
                                title={t.govRoleVpAcademicTitle}
                                desc={t.govRoleVpAcademicDesc}
                            />
                            <RoleItem
                                title={t.govRoleVpSocialTitle}
                                desc={t.govRoleVpSocialDesc}
                            />
                            <RoleItem
                                title={t.govRoleVpExternalTitle}
                                desc={t.govRoleVpExternalDesc}
                            />
                            <RoleItem
                                title={t.govRoleVpFinanceTitle}
                                desc={t.govRoleVpFinanceDesc}
                            />
                            <RoleItem
                                title={t.govRoleVpInternalTitle}
                                desc={t.govRoleVpInternalDesc}
                            />

                            {/* VP Comms with quote */}
                            <Card className="border-gray-200">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-50">
                <Users className="w-4 h-4 text-red-700" />
              </span>
                                        <CardTitle className="text-base">{t.govRoleVpCommsTitle}</CardTitle>
                                    </div>
                                    <CardDescription className="whitespace-normal break-words">
                                        {t.govRoleVpCommsDesc}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </section>


            {/* Important Notice (matches HomePage blue card) */}
            <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                    <CardTitle>{t.govTitle ?? t.navGovernance}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">{t.govSubtitle}</p>
                    <div className="flex gap-3 flex-wrap">
                        <Button className="bg-red-700 hover:bg-red-800">
                            {t.govQuickHaveYourSay}
                        </Button>
                        <Button variant="outline">
                            <Calendar className="w-4 h-4 mr-2" />
                            {t.viewCalendar}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

/* ---------- Small helpers (matching your HomePage patterns) ---------- */

function OutlineLink({ title, desc }: { title: string; desc: string }) {
    return (
        <Button variant="outline" className="justify-start h-auto py-3 px-4 w-full">
            <div className="flex items-center gap-3 w-full">
                <FileText className="w-5 h-5 text-red-600" />
                <div className="text-left">
                    <p className="font-semibold">{title}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                </div>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto" />
        </Button>
    );
}


function RoleItem({ title, desc }: { title: string; desc: string }) {
    return (
        <Card className="border-gray-200">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-50">
            <Users className="w-4 h-4 text-red-700" />
          </span>
                    <CardTitle className="text-base">{title}</CardTitle>
                </div>
                <CardDescription className="whitespace-normal break-words leading-relaxed">
                    {desc}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}


function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
