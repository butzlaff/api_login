const { getPayload } = require('../auth/auth');
const UserService = require('../models/index');

function extractToken(bearerToken) {
  const token = bearerToken.split(' ')[0];
  if (token !== 'Bearer') {
    return bearerToken;
  }
  return bearerToken.split(' ')[1];
}

async function validateJwt(req, res, next) {
  try {
    const bearerToken = req.header('Authorization');
    const token = extractToken(bearerToken);

    const { id, email } = getPayload(token);
    const user = await UserService.getByUserId(id);

    if (!user || user.email !== email) {
      return res.status(401).json({ messagem: '{ "mensagem": "Não autorizado" } ' });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Sessão inválida' });
  }
}

module.exports = validateJwt;