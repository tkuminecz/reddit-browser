const { createServer } = require('http')
const HttpCache = require('http-cache')
const next = require('next')
const routes = require('./router')

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: 'src'
})
const nextHandler = routes.getRequestHandler(app)
const port = process.env.PORT || 3000
const cache = new HttpCache({ ttl: 30 })

function handler (req, res) {
  if (/^\/_next/.test(req.url)) {
    nextHandler(req, res)
  } else {
    cache(req, res, () => {
      nextHandler(req, res)
    })
  }
}

/* start the app */
app.prepare()
  .then(() => {
    createServer(handler).listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}/`)
    })
  })
  .catch(err => console.error(err))
