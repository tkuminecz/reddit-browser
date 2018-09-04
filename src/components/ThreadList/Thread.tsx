import * as React from 'react'
import { Thread } from '#/models/Subreddit'
import { Link } from '#/router'
import Score from '#/components/Score'

interface Props {
  thread: Thread
}

export default ({ thread }: Props) => {
  return (
    <div className='threadlist-item'>
      <Score score={thread.score} />
      <div className='title'>
        <Link
          route='thread'
          params={{
            subreddit: thread.subreddit,
            id: thread.id
          }}
          prefetch
        >
          <a>{thread.title}</a>
        </Link>
      </div>
    </div>
  )
}
