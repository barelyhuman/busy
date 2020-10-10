import TeamsController from 'controllers/teams'
import context from 'lib/context'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    return TeamsController.create({ req, res })
  } else if (req.method === 'GET') {
    return TeamsController.get({ req, res })
  }
  res.status(404)
  return res.end()
}

export default context(handler)
