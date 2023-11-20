const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seuSegredoSecreto';
const jwtConfig = { algorithm: 'HS256', expiresIn: '7d' };

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const getPayload = (token) => jwt.verify(token, secret);

module.exports = { createToken, getPayload };