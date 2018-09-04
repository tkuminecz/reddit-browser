import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Subreddit from '#/models/Subreddit'
import SubredditList from '#/models/SubredditList'
import Thread from '#/models/Thread'

const namespace = Symbol('reddit').toString()

/* load subreddit list actions */

const LOAD_SUBREDDIT_LIST = '[subreddit-list] LOAD'
const LOAD_SUBREDDIT_LIST_SUCCESS = '[subreddit-list] LOAD_SUCCESS'
const LOAD_SUBREDDIT_LIST_ERROR = '[subreddit-list] LOAD_ERROR'

export function loadSubredditList () {
  return { type: LOAD_SUBREDDIT_LIST }
}

export function loadSubredditListSuccess (list: SubredditList) {
  return { type: LOAD_SUBREDDIT_LIST_SUCCESS, list }
}

export function loadSubredditListError (error: Error) {
  return { type: LOAD_SUBREDDIT_LIST_ERROR, error }
}

/* load single subreddit actions */

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

interface State {
  subredditList: void | {
    data: Error | SubredditList,
    updated: Date
  }
  subredditData: {
    [k: string]: {
      data: {
        [k: string]: Error | Subreddit
      },
      updated: Date
    }
  },
  threadData: {
    [k: string]: {
      data: Error | Thread,
      updated: Date
    }
  }
}

const initialState: State = {
  subredditList: null,
  subredditData: {},
  threadData: {}
}

/* selectors */

const getNamespace = (state) => state[namespace]

export const getSubredditList = (state) => getNamespace(state).subredditList && state[namespace].subredditList.data

export const getSubredditListIsLoading = (state) => getNamespace(state).subredditList == null

const getSubredditKey = (before: string, after: string) => `${before}_${after}`

export const getSubreddit = (state, name: string, before: string, after: string) => {
  const subredditData = getNamespace(state).subredditData
  const key = getSubredditKey(before, after)
  return (subredditData[name] != null && subredditData[name][key] != null)
    ? subredditData[name][key].data
    : null
}

export const getSubredditIsLoading = (state, name: string, before: string, after: string) => {
  const subredditData = getNamespace(state).subredditData
  const key = getSubredditKey(before, after)
  return (subredditData[name] != null && subredditData[name][key] != null)
    ? false
    : true
}

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
      case LOAD_SUBREDDIT_LIST_SUCCESS:
        return {
          ...state,
          subredditList: {
            data: action.list,
            updated: new Date()
          }
        }

      case LOAD_SUBREDDIT_SUCCESS:
        return {
          ...state,
          subredditData: {
            ...state.subredditData,
            [action.name]: {
              ...state.subredditData[action.name],
              [getSubredditKey(action.before, action.after)]: {
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
    takeLatest(LOAD_SUBREDDIT_LIST, loadSubredditListSaga),
    takeEvery(LOAD_SUBREDDIT, loadSubredditSaga),
    takeEvery(LOAD_THREAD, loadThreadSaga)
  ])
}

function* loadSubredditListSaga () {
  const list = yield select(s => getSubredditList(s))
  if (list == null) {
    try {
      const list = yield call(SubredditList.get)
      yield put(loadSubredditListSuccess(list))
    } catch (err) {
      yield put(loadSubredditListError(err))
    }
  }
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
