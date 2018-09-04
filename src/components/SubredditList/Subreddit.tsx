import * as React from 'react'
import { Subreddit } from '#/models/SubredditList'
import { Link } from '#/router'

interface Props {
  item: Subreddit
}

export default (props: Props) => {
  const { item: subreddit } = props
  return (
    <div>
      <Link route='subreddit' params={{ name: subreddit.name }}>
        <a>{subreddit.name}</a>
      </Link>
    </div>
  )
}
