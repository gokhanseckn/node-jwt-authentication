const express = require('express');
const userService = require('../services/users.service');

const router = express.Router();

const authenticate = async (req, res, next) => {
  try {
    const user = await userService.authenticate(req.body);
    return user
      ? res.json(user)
      : res.status(400).json({ message: 'Username or password is incorrect!' });
  } catch (error) {
    return next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    return user ? res.json(user) : res.status(400).json({ message: 'Error' });
  } catch (error) {
    return next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.body.id);
    return user ? res.json(user) : res.status(404).json({ message: 'User not found!' });
  } catch (error) {
    return next(error);
  }
};

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/getAll', getAll);
router.get('/getById', getById);
module.exports = router;
