const ErrorHandler = require('./error');

class NotFound extends ErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = message;
  }
}

module.exports = NotFound;