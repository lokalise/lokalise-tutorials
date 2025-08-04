// app/[lang]/page.tsx
export const dynamic = 'force-static';
export const revalidate = 3600;

import { notFound } from 'next/navigation';
import { isLangSupported, getSupportedLangs } from '@/lib/i18n-config';
import LangPageContent from './LangPageContent';

export async function generateStaticParams() {
  return getSupportedLangs().map((lang) => ({ lang }));
}

export default async function LangPage(props: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await props.params;
  if (!isLangSupported(lang)) notFound();

  return <LangPageContent />;
}
