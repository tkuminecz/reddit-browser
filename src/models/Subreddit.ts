import Model from '#/model'
import { fetchSubreddit } from '#/api'

interface ThreadProps {
  score: number
  title: string
  id: string
  subreddit: string
}

export class Thread extends Model<ThreadProps> {
  get id () { return this.get('id') }
  get subreddit () { return this.get('subreddit') }
  get score () { return this.get('score') }
  get title () { return this.get('title') }
}

interface SubredditProps {
  name: string
  threads: Thread[]
  after?: string
  before?: string
}

export default class Subreddit extends Model<SubredditProps> {

  static getByName = async (name: string, beforeKey?: string, afterKey?: string) => {
    const { children, after, before } = await fetchSubreddit(name, beforeKey, afterKey)

    const threads = children.map(c => {
      return new Thread({
        id: c.data.id,
        subreddit: c.data.subreddit,
        score: c.data.score,
        title: c.data.title
      })
    })

    return new Subreddit({ name, threads, after, before })
  }

  get name () { return this.get('name') }
  get threads () { return this.get('threads') }
  get after () { return this.get('after') }
  get before () { return this.get('before') }

}
