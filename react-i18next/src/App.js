import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';

const locales = {
  en: { title: 'English' },
  lv: { title: 'Latviski' },
  es: { title: 'Español' },
};

function App() {
  const { t, i18n } = useTranslation();

  const [messages, setMessages] = useState(0);

  return (
    <div>
      <ul>
        {Object.keys(locales).map((locale) => (
          <li key={locale}><button style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(locale)}>
            {locales[locale].title}
          </button></li>
        ))}
      </ul>
      <h1>{t('main.header')}</h1>

      <button onClick={() => setMessages(messages + 1)}>+1 message</button>
      <p>
        {t('main.new_messages', { count: messages })}
      </p>

      <p>
        {t('main.current_date', { date: new Date() })}
      </p>

      <p>
        {t('main.incoming_message', { from: 'Ann' })}<br/>
        {t('main.message_contents', { body: 'How are you doing?', context: 'female' })}
      </p>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Suspense fallback="...loading">
      <App />
    </Suspense>
  );
}
