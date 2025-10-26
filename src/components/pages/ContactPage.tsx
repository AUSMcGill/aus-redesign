import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { MapPin, Mail, Phone } from 'lucide-react';
import { translations, Language } from '../../lib/translations';
import React from 'react';

interface ContactPageProps {
  language: Language;
}

export function ContactPage({ language }: ContactPageProps) {
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(language === 'en' 
      ? 'Thank you for your message! We will get back to you soon.' 
      : 'Merci pour votre message! Nous vous répondrons bientôt.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.contactTitle}</CardTitle>
            <CardDescription>{t.contactSubtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">{t.nameLabel}</label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">{t.emailLabel}</label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">{t.messageLabel}</label>
                <Textarea
                  id="message"
                  placeholder={t.messagePlaceholder}
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-red-700 hover:bg-red-800">
                {t.sendMessage}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.contactInfoTitle}</CardTitle>
            <CardDescription>{t.contactInfoSubtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">{t.officeLocation}</p>
                <p className="text-sm text-gray-600">{t.officeAddress1}</p>
                <p className="text-sm text-gray-600">{t.officeAddress2}</p>
                <p className="text-sm text-gray-600">{t.officeAddress3}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">{t.email}</p>
                <p className="text-sm text-gray-600">info@ausmcgill.com</p>
                <p className="text-sm text-gray-600">vp.academic@ausmcgill.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">{t.phone}</p>
                <p className="text-sm text-gray-600">(514) 398-6800</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="font-semibold mb-2">{t.officeHours}</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{t.officeHoursWeekday}</p>
                <p>{t.officeHoursWeekend}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="font-semibold mb-3">{t.followUs}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Facebook</Button>
                <Button variant="outline" size="sm">Instagram</Button>
                <Button variant="outline" size="sm">Twitter</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
