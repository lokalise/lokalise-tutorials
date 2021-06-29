import {Link, useI18next} from 'gatsby-plugin-react-i18next';
import React from 'react';


const Header = ({title}) => {
  const {languages, changeLanguage} = useI18next();

  return (
    <header className="main-header">
      <h1 style={{margin: 0}}>
        <Link to="/" >{title}</Link>
      </h1>
      <ul className="languages">
        {languages.map((lng) => (
          <li key={lng}>
            <a
              href="/"
              onClick={() => {
                changeLanguage(lng);
              }}>
              {lng}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
