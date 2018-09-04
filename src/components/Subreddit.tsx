import * as React from 'react'
import SubredditModel from '#/models/Subreddit'
import ThreadList from '#/components/ThreadList'
import Title from '#/components/Heading'

interface Props {
  data: SubredditModel
}

export default class Subreddit extends React.Component<Props> {

  render () {
    const { data } = this.props

    return (
      <>
        <Title>{data.name}</Title>
        <ThreadList items={data.threads} />
      </>
    )
  }

}
