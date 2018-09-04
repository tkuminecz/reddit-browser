
export default class Comment {

  author: string
  score: number
  body: string

  constructor (
    author: string,
    score: number,
    body: string
  ) {
    this.author = author
    this.score = score
    this.body = body
  }
}
