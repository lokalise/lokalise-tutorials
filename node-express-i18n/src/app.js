import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import indexRouter from './routes/index.js';
import { setLanguage } from './middleware/setLanguageMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.json'),
    },
    detection: {
      order: ['querystring', 'cookie'],  // Language detection priority: query string first, then cookies
      caches: ['cookie'],  // Save the detected language in cookies
    },
    fallbackLng: 'en',
    preload: ['en', 'ru'],
  });

const app = express();
const PORT = 3000;

app.use(
  middleware.handle(i18next)
);

app.use(setLanguage);

// Set up views and view engine
app.set('views', path.join(process.cwd(), 'src/views'));
app.set('view engine', 'pug');

// Define routes
app.use('/', indexRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
