import * as React from 'react'
import { createList } from '#/components/List'
import { Subreddit } from '#/models/SubredditList'
import Item from './Subreddit'

export default createList<Subreddit>(item => <Item item={item} />)
