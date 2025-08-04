// app/page.tsx
'use server'

import { redirect } from 'next/navigation'
import { getDefaultLang } from '@/lib/i18n-config'

export default async function RootPage(): Promise<never> {
  const lang = getDefaultLang()
  redirect(`/${lang}`)
}
