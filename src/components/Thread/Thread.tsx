import * as React from 'react'
import { Link } from '#/router'
import NextLink from 'next/link'
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

export default class Thread extends React.Component<Props> {
  render () {
    const { thread: { data: thread } } = this.props

    return (
      <div className={styles.thread}>
        <div className={styles.subreddit}>
          {thread.subreddit &&
            <Link
              route='subreddit'
              params={{
                name: thread.subreddit
              }}
            >
              <a>{thread.subreddit}/</a>
            </Link>}
        </div>
        <div className={styles.heading}>
          <Title tag='h1'>
            {thread.title}
            <span className={styles['external-link']}>
              {thread.permalink &&
                <NextLink href={thread.permalink}>
                  <a title='Go to post on reddit'>⩉</a>
                </NextLink>}
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
