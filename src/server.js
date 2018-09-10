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

/* start the app */
app.prepare()
  .then(() => {
    createServer(nextHandler).listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}/`)
    })
  })
  .catch(err => console.error(err))
