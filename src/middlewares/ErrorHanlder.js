const mapErrorHandler = (error) => {
  switch (error.name) {
    case 'INVALID_DATA':
      return { status: 400, message: 'Dados inválidos' };
    case 'USER_NOT_FOUND':
      return { status: 404, message: 'Usuário não encontrado' };
    case 'EMAIL_ALREADY_EXISTS':
      return { status: 401, message: 'E-mail já existente' };
    case 'INVALID_LOGIN':
     return { status: 401, message: 'Usuário e/ou senha inválidos' };
    default:
      return { status: 500, message: 'Erro interno' };  
  }
};

const ErrorHandler = (err, _req, res, _next) => {
    const errReturn = mapErrorHandler(err);
    res.status(errReturn.status).json({
        mensagem: errReturn.message,
    });
};

module.exports = { ErrorHandler };