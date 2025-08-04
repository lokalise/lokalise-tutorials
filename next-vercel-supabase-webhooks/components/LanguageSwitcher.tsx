// components/LanguageSwitcher.tsx
'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { getSupportedLangs } from '@/lib/i18n-config';

export default function LanguageSwitcher() {
  const pathname = usePathname() ?? '/';
  const { lang: currentLang } = useParams() as { lang?: string };

  // remove the currentLang prefix so we can reapply a new one
  const basePath = currentLang
    ? pathname.replace(new RegExp(`^/${currentLang}`), '') || '/'
    : pathname;

  return (
    <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
      {getSupportedLangs().map((lang) => {
        const href = `/${lang}${basePath}`;
        const isActive = lang === currentLang;
        return (
          <li key={lang}>
            <Link
              href={href}
              style={{
                textDecoration: isActive ? 'underline' : 'none',
                fontWeight: isActive ? 'bold' : 'normal',
              }}
            >
              {lang.toUpperCase()}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
