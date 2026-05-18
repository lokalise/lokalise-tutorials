import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation('dashboard');

  return (
    <section>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.description')}</p>
    </section>
  );
}