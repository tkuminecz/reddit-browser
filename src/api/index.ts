import 'isomorphic-fetch'

interface SubredditList {
  banner_img?: string
  banner_size?: [number, number]
  description: string
  display_name: string
  icon_img?: string
  icon_size?: [number, number]
  public_description: string
  subscribers: number
}

export async function fetchSubredditList () {
  const res = await fetch(`https://www.reddit.com/subreddits.json?count=100`)
  const body = await res.json()
  return body.data.children.map(c => c.data) as SubredditList[]
}

interface SubredditThread {
  data: {
    id: string,
    subreddit: string,
    score: number,
    title: string
  }
}

interface Subreddit {
  children: SubredditThread[]
  after?: string
  before?: string
}

export async function fetchSubreddit (name: string, after?: string) {
  const baseUrl = n => `https://www.reddit.com/r/${n}.json`
  const url = (after)
    ? `${baseUrl(name)}?count=25&after=${after}`
    : baseUrl(name)

  const res = await fetch(url)
  const body = await res.json()
  return {
    children: body.data.children,
    after: body.data.after,
    before: body.data.before
  } as Subreddit
}

interface Thread {}

export async function fetchThread (subreddit: string, id: string) {
  const res = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}.json`)
  const fullResUrl: string = (await res.json())[0].data.children[0].data.permalink
  const fullRes = await fetch(`https://www.reddit.com${fullResUrl.substring(-1)}.json`)
  return fullRes.json() as Thread
}
