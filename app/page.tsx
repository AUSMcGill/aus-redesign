import { HomePage } from '../src/components/pages/HomePage';
import { fetchAnnouncements } from '../src/lib/announcements';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const announcements = await fetchAnnouncements();
  return <HomePage announcements={announcements} />;
}

