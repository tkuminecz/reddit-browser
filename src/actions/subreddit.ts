import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { selector } from '#/actions'
import Subreddit from '#/models/Subreddit'

const namespace = 'subreddit'

/* load subreddit actions */

enum ActionTypes {
  LOAD = '[subreddit] LOAD',
  LOAD_SUCCESS = '[subreddit] LOAD_SUCCESS',
  LOAD_ERROR = '[subreddit] LOAD_ERROR'
}

export function loadSubreddit (name: string, before?: string, after?: string) {
  return { type: ActionTypes.LOAD, name, after, before }
}

function loadSubredditSuccess (name: string, subreddit: Subreddit, before?: string, after?: string) {
  return { type: ActionTypes.LOAD_SUCCESS, name, subreddit, after, before }
}

function loadSubredditError (name: string, error: Error) {
  return { type: ActionTypes.LOAD_ERROR, name, error }
}

type Action =
  | ReturnType<typeof loadSubreddit>
  | ReturnType<typeof loadSubredditSuccess>
  | ReturnType<typeof loadSubredditError>

/* state */

interface State {
  [name: string]: {
    [page: string]: {
      data: Error | Subreddit,
      updated: Date
    }
  }
}

const initialState: State = {}

/* selectors */

const getNs = s => s[namespace]

const getPageKey = (before: string, after: string) => `${before}_${after}`

export const getSubreddit = selector(getNs, (state: State, name: string, before: string, after: string) => {
  const page = getPageKey(before, after)
  if (state[name] != null && state[name][page] != null) {
    const data = state[name][page].data
    return (data instanceof Error) ? null : data
  } else {
    return null
  }
})

export const getSubredditIsLoading = (state: State, name: string, before: string, after: string) => {
  return getSubreddit(state, name, before, after) == null
}

/* reducers */

export const reducers = {
  [namespace]: (state: State = initialState, action: Action): State => {
    switch (action.type) {
      case ActionTypes.LOAD_SUCCESS: {
        const { before, after, subreddit } = action as any
        const page = getPageKey(before, after)
        return {
          ...state,
          [action.name]: {
            ...state[action.name],
            [page]: {
              data: subreddit,
              updated: new Date()
            }
          }
        }
      }

      case ActionTypes.LOAD_ERROR: {
        const { before, after, error } = action as any
        const page = getPageKey(before, after)
        return {
          ...state,
          [action.name]: {
            ...state[action.name],
            [page]: {
              data: error,
              updated: new Date()
            }
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
    takeEvery(ActionTypes.LOAD, loadSubredditSaga)
  ])
}

function* loadSubredditSaga (action: ReturnType<typeof loadSubreddit>) {
  const { name, before, after } = action
  const subreddit = yield select(s => getSubreddit(s, name, before, after))
  if (subreddit == null) { // load if we haven't loaded yet
    try {
      const subreddit = yield call(Subreddit.getByName, name, before, after)
      yield put(loadSubredditSuccess(name, subreddit, before, after))
    } catch (err) {
      yield put(loadSubredditError(name, err))
    }
  }
}
