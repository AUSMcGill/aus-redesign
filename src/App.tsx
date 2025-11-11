import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './lib/AppContext';
import { Layout } from './components/Layout';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { InvolvementPage } from './components/pages/InvolvementPage';
import { ResourcesPage } from './components/pages/ResourcesPage';
import { AcademicsPage } from './components/pages/AcademicsPage';
import { ContactPage } from './components/pages/ContactPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/involvement" element={<InvolvementPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
