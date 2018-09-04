import * as React from 'react'
import SubredditModel from '#/models/Subreddit'
import ThreadList from '#/components/ThreadList'
import Title from '#/components/Title'

interface Props {
  data: SubredditModel
}

export default class Subreddit extends React.Component<Props> {

  render () {
    const { data } = this.props

    return (
      <div>
        <Title>{data.name}</Title>
        <ThreadList threads={data.threads} />
      </div>
    )
  }

}
