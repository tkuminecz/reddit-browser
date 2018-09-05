import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { selector } from '#/actions'
import Thread from '#/models/Thread'

const namespace = 'thread'

/* load thread actions */

const LOAD = '[thread] LOAD'
const LOAD_THREAD_SUCCESS = '[thread] LOAD_SUCCESS'
const LOAD_THREAD_ERROR = '[thread] LOAD_ERROR'

export function loadThread (subreddit: string, id: string) {
  return { type: LOAD, subreddit, id }
}

function loadThreadSuccess (id: string, thread: Thread) {
  return { type: LOAD_THREAD_SUCCESS, id, thread }
}

function loadThreadError (id: string, error: Error) {
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

export const getThread = selector(getNamespace, (state: State, id: string) => {
  if (state[id] != null) {
    const data = state[id].data
    return (data instanceof Error) ? null : data
  } else {
    return null
  }
})

export const getThreadIsLoading = (state: State, id: string) => {
  return getThread(state, id) == null
}

/* reducers */

export const reducers = {
  [namespace]: (state = initialState, action): State => {
    switch (action.type) {
      case LOAD_THREAD_SUCCESS:
        return {
          ...state,
          [action.id]: {
            data: action.thread,
            updated: new Date()
          }
        }

      case LOAD_THREAD_ERROR:
        return {
          ...state,
          [action.id]: {
            data: action.error,
            updated: new Date()
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
    takeEvery(LOAD, loadThreadSaga)
  ])
}

function* loadThreadSaga (action: ReturnType<typeof loadThread>) {
  const { id, subreddit } = action
  const thread = yield select(s => getThread(s, id))
  if (thread == null) {
    try {
      const thread = yield call(Thread.getBySubredditAndId, subreddit, id)
      yield put(loadThreadSuccess(id, thread))
    } catch (err) {
      yield put(loadThreadError(id, err))
    }
  }
}
