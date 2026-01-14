import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './lib/AppContext';
import { Layout } from './components/Layout';

const HomePage = lazy(() => import('./components/pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./components/pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const InvolvementPage = lazy(() => import('./components/pages/InvolvementPage').then((m) => ({ default: m.InvolvementPage })));
const ResourcesPage = lazy(() => import('./components/pages/ResourcesPage').then((m) => ({ default: m.ResourcesPage })));
const AcademicsPage = lazy(() => import('./components/pages/AcademicsPage').then((m) => ({ default: m.AcademicsPage })));
const ContactPage = lazy(() => import('./components/pages/ContactPage').then((m) => ({ default: m.ContactPage })));

function PageFallback() {
  return (
    <div className="w-full py-12 text-center text-gray-500 dark:text-gray-400">
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/involvement" element={<InvolvementPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/academics" element={<AcademicsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
