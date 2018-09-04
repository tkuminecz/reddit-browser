import * as React from 'react'
import Page from '#/components/Page'
import ThreadLoader from '#/components/ThreadLoader'

interface Props {
  id: string
  subreddit: string
}

export default class ThreadPage extends React.Component<Props> {

  static async getInitialProps (ctx) {
    return {
      subreddit: ctx.query.subreddit,
      id: ctx.query.id
    }
  }

  render () {
    const { subreddit, id } = this.props
    return (
      <Page type='thread'>
        <ThreadLoader subreddit={subreddit} id={id} />
      </Page>
    )
  }

}
