import { fetchSubredditList } from '#/api'
import Model from '#/model'

interface Props {
  description: string
  name: string
  subscriberCount: number
}

export class Subreddit extends Model<Props> {
  get description () { return this.get('description') }
  get name () { return this.get('name') }
  get subscriberCount () { return this.get('subscriberCount') }
}

interface ListProps {
  subreddits: Subreddit[]
}

export default class SubredditList extends Model<ListProps> {

  static get = async () => {
    const list = await fetchSubredditList()

    return new SubredditList({
      subreddits: list.map(l => new Subreddit({
        description: l.public_description,
        name: l.display_name,
        subscriberCount: l.subscribers
      }))
    })
  }

  get subreddits () { return this.get('subreddits') }
}
