const ErrorHandler = require('./error');

class EmailExistsOrInvalidLogin extends ErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.message = message;
  }
}

module.exports = EmailExistsOrInvalidLogin;