import { all, call } from 'redux-saga/effects'
import { saga as threadSaga } from '#/actions/reddit'

export default function* rootSaga () {
  yield all([
    call(threadSaga)
  ])
}
