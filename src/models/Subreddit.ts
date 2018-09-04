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
}

export default class Subreddit extends Model<SubredditProps> {

  static getByName = async (name: string) => {
    const res = await fetchSubreddit(name)

    const subreddit = res.data
    const threads = subreddit.children.map(c => {
      return new Thread({
        id: c.data.id,
        subreddit: c.data.subreddit,
        score: c.data.score,
        title: c.data.title
      })
    })

    return new Subreddit({
      name: name,
      threads
    })
  }

  get name () { return this.get('name') }
  get threads () { return this.get('threads') }

}
