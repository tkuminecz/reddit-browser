import * as React from 'react'
import { createList } from '#/components/List'
import { Thread } from '#/models/Subreddit'
import ThreadListItem from './Thread'
const styles = require('./styles.scss')

const ThreadList = createList<Thread>(item => <ThreadListItem thread={item} />)

export default (props) => (
  <div className={styles.theadlist} >
    <ThreadList {...props} />
  </div>
)
