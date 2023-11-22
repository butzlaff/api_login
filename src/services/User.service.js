const bcrypt = require('bcryptjs');
const UserModel = require('../models/index');
const token = require('../auth/auth');

function validateEmail(email) {
  const regexEmail = /\S+@\S+\.\S+/;
  return regexEmail.test(email);
}

function createUser(userData) {
  const { nome, email, senha, telefones } = userData;
  const validEmail = validateEmail(email);
  if (!validEmail) {
    return null;
  }
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
  return token.createToken({ id: user.id, email: user.email });
}

module.exports = {
  createUser,
  getByUserId,
  authenticateUser,
  getUserByEmail,
};