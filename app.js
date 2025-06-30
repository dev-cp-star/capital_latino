const { initConnection } = require('./repository/connection');

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
          origin: 'http://localhost:3000',
          credentials: true,
        })
      );
    }

    if (process.env.NODE_ENV === 'production') {
      app.use(
        helmet({
          contentSecurityPolicy: {
            directives: {
              ...helmet.contentSecurityPolicy.getDefaultDirectives(),
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              imgSrc: ["'self'", 'data:'],
              connectSrc: ["'self'"],
              fontSrc: ["'self'"],
              objectSrc: ["'none'"],
              upgradeInsecureRequests: [],
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
      console.log('Server Running');
    });
  })
  .catch((err) => {
    console.log('Error with DB connection -> ', err);
  });
