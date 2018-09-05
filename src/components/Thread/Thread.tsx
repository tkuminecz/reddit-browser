import * as React from 'react'
import { getThreadIsLoading, getThread, loadThread } from '#/actions/thread'
import { Link } from '#/router'
import createLoader from '#/components/Loader'
import Comment from './Comment'
import List from '#/components/List'
import Markdown from '#/components/Markdown'
import Preview from './Preview'
import ThreadModel from '#/models/Thread'
import Title from '#/components/Heading'
const styles = require('./styles.scss')

interface Props {
  thread: ThreadModel
}

class Thread extends React.Component<Props> {
  render () {
    const { thread } = this.props

    return (
      <div className={styles.thread}>
        <div className={styles.subreddit}>
          <Link route='subreddit' params={{ name: thread.subreddit }}>
            <a>{thread.subreddit}/</a>
          </Link>
        </div>
        <div className={styles.heading}>
          <Title tag='h1'>
            {thread.title}
            <span className={styles['external-link']}>
              <Link href={thread.permalink}>
                <a title='Go to post on reddit'>⩉</a>
              </Link>
            </span>
          </Title>
        </div>
        <Preview image={thread.preview} url={thread.url} />
        <Markdown>{thread.body}</Markdown>
        <List
          items={thread.comments}
          renderItem={item => <Comment comment={item} />}
        />
      </div>
    )
  }
}

interface LoaderProps {
  subreddit: string
  id: string
}

export default createLoader<LoaderProps, ThreadModel>({
  loadAction: ({ subreddit, id }) => loadThread(subreddit, id),
  getData: (state, { id }) => getThread(state, id),
  getIsLoading: (state, { id }) => getThreadIsLoading(state, id),
  renderData: (t) => <Thread thread={t} />
})
