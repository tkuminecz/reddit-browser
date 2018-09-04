import { fetchThread } from '#/api'
import Comment from '#/models/Comment'

interface Props {
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

export default class Thread {

  id: string
  subreddit: string
  title: string
  body: string
  preview?: string
  thumbnail?: string
  comments: Comment[]
  permalink: string
  url: string

  constructor (props: Props) {
    this.id = props.id
    this.subreddit = props.subreddit
    this.title = props.title
    this.body = props.body
    this.preview = props.preview
    this.thumbnail = props.thumbnail
    this.comments = props.comments
    this.permalink = props.permalink
    this.url = props.url
  }

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

}
