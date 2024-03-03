import jwt from  'jsonwebtoken'

export function generateAccessToken(id) {
  return jwt.sign({ _id: id }, 
    process.env.SECRET_TOKEN,
    { expiresIn: '600s' }
  );
}