import * as React from 'react'
import SubredditModel from '#/models/Subreddit'
import ThreadList from '#/components/ThreadList'
import Title from '#/components/Heading'

interface Props {
  data: SubredditModel
}

export default ({ data }: Props) => (
  <>
    <Title>{data.name}</Title>
    <ThreadList items={data.threads} />
  </>
)
