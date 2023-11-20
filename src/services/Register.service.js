const model = require('../models/index');

async function createUser ({nome, email, senha, telefones}) {
  const user = await model.createUser({nome, email, senha, telefones});
  return { status: 201, data: user };
}

module.exports = {
  createUser
}