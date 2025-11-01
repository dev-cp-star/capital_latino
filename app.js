const { initConnection } = require('./db/connection');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

initConnection()
  .then(() => {
    const express = require('express');

    const app = express();
    const cors = require('cors');
    const helmet = require('helmet');
    const logger = require('morgan');

    if (process.env.NODE_ENV === 'development') {
      app.use(
        cors({
          origin: 'http://localhost:5173', //5173
          credentials: true,
        })
      );
    }

    if (process.env.NODE_ENV === 'production') {
      app.use(
        helmet({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: [
                "'self'",
                'blob:',
                '*.mongodb.com',
                '*.google.com',
                '*.googleapis.com',
                'calendly.com',
                '*.calendly.com',
              ],
            },
          },
          crossOriginEmbedderPolicy: false,
          crossOriginResourcePolicy: {
            policy: 'cross-origin',
          },
          crossOriginOpenerPolicy: {
            policy: 'unsafe-none',
          },
        })
      );
    }

    app.use(logger('dev'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const router = require('./routes');

    router(app);

    const PORT_APP = process.env.PORT || 3000;
    app.listen(PORT_APP, () => {
      console.error('╔══════════════════════╗');
      console.error('║    SERVER RUNNING    ║');
      console.error('╚══════════════════════╝');
    });
  })
  .catch((err) => {
    console.error('Error launching app -> ', err);
  });
