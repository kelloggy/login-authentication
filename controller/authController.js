const express = require('express');
const { res, req, next } = express;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user')
const RefreshToken = require('../model/refreshToken')
const userErrors = require('./userController');
const { generateAccessToken } = require('../services/authService');
require('dotenv/config');

const authErrors = {
  UNAUTHORIZED: "Unauthorized",
  INVALID_TOKEN: "Invalid token",
  INVALID_PASSWORD: "Invalid password"
}

async function passwordLogin ( req, res, next ){
  try {
    const { username, password } = req.body;
    const checkUserExist = await User.findOne({
      username: username
    })
    if (!checkUserExist) {
      throw new Error(userErrors.userErrors.USER_NOT_FOUND);
    }

    const isPasswordCorrect = await bcrypt.compare(password, checkUserExist.password)
    if(!isPasswordCorrect) {
     return res.status(400).json(authErrors.INVALID_PASSWORD);
    }
  
    const jwtAccessToken = generateAccessToken(checkUserExist._id)
    const refreshToken = jwt.sign({ _id: checkUserExist._id }, process.env.REFRESH_TOKEN );
    const createdRefreshToken = new RefreshToken({
      token: refreshToken
    })
    await createdRefreshToken.save()

    return res.status(200).json({accessToken: jwtAccessToken, refreshToken: refreshToken})
  } catch (error) {
    res.status(400).send(error.message)
    next(error);
  }
}

async function checkJwtToken (req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).send(authErrors.UNAUTHORIZED);
    };    
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
      return res.status(401).send(authErrors.UNAUTHORIZED)
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, payload) => {
      if(err) {
        const errorMessage = err.name === 'JsonWebTokenError' ? authErrors.UNAUTHORIZED : err.message;
        return res.status(400).send(errorMessage) 
      }
      req.user = payload;
      next();
    });
}

async function token (req, res, next) {
  const refreshToken = req.body.token;
  if(refreshToken == null) { return res.status(401).send(authErrors.INVALID_TOKEN) };

  const checkRefreshTokenExist = await RefreshToken.findOne({
    token: refreshToken
  })
  if(!checkRefreshTokenExist){
    return res.status(403).send(authErrors.UNAUTHORIZED)
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if(err) {
      return res.status(403).send(authErrors.UNAUTHORIZED)
    }
    const accessToken = generateAccessToken(user._id);
    return res.status(200).json({ accessToken: accessToken })
  })
}

async function logout (req, res, next) {

  const token = req.body.token;
  await RefreshToken.deleteOne({ token: token });
  

  return res.status(204);

}


module.exports = {
  passwordLogin,
  checkJwtToken,
  token,
  logout
}
