import * as React from 'react'
import { Link } from '#/router'
import Subreddit from '#/models/Subreddit'
import ThreadList from '#/components/ThreadList'
import Title from '#/components/Heading'

interface Props {
  data: Subreddit
}

export default ({ data }: Props) => (
  <>
    <Title>{data.name}</Title>
    <ThreadList items={data.threads} />
    <div className='pagination'>
      <Link
        route='subreddit'
        params={{
          name: data.name,
          after: data.before
        }}
      >
        <a>Perv Page</a>
      </Link>
      &nbsp;
      <Link
        route='subreddit'
        params={{
          name: data.name,
          after: data.after
        }}
      >
        <a>Next Page</a>
      </Link>
    </div>
  </>
)
