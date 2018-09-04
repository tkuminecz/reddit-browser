import 'isomorphic-fetch'

interface SubredditList {
  display_name: string
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
  data: {
    children: SubredditThread[]
  }
}

export async function fetchSubreddit (name: string) {
  const res = await fetch(`https://www.reddit.com/r/${name}.json`)
  const body = await res.json()
  return body as Subreddit
}

interface Thread {}

export async function fetchThread (subreddit: string, id: string) {
  const res = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}.json`)
  const fullResUrl: string = (await res.json())[0].data.children[0].data.permalink
  const fullRes = await fetch(`https://www.reddit.com${fullResUrl.substring(-1)}.json`)
  return fullRes.json() as Thread
}
