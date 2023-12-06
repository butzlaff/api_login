const ErrorHandler = require('./error');

class InvalidEmail extends ErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = message;
  }
}

module.exports = InvalidEmail;