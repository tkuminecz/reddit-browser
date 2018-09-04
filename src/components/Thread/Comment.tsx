import * as React from 'react'
import Comment from '#/models/Comment'
import Markdown from '#/components/Markdown'
import Score from '#/components/Score'

interface Props {
  comment: Comment
}

export default ({ comment }: Props) => {
  return (
    <div className='comment'>
      <div className='meta'>
        <Score score={comment.score} />
        <span className='author'>{comment.author}</span>
      </div>
      <div className='body'>
        <Markdown>{comment.body}</Markdown>
      </div>
    </div>
  )
}
