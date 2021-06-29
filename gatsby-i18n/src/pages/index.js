
import React from 'react';
import { graphql } from 'gatsby'
import Header from './header';
import {Trans, useTranslation} from 'gatsby-plugin-react-i18next';
import moment from 'moment'; // require

const IndexPage = () => {

  const { t } = useTranslation();
  const date1 = moment(new Date()).format('DD-MM-YYYY');
  const date2 = moment(new Date()).format('DD/MM/YYYY');
  
  return (  
    <main>
      <h1><Header></Header></h1>
      <h1><Trans>Welcome to my Gatsby site!</Trans></h1>
      <p><Trans>My name is Shanika</Trans></p>
      <p><Trans>My profession is SSE</Trans></p>
      <p>{t('message')}</p>
      <p>{t("date_format_one", {date1})}</p>
      <p>{t("date_format_two", {date2})}</p>
    </main>
  )
};

export default IndexPage;


export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;