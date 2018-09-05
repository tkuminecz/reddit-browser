import * as React from 'react'
import Page from '#/components/Page'
import SubredditList from '#/components/SubredditList'

interface Props {
  after?: string
  before?: string
}

export default class BrowseSubredditPage extends React.Component<Props> {

  static getInitialProps = async ({ query }) => ({
    after: query.after,
    before: query.before
  })

  render () {
    const { before, after } = this.props

    return (
      <Page type='home'>
        <SubredditList
          after={after}
          before={before}
        />
      </Page>
    )
  }

}
