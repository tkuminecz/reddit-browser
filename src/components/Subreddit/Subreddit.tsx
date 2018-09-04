import * as React from 'react'
import { Link } from '#/router'
import Pagination from '#/components/Pagination'
import Subreddit from '#/models/Subreddit'
import ThreadList from '#/components/ThreadList'
import Title from '#/components/Heading'
const styles = require('./styles.scss')

interface Props {
  data: Subreddit
}

export default ({ data }: Props) => {
  return (
    <div className={styles.subreddit}>
      <Link route='subreddit' params={{ name: data.name }}>
        <a>
          <Title>{data.name}</Title>
        </a>
      </Link>
      <ThreadList items={data.threads} />
      <Pagination
        route='subreddit'
        showPrev={!!data.before}
        showNext={!!data.after}
        getPrevParams={() => ({
          name: data.name,
          before: data.before
        })}
        getNextParams={() => ({
          name: data.name,
          after: data.after
        })}
      />
    </div>
  )
}
