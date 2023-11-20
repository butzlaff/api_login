const { UserService } = require('../services/index');

async function createUser(req, res) {
  const { nome, email, senha, telefones } = req.body;

  const { status, data } = await UserService.createUser({ nome, email, senha, telefones });
  return res.status(status).json(data);
}

async function login(req, res) {
  const { email, senha } = req.body;

  const { status, data } = await UserService.getUserByEmail({ email, senha });
  return res.status(status).json(data);
}

async function findUserById(req, res) {
  const { id } = req.params;
  const { status, data } = await UserService.getByUserId(id);
  return res.status(status).json(data);
}

async function findAllUsers(_req, res) {
  const { status, data } = await UserService.findAllUsers();
  return res.status(status).json(data);
}

module.exports = {
  createUser,
  login,
  findUserById,
  findAllUsers,
};