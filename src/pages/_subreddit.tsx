import * as React from 'react'
import Page from '#/components/Page'
import Subreddit from '#/components/Subreddit'

interface Props {
  name: string,
  before?: string
  after?: string
}

export default class SubredditPage extends React.Component<Props> {

  static getInitialProps = async ({ query }) => ({
    name: query.name,
    after: query.after
  })

  render () {
    const { name, before, after } = this.props

    return (
      <Page type='subreddit'>
        <Subreddit
          name={name}
          before={before}
          after={after}
        />
      </Page>
    )
  }

}
