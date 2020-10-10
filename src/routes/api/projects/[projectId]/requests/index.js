import RequestsController from 'controllers/requests'
import context from 'lib/context'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    return RequestsController.create({ req, res })
  }
  res.status(404)
  return res.end()
}

export default context(handler)
