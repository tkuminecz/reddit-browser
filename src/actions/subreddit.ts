
const namespace = Symbol('subreddit').toString()

const CHOOSE_SUBREDDIT = '[subreddit] CHOOSE'

export function chooseSubreddit (name: string) {
  return { type: CHOOSE_SUBREDDIT, name }
}

const initialState = 'reactjs'

export const getChosenSubreddit = (state) => state[namespace]

export const reducers = {
  [namespace]: (state = initialState, action) => {
    switch (action.type) {
      case CHOOSE_SUBREDDIT:
        return action.name

      default:
        return state
    }
  }
}
