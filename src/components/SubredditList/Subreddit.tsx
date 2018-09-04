import * as React from 'react'
import { Subreddit } from '#/models/SubredditList'
import { Link } from '#/router'
import Score from '#/components/Score'
const styles = require('./styles.scss')

interface Props {
  item: Subreddit
}

export default (props: Props) => {
  const { item: subreddit } = props
  return (
    <div className={styles.subreddit}>
      <span className={styles.score}>
        <Score score={subreddit.subscriberCount} />
      </span>
      <div className={styles.right}>
        <Link route='subreddit' params={{ name: subreddit.name }}>
          <a>{subreddit.name}</a>
        </Link>
        <p>{subreddit.description}</p>
      </div>
    </div>
  )
}
