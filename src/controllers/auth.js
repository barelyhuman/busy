import randomString from 'lib/random-token'
import ResponseError from 'lib/response-error'

const AuthController = {}

AuthController.registration = async ({ req, res }) => {
  let trx
  try {
    const { db } = req
    const payload = req.body
    const { tokenName, email } = payload
    const token = randomString()
    const tokenPair = randomString()
    trx = await db.transaction()

    if (!email) {
      return new ResponseError({ code: 400, message: 'Please enter an email' })
    }

    if (!tokenName) {
      return new ResponseError({
        code: 400,
        message: 'You forgot to generate a tokenName'
      })
    }

    const normalizeEmail = email.toLowerCase().trim()

    const insertion = await trx('tokens')
      .insert({
        token_name: tokenName,
        email: normalizeEmail,
        token: token,
        is_verified: false,
        token_pair: tokenPair
      })
      .returning(['token'])

    sendEmail({
      msg: `Login Verification - Busy (${tokenPair})`,
      to: normalizeEmail,
      body: `
      Hey, 
      We recieved a request on Busy for your login.
      To accept your login request please click on the link below.
      ${process.env.SOURCE_URL}/confirm?token=${tokenPair}
      `
    })

    return res.send({
      data: {
        token: insertion[0].token
      }
    })
  } catch (err) {
    await trx.rollback()
    throw err
  }
}

AuthController.accept = async ({ req, res }) => {
  let trx
  try {
    const { db } = req
    const { token, email } = req.query
    trx = await db.transaction()
    const tokenMatch = await trx('tokens').where({
      token_pair: token,
      email: email,
      is_active: true
    })

    if (!tokenMatch.length) {
      return new ResponseError({
        code: 400,
        message: 'Invalid Verification URL'
      })
    }

    if (tokenMatch[0].is_verified) {
      return new ResponseError({
        code: 400,
        message: 'You cannot use the same verification url more than once'
      })
    }

    await trx('tokens')
      .update('is_verified', true)
      .where({
        token_pair: token,
        email: email
      })
      .returning(['id'])

    return res.send({
      message: 'Accepted'
    })
  } catch (err) {
    await trx.rollback()
    throw err
  }
}

AuthController.verify = async () => {
  // Check verification status for login
  // Poll Token status and if updated,
  // send a jwt and then then turn the token is_active to false
}

export default AuthController
