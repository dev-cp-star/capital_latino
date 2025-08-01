class FormNotAvailable extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'FormNotAvailable';
  }
}

module.exports = { FormNotAvailable };
