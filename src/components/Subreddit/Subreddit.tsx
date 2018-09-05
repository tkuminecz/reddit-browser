import * as React from 'react'
import { getSubreddit, getSubredditIsLoading, loadSubreddit } from '#/actions/subreddit'
import { Link } from '#/router'
import createLoader from '#/components/Loader'
import Pagination from '#/components/Pagination'
import SubredditModel from '#/models/Subreddit'
import ThreadList from '#/components/ThreadList'
import Title from '#/components/Heading'
const styles = require('./styles.scss')

interface Props {
  data: SubredditModel
}

const isFirst = (threads: any[], beforeId: string) => {
  const [ first ] = threads.map(t => t.id)
  console.log(first, beforeId)
  return false // (`t3_${first}` === beforeId)
}

const isLast = (threads: any[], afterId: string) => {
  const last = threads.map(t => t.id).pop()
  console.log(last, afterId)
  return false // (`t3_${last}` === afterId)
}

const Subreddit = ({ data }: Props) => {
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
        prevParams={{ name, before }}
        nextParams={{ name, after }}
      />
    </div>
  )
}

interface LoaderProps {
  name: string
  after?: string
  before?: string
}

export default createLoader<LoaderProps, SubredditModel>({
  loadAction: ({ name, before, after }) => loadSubreddit(name, before, after),
  getData: (state, { name, before, after }) => getSubreddit(state, name, before, after),
  getIsLoading: (state, { name, before, after }) => getSubredditIsLoading(state, name, before, after),
  renderData: (s) => <Subreddit data={s} />
})
