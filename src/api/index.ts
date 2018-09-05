import 'isomorphic-fetch'
import * as cache from '../cache'

async function memoized (url: string) {
  try {
    return await cache.getItem(url)
  } catch (err) {
    console.log('fetching', url)
    const res = await fetch(url)
    const body = await res.json()
    await cache.setItem(url, body)
    return body
  }
}

/* list item */

interface SubredditListItem {
  banner_img?: string
  banner_size?: [number, number]
  description: string
  display_name: string
  icon_img?: string
  icon_size?: [number, number]
  public_description: string
  subscribers: number
}

interface SubredditList {
  items: SubredditListItem[]
  after?: string
  before?: string
}

export async function fetchSubredditList (before?: string, after?: string) {
  const body = await memoized(`https://www.reddit.com/subreddits.json?count=25&after=${after}&before=${before}`)
  return {
    items: body.data.children.map(c => c.data),
    after: body.data.after,
    before: body.data.before
  } as SubredditList
}

/* subreddit */

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

export async function fetchSubreddit (name: string, before?: string, after?: string) {
  const url = `https://www.reddit.com/r/${name}.json?count=25&after=${after}&before=${before}`
  const res = await fetch(url)
  const body = await res.json()
  return {
    children: body.data.children,
    after: body.data.after,
    before: body.data.before
  } as Subreddit
}

/* thread */

interface Thread {}

export async function fetchThread (subreddit: string, id: string) {
  const body = await memoized(`https://www.reddit.com/r/${subreddit}/comments/${id}.json`)
  const fullResUrl: string = body[0].data.children[0].data.permalink
  const fullRes = await fetch(`https://www.reddit.com${fullResUrl.substring(-1)}.json`)
  return fullRes.json() as Thread
}
