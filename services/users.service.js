const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config.json');
const model = require('../models');

const userModel = model.user;

const authenticate = ({ username, pass }) => {
  const user = userModel.findOne({
    where: {
      password: pass,
    },
  });
  if (user) {
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: '1h',
    });
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      username,
      token,
    };
  }
  return null;
};

const register = async ({ username, password }) => {
  const user = await userModel.create({
    username,
    password,
  });
  if (user) return user;
  return null;
};

const getAll = () => userModel.findAll({ attributes: { exclude: ['password'] } });

const getById = async (id) => {
  const user = await userModel.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) return null;
  return user;
};

module.exports = {
  authenticate,
  register,
  getAll,
  getById,
};
