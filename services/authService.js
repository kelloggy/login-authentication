const jwt = require('jsonwebtoken');

function generateAccessToken(id) {
  return jwt.sign({ _id: id }, 
    process.env.SECRET_TOKEN,
    { expiresIn: '600s' }
  );
}

module.exports = {
  generateAccessToken
}