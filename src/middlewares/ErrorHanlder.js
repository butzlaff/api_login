// const errorMessages = {
  //   INVALID_DATA: { status: 400, message: 'Dados inválidos' },
  //   EMAIL_ALREADY_EXISTS: { status: 401, message: 'E-mail já existente' },
  //   INVALID_LOGIN: { status: 401, message: 'Usuário e/ou senha inválidos' },
  //   USER_NOT_FOUND: { status: 404, message: 'Usuário não encontrado' },
  //   INVALID_EMAIL: { status: 409, message: 'Email inválido' },
// };

// const mapErrorHandler = (error) => {
//   const defaultError = { status: 500, message: 'Erro interno' };
//   return errorMessages[error.name] || defaultError;
// };

// const ErrorHandler = (err, _req, res, _next) => {
//     const errReturn = mapErrorHandler(err);
//     res.status(errReturn.status).json(`mensagem '${errReturn.message}'`);
// };

const ErrorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Internal Server Error';
  return res.status(statusCode).json({ mensagem: message });
};

module.exports = { ErrorHandler };