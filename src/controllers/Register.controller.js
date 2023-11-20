
async function createUser(req, res) {
  const { nome, email, senha, telefones } = req.body;

  const { status, data } = await model.createUser({ nome, email, senha, telefones });
  return res.status(status).json(data);
}