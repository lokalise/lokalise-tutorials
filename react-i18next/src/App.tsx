import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { LocaleLayout } from './components/LocaleLayout';
import { fallbackLanguage } from './i18n/languages';

const HomePage = lazy(() => import('./pages/HomePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/${fallbackLanguage}/home`} replace />}
      />

      <Route path=":lng" element={<LocaleLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}