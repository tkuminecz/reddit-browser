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

const Heading = (thread: { subreddit: string, title: string, permalink: string }) => {
  return (
    <>
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
    </>
  )
}

interface Props {
  thread: ThreadModel
}

export default (props: Props) => {
  const { thread: { data: thread } } = props

  return (
    <div className={styles.thread}>
      <Heading
        permalink={thread.permalink}
        subreddit={thread.subreddit}
        title={thread.title}
      />
      <Preview image={thread.preview} url={thread.url} />
      <Markdown>{thread.body}</Markdown>
      <List
        items={thread.comments}
        renderItem={item => <Comment comment={item} />}
      />
    </div>
  )
}
