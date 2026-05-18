import { NavLink, useParams } from 'react-router';

import {
  fallbackLanguage,
  isSupportedLanguage,
} from '../i18n/languages';

export function MainNavigation() {
  const { lng } = useParams<{ lng: string }>();

  const currentLanguage = isSupportedLanguage(lng)
    ? lng
    : fallbackLanguage;

  return (
    <nav aria-label="Main navigation">
      <ul
        style={{
          display: 'flex',
          gap: '0.75rem',
          padding: 0,
          listStyle: 'none',
        }}
      >
        <li>
          <NavLink
            to={`/${currentLanguage}/home`}
            style={({ isActive }) => ({
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`/${currentLanguage}/dashboard`}
            style={({ isActive }) => ({
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}