const { createToken } = require('../auth/auth');

function createUserAuthenticated(user) {
  const token = createToken({ id: user.id });
  const { senha: _password, ...userWithoutPassword } = user;
  return { ...userWithoutPassword, token };
}

module.exports = createUserAuthenticated;