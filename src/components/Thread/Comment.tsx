import * as React from 'react'
import Comment from '#/models/Comment'
import Markdown from '#/components/Markdown'
import Score from '#/components/Score'
const styles = require('./styles.scss')

interface Props {
  comment: Comment
}

export default ({ comment }: Props) => {
  return (
    <div className={styles.comment}>
      <div className={styles.meta}>
        <span className={styles.score}>
          <Score score={comment.score} />
        </span>
        <span className={styles.author}>{comment.author}</span>
      </div>
      <div className={styles.body}>
        <Markdown>{comment.body}</Markdown>
      </div>
    </div>
  )
}
