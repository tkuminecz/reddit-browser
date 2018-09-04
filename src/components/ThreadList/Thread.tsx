import * as React from 'react'
import { Thread } from '#/models/Subreddit'
import { Link } from '#/router'
import Score from '#/components/Score'
const styles = require('./styles.scss')

interface Props {
  thread: Thread
}

export default ({ thread }: Props) => {
  return (
    <div className={styles.thread}>
      <span className={styles.score}>
        <Score score={thread.score} />
      </span>
      <div className='title'>
        <Link
          route='thread'
          params={{
            subreddit: thread.subreddit,
            id: thread.id
          }}
        >
          <a>{thread.title}</a>
        </Link>
      </div>
    </div>
  )
}
