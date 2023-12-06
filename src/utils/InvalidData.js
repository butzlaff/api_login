const ErrorHandler = require('./error');

class InvalidData extends ErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = message;
  }
}

module.exports = InvalidData;