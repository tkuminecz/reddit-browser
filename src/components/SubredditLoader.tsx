import * as React from 'react'
import { getSubreddit, getSubredditIsLoading, loadSubreddit } from '#/actions/reddit'
import Subreddit from '#/components/Subreddit'
import SubredditModel from '#/models/Subreddit'
import createLoader from '#/components/Loader'

export default createLoader(
  props => {
    return loadSubreddit(props.subreddit)
  },
  (state, props) => getSubreddit(state, props.subreddit),
  (state, props) => getSubredditIsLoading(state, props.subreddit),
  (s: SubredditModel) => <Subreddit data={s} />
)
