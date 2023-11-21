const prisma = require('../lib/prisma.js');
const bcrypt = require('bcryptjs');

async function createUser({nome, email, senha, telefones}) {
  try {
    const user = await prisma.$transaction([
      prisma.tb_user.create({
        data: {
          nome,
          email,
          senha: bcrypt.hashSync(senha, 10),
          telefones: {
            create: telefones
          }
        }
      })
    ]);
    return user;
  } catch (error) {
    return error
  }
}

async function getByUserId(id) {
  try {
    const user = await prisma.tb_user.findUnique({
      where: {
        id,
      }
    });
    return user;
  } catch (error) {
    return error
  }
}

async function getUserByEmail(email) {
  const user = await prisma.tb_user.findUnique({
    where: {
      email
    }
  });
  return user;
}

async function updateUser(id, data) {
  const user = await prisma.$transaction([
    prisma.tb_user.update({
      where: {
        id
      },
      data
    })
  ]);
  console.log(...user)
  return user;
}

module.exports = {
  createUser,
  getByUserId,
  getUserByEmail,
  updateUser
};