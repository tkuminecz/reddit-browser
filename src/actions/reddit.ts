import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import SubredditList from '#/models/SubredditList'
import { getAge, selector } from '#/actions'

const namespace = 'reddit'

/* load subreddit list actions */

enum ActionTypes {
  LOAD = '[subreddit-list] LOAD',
  LOAD_SUCCESS = '[subreddit-list] LOAD_SUCCESS',
  LOAD_ERROR = '[subreddit-list] LOAD_ERROR'
}

export function loadSubredditList (before?: string, after?: string) {
  return { type: ActionTypes.LOAD, before, after }
}

function loadSubredditListSuccess (list: SubredditList, before?: string, after?: string) {
  return { type: ActionTypes.LOAD_SUCCESS, list, before, after }
}

function loadSubredditListError (error: Error) {
  return { type: ActionTypes.LOAD_ERROR, error }
}

/* state */

interface State {
  [page: string]: {
    data: Error | SubredditList,
    updated: Date
  }
}

const initialState: State = {}

/* selectors */

const getNs = (state) => state[namespace]

const getPageKey = (before: string, after: string) => `${before}_${after}`

export const getSubredditList = selector(getNs, (state: State, before: string, after: string) => {
  const pageKey = getPageKey(before, after)
  if (state[pageKey] != null) {
    const data = state[pageKey].data
    return (data instanceof Error) ? null : data
  } else {
    return null
  }
})

export const getSubredditListUpdated = selector(getNs, (state: State, before: string, after: string) => {
  const pageKey = getPageKey(before, after)
  return (state[pageKey] != null)
    ? state[pageKey].updated
    : null
})

export const getSubredditListIsLoading = (state: State, before: string, after: string) => {
  return getSubredditList(state, before, after) == null
}

/* reducers */

export const reducers = {
  [namespace]: (state: State = initialState, action): State => {
    switch (action.type) {
      case ActionTypes.LOAD_SUCCESS:
        return {
          ...state,
          [getPageKey(action.before, action.after)]: {
            data: action.list,
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
    takeEvery(ActionTypes.LOAD, loadSubredditListSaga)
  ])
}

const THIRTY_MINS = 60 * 30

function* loadSubredditListSaga (action: ReturnType<typeof loadSubredditList>) {
  const { before, after } = action
  const list = yield select(s => getSubredditList(s, before, after))
  const updated = yield select(s => getSubredditListUpdated(s, before, after))
  const age = getAge(updated)

  if (list == null && age >= THIRTY_MINS) {
    try {
      const list = yield call(SubredditList.get, before, after)
      yield put(loadSubredditListSuccess(list, before, after))
    } catch (err) {
      yield put(loadSubredditListError(err))
    }
  }
}
