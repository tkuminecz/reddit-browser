
export interface SubredditRes {
  kind: string
  data: Subreddit
}

export interface Subreddit {
  modhash: string
  data: number
  children: ThreadRes[]
}

export interface ThreadRes {
  kind: string,
  data: Thread
}

export interface Thread {
  id: string,
  title: string
  url: string
  created: number
  ups: number
  downs: number
  score: number
  subreddit: string
}

export interface Comment {
  author: string
  body: string
  ups: number
  downs: number
  score: number
}
