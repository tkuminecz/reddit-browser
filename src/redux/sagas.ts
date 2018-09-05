import { all, call } from 'redux-saga/effects'
import { saga as redditSaga } from '#/actions/reddit'
import { saga as subredditSaga } from '#/actions/subreddit'
import { saga as threadSaga } from '#/actions/thread'

export default function* rootSaga () {
  yield all([
    call(redditSaga),
    call(subredditSaga),
    call(threadSaga)
  ])
}
