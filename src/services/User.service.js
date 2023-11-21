const bcrypt = require('bcryptjs');
const UserModel = require('../models/index');
const { createToken } = require('../auth/auth');

function createUser({ nome, email, senha, telefones }) {
  // criar validacoes
  return UserModel.createUser({ nome, email, senha, telefones });
}

async function getByUserId(id) {
  const user = await UserModel.getByUserId(id);
  if (user) {
    return user;
  }

  return null;
}

function getUserByEmail(email) {
  if (!email) {
    return null;
  }
  return UserModel.getUserByEmail(email);
}

async function authenticateUser(email, senha) {
  const userExists = await getUserByEmail(email);
  if (!userExists || !bcrypt.compareSync(senha, userExists.senha)) {
    return null;
  }
  const user = await UserModel.updateUser(userExists.id, { ultimoLogin: new Date() });
  return createToken(...user);
}

module.exports = {
  createUser,
  getByUserId,
  authenticateUser,
  getUserByEmail,
};