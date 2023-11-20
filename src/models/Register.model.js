import { prisma } from '../lib/prisma.js';

async function createUser({nome, email, senha, telefones}) {
  const user = await prisma.user.create({
    data: {
      nome,
      email,
      senha,
      telefones
    }
  }
);
  return user;
}

module.exports = {
  createUser
};