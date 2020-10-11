import jwt from 'jsonwebtoken'
const JWTService = {}

const config = {
  algorithm: 'RS256',
  expiresIn: '15d'
}

const jwtSecret = process.env.JWT_SECRET

JWTService.generate = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, config, function (err, token) {
      if (err) {
        return reject(err)
      }
      return resolve(token)
    })
  })
}

JWTService.decode = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, config, function (err, decoded) {
      if (err) {
        return reject(err)
      }
      return resolve(decoded)
    })
  })
}

export default JWTService
