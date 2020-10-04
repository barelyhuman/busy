import app from 'ftrouter'
import http from 'http'
import path from 'path'
import bodyParser from 'body-parser'
import runMiddleware from 'lib/server/run-middleware'

const PORT = process.env.PORT || 3000

app({
  basePath: path.join(__dirname, 'routes')
}).then((appHandler) => {
  http.createServer(async (req, res) => {
    await runMiddleware(req, res, bodyParser.json())
    return appHandler(req, res)
  }).listen(PORT, () => {
    console.log('Listening on, ' + PORT)
  })
})
