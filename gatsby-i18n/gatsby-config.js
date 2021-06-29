module.exports = {
  siteMetadata: {
    title: "Gatsby_Localization",
  },
  plugins: [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/locales`,
      name: `locale`
    }
  },
  {
    resolve: `gatsby-plugin-react-i18next`,
    options: {
      localeJsonSourceName: `locale`,
      languages: [`en`, `fr`, `ar`],
      defaultLanguage: `en`,
      siteUrl: `http://localhost:8000/`,
      i18nextOptions: {
        interpolation: {
          escapeValue: false
        },
        keySeparator: false,
        nsSeparator: false
      }
    }
  }
  ],
};

