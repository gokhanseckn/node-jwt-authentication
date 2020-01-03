const expressJwt = require('express-jwt');
const config = require('../config/jwt.config.json');

const jwt = () => {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate',
      '/users/register',
    ],
  });
};

module.exports = jwt;
