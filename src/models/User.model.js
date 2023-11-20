const prisma = require('../lib/prisma.js');
const bcrypt = require('bcryptjs');

async function createUser({nome, email, senha, telefones}) {
  try {
    const user = await prisma.tb_user.create({
      data: {
        nome,
        email,
        senha: bcrypt.hashSync(senha, 10),
        telefones: {
          create: telefones
        }
       }
    });
    return user;
  } catch (error) {
    return error
  }
}

async function getByUserId(id) {
  const user = await prisma.tb_user.findUnique({
    where: {
      id
    }
  });
  return user;
}

async function getUserByEmail({ email }) {
  const user = await prisma.tb_user.findUnique({
    where: {
      email
    }
  });
  return user;
}

module.exports = {
  createUser,
  getByUserId,
  getUserByEmail
};