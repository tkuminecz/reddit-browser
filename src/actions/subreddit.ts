import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import Subreddit from '#/models/Subreddit'

const namespace = Symbol('subreddit').toString()

/* load subreddit actions */

const LOAD_SUBREDDIT = '[subreddit] LOAD'
const LOAD_SUBREDDIT_SUCCESS = '[subreddit] LOAD_SUCCESS'
const LOAD_SUBREDDIT_ERROR = '[subreddit] LOAD_ERROR'

export function loadSubreddit (name: string, before?: string, after?: string) {
  return { type: LOAD_SUBREDDIT, name, after, before }
}

export function loadSubredditSuccess (name: string, subreddit: Subreddit, before?: string, after?: string) {
  return { type: LOAD_SUBREDDIT_SUCCESS, name, subreddit, after, before }
}

export function loadSubredditError (name: string, error: Error) {
  return { type: LOAD_SUBREDDIT_ERROR, name, error }
}

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

const getNamespace = s => s[namespace]

const getPageKey = (before: string, after: string) => `${before}_${after}`

export function getSubreddit (state, name: string, before: string, after: string) {
  const subredditData = getNamespace(state).subredditData
  const key = getPageKey(before, after)
  return (subredditData[name] != null && subredditData[name][key] != null)
    ? subredditData[name][key].data
    : null
}

export function getSubredditIsLoading (state, name: string, before: string, after: string) {
  const subredditData = getNamespace(state).subredditData
  const key = getPageKey(before, after)
  return (subredditData[name] != null && subredditData[name][key] != null)
    ? false
    : true
}

/* reducers */

export const reducers = {
  [namespace]: (state = initialState, action): State => {
    switch (action.type) {
      case LOAD_SUBREDDIT_SUCCESS:
        return {
          ...state,
          subredditData: {
            ...state.subredditData,
            [action.name]: {
              ...state.subredditData[action.name],
              [getPageKey(action.before, action.after)]: {
                data: action.subreddit,
                updated: new Date()
              }
            }
          }
        }

      case LOAD_SUBREDDIT_ERROR:
        return {
          ...state,
          subredditData: {
            ...state.subredditData,
            [action.name]: {
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
    takeEvery(LOAD_SUBREDDIT, loadSubredditSaga)
  ])
}

function* loadSubredditSaga (action: ReturnType<typeof loadSubreddit>) {
  const subreddit = yield select(s => getSubreddit(s, action.name, action.before, action.after))
  if (subreddit == null) {
    try {
      const subreddit = yield call(Subreddit.getByName, action.name, action.before, action.after)
      yield put(loadSubredditSuccess(action.name, subreddit, action.before, action.after))
    } catch (err) {
      yield put(loadSubredditError(action.name, err))
    }
  }
}
