const { getPayload } = require('../auth/auth');
const UserService = require('../models/index');
const EmailExistsOrInvalidLogin = require('../utils/EmailAlreadyOrInvalidLogin');

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
      throw new EmailExistsOrInvalidLogin('Não autorizado');
    }

    req.user = user;

    next();
  } catch (error) {
    throw new EmailExistsOrInvalidLogin('Sessão inválida');
  }
}

module.exports = validateJwt;