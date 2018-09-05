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
  after?: string
  before?: string
}

export default class SubredditList extends Model<ListProps> {

  static get = async (before?: string, after?: string) => {
    const list = await fetchSubredditList(before, after)

    return new SubredditList({
      subreddits: list.items.map(l => new Subreddit({
        description: l.public_description,
        name: l.display_name,
        subscriberCount: l.subscribers
      })),
      after: list.after,
      before: list.before
    })
  }

  get subreddits () { return this.get('subreddits') }
  get before () { return this.get('before') }
  get after () { return this.get('after') }

}
