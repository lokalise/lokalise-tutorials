import { useLocation, useNavigate, useParams } from 'react-router';

import {
  fallbackLanguage,
  isSupportedLanguage,
  languages,
  type LanguageCode,
} from '../i18n/languages';

export function LanguageSwitcher() {
  const { lng } = useParams<{ lng: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLanguage = isSupportedLanguage(lng)
    ? lng
    : fallbackLanguage;

  const handleLanguageChange = (languageCode: LanguageCode) => {
    const pathParts = location.pathname.split('/');

    pathParts[1] = languageCode;

    navigate(`${pathParts.join('/')}${location.search}${location.hash}`);
  };

  return (
    <nav aria-label="Language switcher">
      <ul
        style={{
          display: 'flex',
          gap: '0.5rem',
          padding: 0,
          listStyle: 'none',
        }}
      >
        {languages.map((language) => {
          const isActive = currentLanguage === language.code;

          return (
            <li key={language.code}>
              <button
                type="button"
                onClick={() => handleLanguageChange(language.code)}
                aria-pressed={isActive}
                disabled={isActive}
              >
                {language.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}