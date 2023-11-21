const { UserService } = require('../services/index');

function isUserDataValid({ nome, email, senha, telefones }) {
  return !(!nome || !email || !senha || !telefones);
}

function formatUserData(user) {
  return {
    id: user.id,
    email: user.email,
    data_criacao: user.dataCriacao,
    data_alteracao: user.dataAtualizacao,
    ultimo_login: user.ultimoLogin,
  };
}

async function createUser(req, res, next) {
  const { email, senha } = req.body;

  if (!isUserDataValid(req.body)) {
    return next({ name: 'INVALID_DATA' });
  }

  const emailAlreadyExists = await UserService.getUserByEmail(email);
  if (emailAlreadyExists) {
    return next({ name: 'EMAIL_ALREADY_EXISTS' });
  }

  const user = await UserService.createUser(req.body);
  const token = await UserService.authenticateUser(email, senha);
  
  if (!token) {
    return next({ name: 'INVALID_LOGIN' });
  }

  const userFormated = formatUserData(...user);
  delete userFormated.email;
  return res.status(201).json({ ...userFormated, token });
}

async function login(req, res, next) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    next({ name: 'INVALID_DATA' });
  }
  const user = await UserService.getUserByEmail(email);
  const token = await UserService.authenticateUser(email, senha);
  if (!token) {
    next({ name: 'INVALID_LOGIN' });
  }
  const userFormated = formatUserData(user);
  delete userFormated.email;
  return res.status(200).json({ ...userFormated, token });
}

async function findUserById(req, res, next) {
  const { id } = req.params;
  const user = await UserService.getByUserId(Number(id));
  if (user) {
    const userFormated = formatUserData(user);
    return res.status(200).json({ ...userFormated, email: user.email });
  }
  return next({ name: 'USER_NOT_FOUND' });
}

module.exports = {
  createUser,
  login,
  findUserById,
};