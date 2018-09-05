import { combineReducers } from 'redux'
import { reducers as redditReducers } from '#/actions/reddit'
import { reducers as subredditReducers } from '#/actions/subreddit'
import { reducers as threadReducers } from '#/actions/thread'

export default combineReducers({
  ...redditReducers,
  ...subredditReducers,
  ...threadReducers
})
