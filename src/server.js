const { createServer } = require('http')
const next = require('next')
const routes = require('./router')

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: 'src'
})
const handler = routes.getRequestHandler(app)
const port = process.env.PORT || 3000

app.prepare()
  .then(() => {
    createServer(handler).listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}/`)
    })
  })
  .catch(err => console.error(err))
