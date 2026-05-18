import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

type SenderPronouns = 'male' | 'female' | 'neutral';

const sender: {
  name: string;
  pronouns: SenderPronouns;
  message: string;
} = {
  name: 'Ann',
  pronouns: 'female',
  message: 'How are you doing?',
};

export default function HomePage() {
  const { t } = useTranslation('home');
  const [messages, setMessages] = useState(0);

  return (
    <section>
      <h1>{t('main.header')}</h1>

      <p>
        <Trans
          ns="home"
          i18nKey="main.description"
          components={{
            strong: <strong />,
            docsLink: (
              <a
                href="https://react.i18next.com/"
                target="_blank"
                rel="noreferrer"
              />
            ),
          }}
        />
      </p>

      <button
        type="button"
        onClick={() => setMessages((currentCount) => currentCount + 1)}
      >
        {t('main.addMessage')}
      </button>

      <p>{t('main.newMessages', { count: messages })}</p>

      <p>
        {t('main.currentDate', {
          date: new Date(),
          formatParams: {
            date: {
              dateStyle: 'long',
            },
          },
        })}
      </p>

      <p>
        {t('main.incomingMessage', {
          from: sender.name,
        })}
        <br />
        {t('main.messageContents', {
          context: sender.pronouns,
          body: sender.message,
        })}
      </p>
    </section>
  );
}