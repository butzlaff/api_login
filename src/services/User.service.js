const bcrypt = require('bcryptjs');
const UserModel = require('../models/index');
const createUserAuthenticated = require('../utils/createUserAuthenticated');

async function createUser({ nome, email, senha, telefones }) {
  const user = await UserModel.createUser({ nome, email, senha, telefones });
  if (user instanceof Error) {
    return { status: 400, data: { mensagem: 'E-mail já existente' } };
  }
  const userAuthenticated = createUserAuthenticated(user);
  return { status: 201, data: userAuthenticated };
}

async function getByUserId(id) {
  const user = await UserModel.getByUserId(id);
  return user;
}

async function getUserByEmail({ email, senha }) {
  const user = await UserModel.getUserByEmail({ email });
  if (user && bcrypt.compareSync(senha, user.senha)) {
    const userAuthenticated = createUserAuthenticated(user);
    return { status: 200, data: userAuthenticated };
  }
  return { status: 401, data: { mensagem: 'Usuário e/ou senha inválidos' } };
}

module.exports = {
  createUser,
  getByUserId,
  getUserByEmail,
};