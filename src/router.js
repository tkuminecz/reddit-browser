const router = require('next-routes')

module.exports = router()
  .add('home', '/', 'index')
  .add('subreddit', '/subreddit/:name', '_subreddit')
  .add('thread', '/thread/:subreddit/:id', '_thread')
