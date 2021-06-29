import * as React from 'react';

import {Trans, useTranslation} from 'gatsby-plugin-react-i18next';

const About = () => {
    useTranslation();
    return (
        <main>
        <h1><Trans>About Page</Trans></h1>
        <p><Trans>This is a demo for Localization using Gatsby</Trans></p>
      </main>
    )
  }
  
  export default About;
  
//   export const query = graphql`
//   query($language: String!) {
//     locales: allLocale(filter: {language: {eq: $language}}) {
//       edges {
//         node {
//           ns
//           data
//           language
//         }
//       }
//     }
//   }
// `;


export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {ns: {in: ["common", "index"]}, language: {eq: $language}}) {
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