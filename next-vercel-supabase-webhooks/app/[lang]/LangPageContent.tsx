// app/[lang]/LangPageContent.tsx
'use client';

import { useCallback } from 'react';
import { useTranslation } from '@/lib/translation-context';
import ClickCounter from './ClickCounter';

export default function LangPageContent() {
  const { t } = useTranslation();

  // memoize so we don’t re-create this on every render
  const pluralText = useCallback(
    (count: number) => t('counter', { count }),
    [t]
  );

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{t('title', { name: 'Lokalise' })}</h1>
      <p>{t('subtitle')}</p>
      <ClickCounter
        buttonText={t('button')}
        pluralText={pluralText}
      />
    </main>
  );
}
