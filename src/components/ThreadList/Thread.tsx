import * as React from 'react'
import { Link } from '#/router'
import { Thread } from '#/models/Subreddit'
import Score from '#/components/Score'
const styles = require('./styles.scss')

interface Props {
  thread: Thread
}

export default (props: Props) => {
  const thread = props.thread.data
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
