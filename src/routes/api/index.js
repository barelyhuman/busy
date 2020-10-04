import context from 'lib/context'

const handler = async (req, res) => {
  return res.send({ staus: 'up' })
}

export default context(handler)
