import { fetchThread } from '#/api'
import Model from '#/model'
import Comment from '#/models/Comment'

interface Data {
  id: string
  subreddit: string,
  title: string
  body: string
  preview?: string
  thumbnail?: string
  comments: Comment[]
  permalink: string
  url: string
}

export default class Thread extends Model<Data> {

  static getBySubredditAndId = async (subreddit: string, id: string) => {
    const res = await fetchThread(subreddit, id)

    const thread = res[0].data.children[0].data
    const comments = res[1].data.children.map(c => {
      return new Comment(c.data.author, c.data.score, c.data.body)
    })

    const preview = thread.preview
      && thread.preview.images
      && thread.preview.images.length > 0
      && thread.preview.images[0].source.url

    return new Thread({
      id: thread.id,
      subreddit: thread.subreddit,
      title: thread.title,
      body: thread.selftext,
      preview,
      thumbnail: thread.thumbnail,
      comments,
      permalink: `https://reddit.com${thread.permalink}`,
      url: thread.url
    })
  }

  get id () { return this.get('id') }
  get subreddit () { return this.get('subreddit') }
  get title () { return this.get('title') }
  get body () { return this.get('body') }
  get preview () { return this.get('preview') }
  get thumbnail () { return this.get('thumbnail') }
  get comments () { return this.get('comments') }
  get permalink () { return this.get('permalink') }
  get url () { return this.get('url') }

}
