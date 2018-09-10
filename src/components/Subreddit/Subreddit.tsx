import * as React from 'react'
import { Link } from '#/router'
import Pagination from '#/components/Pagination'
import SubredditModel from '#/models/Subreddit'
import ThreadList from '#/components/ThreadList'
import Title from '#/components/Heading'
const styles = require('./styles.scss')

interface Props {
  data: SubredditModel
}

export default ({ data }: Props) => {
  const { name, threads, before, after } = data.data

  return (
    <div className={styles.subreddit}>
      <Link route='subreddit' params={{ name }}>
        <a>
          <Title>{name}</Title>
        </a>
      </Link>
      <ThreadList items={threads} />
      <Pagination
        route='subreddit'
        showPrev={!!before}
        showNext={!!after}
        prevParams={{ name, before }}
        nextParams={{ name, after }}
      />
    </div>
  )
}
