const { getPayload } = require('../auth/auth');
const { UserService } = require('../services');

function extractToken(bearerToken) {
  const token = bearerToken.split(' ')[0];
  if (token !== 'Bearer') {
    return bearerToken;
  }
  return bearerToken.split(' ')[1];
}

async function validateJwt(req, res, next) {
  try {
    const bearerToken = req.header('Authorization'); // Auth => { token } 
    const token = extractToken(bearerToken); // token => '' || null || undefined 
    if (!token && !bearerToken) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = getPayload(token);

    const user = await UserService.getByUserId(payload.data.id);

    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    req.user = user.dataValues;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}

module.exports = validateJwt;