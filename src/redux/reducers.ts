import { combineReducers } from 'redux'
import { reducers as subredditReducers } from '#/actions/subreddit'
import { reducers as threadReducers } from '#/actions/reddit'

export default combineReducers({
  ...subredditReducers,
  ...threadReducers
})
