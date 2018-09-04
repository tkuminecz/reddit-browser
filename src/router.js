const router = require('next-routes')

module.exports = router()
  .add('subreddit', '/subreddit/:name', '_subreddit')
  .add('thread', '/thread/:subreddit/:id', '_thread')
