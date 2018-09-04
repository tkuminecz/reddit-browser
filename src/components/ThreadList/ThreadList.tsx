import * as React from 'react'
import { Thread } from '#/models/Subreddit'
import ThreadListItem from './Thread'

interface Props {
  threads: Thread[]
}

export default ({ threads }: Props) => {
  return (
    <div className='threadlist'>
      <ul>
        {threads.map((thread, i) =>
          <li key={i}>
            <ThreadListItem thread={thread} />
          </li>)}
      </ul>
    </div>
  )
}
