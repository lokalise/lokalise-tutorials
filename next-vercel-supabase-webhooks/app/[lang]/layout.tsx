// app/[lang]/layout.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations } from '@/lib/get-translations';
import { TranslationProvider } from '@/lib/translation-context';
import { isLangSupported } from '@/lib/i18n-config';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isLangSupported(lang)) {
    return {
      title: 'Language not supported',
      description: '',
    };
  }

  const meta = await getTranslations<{ metaTitle?: string; metaDescription?: string }>(
    lang,
    'meta'
  );

  return {
    title: meta.metaTitle ?? 'Default title',
    description: meta.metaDescription ?? 'Default description',
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLangSupported(lang)) {
    notFound();
  }

  const uiMessages = await getTranslations<Record<string, string>>(lang, 'ui');

  return (
    <html lang={lang}>
      <body>
        <header>
          <LanguageSwitcher />
        </header>
        <TranslationProvider lang={lang} messages={uiMessages}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
