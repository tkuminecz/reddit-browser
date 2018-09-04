import { fetchSubredditList } from '#/api'
import Model from '#/model'

interface Props {
  name: string
}

export class Subreddit extends Model<Props> {
  get name () { return this.props.name }
}

interface ListProps {
  subreddits: Subreddit[]
}

export default class SubredditList extends Model<ListProps> {
  static get = async () => {
    const list = await fetchSubredditList()

    return new SubredditList({
      subreddits: list.map(l => new Subreddit({
        name: l.display_name
      }))
    })
  }
  get subreddits () { return this.props.subreddits }
}
