import * as React from 'react'
import { getThreadIsLoading, getThread, loadThread } from '#/actions/reddit'
import createLoader from '#/components/Loader'
import Thread from '#/components/Thread'
import ThreadModel from '#/models/Thread'

export default createLoader(
  (props) => loadThread(props.subreddit, props.id),
  (state, props) => getThread(state, props.id),
  (state, props) => getThreadIsLoading(state, props.id),
  (t: ThreadModel) => <Thread thread={t} />
)
