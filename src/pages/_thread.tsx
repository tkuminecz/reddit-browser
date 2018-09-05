import * as React from 'react'
import Page from '#/components/Page'
import Thread from '#/components/Thread'

interface Props {
  id: string
  subreddit: string
}

export default class ThreadPage extends React.Component<Props> {

  static getInitialProps = async ({ query }) => ({
    subreddit: query.subreddit,
    id: query.id
  })

  render () {
    const { subreddit, id } = this.props

    return (
      <Page type='thread'>
        <Thread
          subreddit={subreddit}
          id={id}
        />
      </Page>
    )
  }

}
