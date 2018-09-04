import * as React from 'react'
import { Subreddit } from '#/models/SubredditList'
import Item from './Subreddit'
import List from '#/components/List'

interface Props {
  items: Subreddit[]
}

export default (props: Props) => {
  console.log(props)
  return (
    <List
      items={props.items}
      renderItem={item => <Item item={item} />}
    />
  )
}
