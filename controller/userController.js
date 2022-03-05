const express = require('express')
const { res, req, next } = express;
const bcrypt = require('bcrypt');
const User = require('../model/user')

const userErrors = {
    USER_ALREADY_EXIST:'Username already existed.',
    USER_NOT_FOUND: 'User not found'
}

async function postUser ( req, res, next ){
  try {
    const userInfo = req.body;
    const checkUsernameExist = await User.findOne({
        username: userInfo.username
    })
    if(checkUsernameExist) {
        throw new Error(userErrors.USER_ALREADY_EXIST);
    }

    const hashedPassword = await bcrypt.hash(userInfo.password, 10)
    const user = new User({
      username: userInfo.username,
      password: hashedPassword
    });
    const createdUser = await user.save();

    return res.status(200).json(createdUser);
  } catch (error) {
    res.status(400).send(error.message)
    next(error);
  }
}

async function getUsers ( req, res, next ){
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message)
    next(error);
  }
}

module.exports = {
  postUser,
  getUsers,
  userErrors
};



