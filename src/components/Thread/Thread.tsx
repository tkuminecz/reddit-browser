import * as React from 'react'
import ThreadModel from '#/models/Thread'
import Comment from './Comment'
import { Link } from '#/router'
import List from '#/components/List'
import Markdown from '#/components/Markdown'
import Preview from './Preview'
import Title from '#/components/Title'

interface Props {
  thread: ThreadModel
}

export default class Thread extends React.Component<Props> {
  render () {
    const { thread } = this.props

    return (
      <div className='thread'>
        <div className='subreddit'>
          <Link route='subreddit' params={{ name: thread.subreddit }}>
            <a>{thread.subreddit}/</a>
          </Link>
        </div>
        <Title>
          {thread.title}
          <span className='external-link'>
            <Link href={thread.permalink}>
              <a title='Go to post on reddit'>⩉</a>
            </Link>
          </span>
        </Title>
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
