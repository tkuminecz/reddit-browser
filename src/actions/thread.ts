import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import Thread from '#/models/Thread'

const namespace = 'thread'

/* load thread actions */

const LOAD_THREAD = '[thread] LOAD'
const LOAD_THREAD_SUCCESS = '[thread] LOAD_SUCCESS'
const LOAD_THREAD_ERROR = '[thread] LOAD_ERROR'

export function loadThread (subreddit: string, id: string) {
  return { type: LOAD_THREAD, subreddit, id }
}

export function loadThreadSuccess (id: string, thread: Thread) {
  return { type: LOAD_THREAD_SUCCESS, id, thread }
}

export function loadThreadError (id: string, error: Error) {
  return { type: LOAD_THREAD_ERROR, id, error }
}

/* state */

type State = {
  [page: string]: {
    data: Error | Thread,
    updated: Date
  }
}

const initialState: State = {}

/* selectors */

const getNamespace = s => s[namespace]

export const getThread = (state, id: string) => {
  const threadData = getNamespace(state).threadData
  return (threadData[id] != null)
    ? threadData[id].data
    : null
}

export const getThreadIsLoading = (state, id: string) => {
  const threadData = getNamespace(state).threadData
  return (threadData[id] != null)
    ? false
    : true
}

/* reducers */

export const reducers = {
  [namespace]: (state = initialState, action): State => {
    switch (action.type) {
      case LOAD_THREAD_SUCCESS:
        return {
          ...state,
          threadData: {
            ...state.threadData,
            [action.id]: {
              data: action.thread,
              updated: new Date()
            }
          }
        }

      case LOAD_THREAD_ERROR:
        return {
          ...state,
          threadData: {
            ...state.threadData,
            [action.id]: {
              data: action.error,
              updated: new Date()
            }
          }
        }

      default:
        return state
    }
  }
}

/* sagas */

export function* saga () {
  yield all([
    takeEvery(LOAD_THREAD, loadThreadSaga)
  ])
}

function* loadThreadSaga (action: ReturnType<typeof loadThread>) {
  const thread = yield select(s => getThread(s, action.id))
  if (thread == null) {
    try {
      const thread = yield call(Thread.getBySubredditAndId, action.subreddit, action.id)
      yield put(loadThreadSuccess(action.id, thread))
    } catch (err) {
      yield put(loadThreadError(action.id, err))
    }
  }
}
