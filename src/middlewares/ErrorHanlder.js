const errorMessages = {
  INVALID_EMAIL: { status: 409, message: 'Email inválido' },
  INVALID_DATA: { status: 400, message: 'Dados inválidos' },
  USER_NOT_FOUND: { status: 404, message: 'Usuário não encontrado' },
  EMAIL_ALREADY_EXISTS: { status: 401, message: 'E-mail já existente' },
  INVALID_LOGIN: { status: 401, message: 'Usuário e/ou senha inválidos' },
};

const mapErrorHandler = (error) => {
  const defaultError = { status: 500, message: 'Erro interno' };
  return errorMessages[error.name] || defaultError;
};

const ErrorHandler = (err, _req, res, _next) => {
    const errReturn = mapErrorHandler(err);
    res.status(errReturn.status).json(`mensagem '${errReturn.message}'`);
};

module.exports = { ErrorHandler };