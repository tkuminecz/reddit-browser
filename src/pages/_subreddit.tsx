import * as React from 'react'
import Page from '#/components/Page'
import SubredditLoader from '#/components/SubredditLoader'

interface Props {
  name: string
}

export default class SubredditPage extends React.Component<Props> {

  static async getInitialProps (ctx) {
    return {
      name: ctx.query.name
    }
  }

  render () {
    const { name } = this.props
    return (
      <Page type='subreddit'>
        <SubredditLoader subreddit={name} />
      </Page>
    )
  }

}
