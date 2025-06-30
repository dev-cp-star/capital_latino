module.exports = (app) => {
  app.use('/api/beta', require('./beta'));
};
