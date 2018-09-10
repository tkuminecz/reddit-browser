import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { getAge, selector } from '#/actions'
import config from '#/config'
import Thread from '#/models/Thread'

const namespace = 'thread'

/* load thread actions */

enum ActionTypes {
  LOAD = '[thread] LOAD',
  LOAD_SUCCESS = '[thread] LOAD_SUCCESS',
  LOAD_ERROR = '[thread] LOAD_ERROR'
}

export function loadThread (subreddit: string, id: string) {
  return { type: ActionTypes.LOAD, subreddit, id }
}

function loadThreadSuccess (id: string, thread: Thread) {
  return { type: ActionTypes.LOAD_SUCCESS, id, thread }
}

function loadThreadError (id: string, error: Error) {
  return { type: ActionTypes.LOAD_ERROR, id, error }
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

const getThreadUpdated = selector(getNamespace, (state: State, id: string) => {
  return (state[id] != null)
    ? state[id].updated
    : null
})

export const getThreadIsLoading = (state: State, id: string) => {
  return getThread(state, id) == null
}

/* reducers */

export const reducers = {
  [namespace]: (state: State = initialState, action): State => {
    switch (action.type) {
      case ActionTypes.LOAD_SUCCESS:
        return {
          ...state,
          [action.id]: {
            data: action.thread,
            updated: new Date()
          }
        }

      case ActionTypes.LOAD_ERROR:
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
    takeEvery(ActionTypes.LOAD, loadThreadSaga)
  ])
}

function* loadThreadSaga (action: ReturnType<typeof loadThread>) {
  const { id, subreddit } = action
  const thread = yield select(s => getThread(s, id))
  const updated = yield select(s => getThreadUpdated(s, id))
  const age = updated ? getAge(updated) : 0

  if (thread == null || age >= config.redux.cacheTTL) {
    try {
      const thread = yield call(Thread.getBySubredditAndId, subreddit, id)
      yield put(loadThreadSuccess(id, thread))
    } catch (err) {
      yield put(loadThreadError(id, err))
    }
  }
}
