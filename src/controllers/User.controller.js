const { UserService } = require('../services/index');
const EmailExistsOrInvalidLogin = require('../utils/EmailAlreadyOrInvalidLogin');
const InvalidData = require('../utils/InvalidData');
const InvalidEmail = require('../utils/InvalidEmail');
const NotFound = require('../utils/NotFound');

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

async function createUser(req, res) {
  const { email, senha } = req.body;

  if (!isUserDataValid(req.body)) throw new InvalidData('Dados inválidos');
  
  const emailAlreadyExists = await UserService.getUserByEmail(email);
  
  if (emailAlreadyExists) throw new EmailExistsOrInvalidLogin('E-mail já existente');
  
  const user = await UserService.createUser(req.body);
  
  if (!user) throw new InvalidEmail('Email inválido');
  
  const token = await UserService.authenticateUser(email, senha);
  if (!token) throw new EmailExistsOrInvalidLogin('Usuário e/ou senha inválidos');

  const userFormated = formatUserData(user);
  delete userFormated.email;
  return res.status(201).json({ ...userFormated, token });
}

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    throw new InvalidData('Dados inválidos');
  }
  const user = await UserService.getUserByEmail(email);
  const token = await UserService.authenticateUser(email, senha);
  if (!token) {
    throw new EmailExistsOrInvalidLogin('Usuário e/ou senha inválidos');
  }
  const userFormated = formatUserData(user);
  delete userFormated.email;
  return res.status(200).json({ ...userFormated, token });
}

async function findUserById(req, res) {
  const { id } = req.params;
  const user = await UserService.getByUserId(Number(id));
  if (user) {
    const userFormated = formatUserData(user);
    return res.status(200).json({ ...userFormated, email: user.email });
  }
  throw new NotFound('Usuário e/ou senha inválidos');
}

module.exports = {
  createUser,
  login,
  findUserById,
};