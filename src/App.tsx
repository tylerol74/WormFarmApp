import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CalculatorPage from './pages/CalculatorPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import AssetsPage from './pages/AssetsPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CalculatorPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/assets" element={<AssetsPage />} />
      </Routes>
    </Layout>
  );
}
