import getDB from 'lib/get-db'
import ResponseError from 'lib/response-error'

export default (handler) => {
  return async (req, res) => {
    try {
      const db = getDB()
      req.db = db
      await handler(req, res)
      db.destroy()
    } catch (err) {
      console.error(err)
      if (err instanceof ResponseError) {
        res.status(err.code)
        return res.send({
          message: err.message,
          stack: err.stack
        })
      } else {
        res.status(500)
        return res.send({
          message: 'Oops something went wrong',
          stack: String(err)
        })
      }
    }
  }
}
