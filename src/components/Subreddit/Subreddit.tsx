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

const isFirst = (threads: any[], beforeId: string) => {
  const [ first ] = threads.map(t => t.id)
  console.log(first, beforeId)
  return false // (`t3_${first}` === beforeId)
}

const isLast = (threads: any[], afterId: string) => {
  const last = threads.map(t => t.id).pop()
  return false // (`t3_${last}` === afterId)
}

export default ({ data }: Props) => {
  const { name, threads, before, after } = data

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
        showPrev={!!before && !isFirst(threads, before)}
        showNext={!!after && !isLast(threads, after)}
        getPrevParams={() => ({ name, before })}
        getNextParams={() => ({ name, after })}
      />
    </div>
  )
}
