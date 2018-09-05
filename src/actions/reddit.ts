import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import SubredditList from '#/models/SubredditList'
import { selector } from '#/actions'

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
  return (state[pageKey] != null)
    ? state[pageKey].data
    : null
})

export const getSubredditListIsLoading = selector(getNs, (state: State, before: string, after: string) => {
  const pageKey = getPageKey(before, after)
  return (state[pageKey] == null)
})

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

function* loadSubredditListSaga (action: ReturnType<typeof loadSubredditList>) {
  const { before, after } = action
  const list = yield select(s => getSubredditList(s, before, after))
  if (list == null) {
    try {
      const list = yield call(SubredditList.get, before, after)
      yield put(loadSubredditListSuccess(list, before, after))
    } catch (err) {
      yield put(loadSubredditListError(err))
    }
  }
}
