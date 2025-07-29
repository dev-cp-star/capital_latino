const express = require('express');
const path = require('path');

module.exports = (app) => {
  app.use('/api/user', require('./users'));

  const clientPath = path.join(__dirname, '..', 'client');

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(clientPath));

    app.use((req, res) => {
      if (req.method !== 'GET') {
        return res.status(404).json({ msg: 'Resource not found' });
      }
      res.type('html').sendFile(path.join(clientPath, 'index.html'));
    });
  } else {
    app.use((req, res) => {
      res.status(404).json({ msg: 'Resource not found' });
    });
  }
};
