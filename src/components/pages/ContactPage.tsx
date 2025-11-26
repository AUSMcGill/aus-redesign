import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { MapPin, Mail, Phone, Megaphone } from 'lucide-react';
import { translations } from '../../lib/translations';
import { useApp } from '../../lib/AppContext';

export function ContactPage() {
  const { language } = useApp();
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
      {/* AUS Express Listserv Submission */}
      <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="bg-red-600 dark:bg-red-700 text-white p-3 rounded-lg">
              <Megaphone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-red-800 dark:text-red-300">
                {language === 'en' ? 'Submit to AUS Express Listserv' : 'Soumettre à la liste de diffusion AUS Express'}
              </CardTitle>
              <CardDescription className="text-red-700 dark:text-red-400 mt-2">
                {language === 'en' 
                  ? 'Share your event, opportunity, or announcement with the Arts community through our email listserv.' 
                  : 'Partagez votre événement, opportunité ou annonce avec la communauté des Arts via notre liste de diffusion.'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button 
            asChild 
            className="bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700"
          >
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScYduYasZYLXzkl-w6yxQUULqss_S48p8G7uY_G5syNwv-4Ng/viewform" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {language === 'en' ? 'Submit to Listserv' : 'Soumettre à la liste de diffusion'}
            </a>
          </Button>
        </CardContent>
      </Card>

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
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.officeAddress1}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.officeAddress2}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.officeAddress3}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">{t.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">info@ausmcgill.com</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">vp.academic@ausmcgill.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">{t.phone}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">(514) 398-6800</p>
              </div>
            </div>

            <div className="pt-4 border-t dark:border-gray-700">
              <p className="font-semibold mb-2">{t.officeHours}</p>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p>{t.officeHoursWeekday}</p>
                <p>{t.officeHoursWeekend}</p>
              </div>
            </div>

            <div className="pt-4 border-t dark:border-gray-700">
              <p className="font-semibold mb-3">{t.followUs}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.facebook.com/ausmcgill" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.instagram.com/ausmcgill/?hl=en" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://x.com/AUSMcGill" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Directory Google Sheet */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'AUS Contact Directory' : 'Répertoire de contacts de l\'AÉPCA'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Find contact information for all AUS team members' 
              : 'Trouvez les coordonnées de tous les membres de l\'équipe de l\'AÉPCA'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <iframe
              src="https://docs.google.com/spreadsheets/d/17pjC68uqtG2ziZ9LCGqNI9mdPgpBBQtuGRyhoIcOPD0/htmlembed?gid=2046566544&single=true&widget=false&headers=false&chrome=false"
              className="w-full h-full"
              title={language === 'en' ? 'AUS Contact Directory' : 'Répertoire de contacts de l\'AÉPCA'}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
