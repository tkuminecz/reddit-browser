import * as React from 'react'
import { getSubreddit, getSubredditIsLoading, loadSubreddit } from '#/actions/reddit'
import createLoader from '#/components/Loader'
import Page from '#/components/Page'
import Subreddit from '#/components/Subreddit'
import SubredditModel from '#/models/Subreddit'

interface Props {
  name: string
}

const SubredditLoader = createLoader(
  ({ subreddit }) => loadSubreddit(subreddit),
  (state, { subreddit }) => getSubreddit(state, subreddit),
  (state, { subreddit }) => getSubredditIsLoading(state, subreddit),
  (s: SubredditModel) => <Subreddit data={s} />
)

export default class SubredditPage extends React.Component<Props> {

  static getInitialProps = async ({ query }) => ({ name: query.name })

  render () {
    const { name } = this.props
    return (
      <Page type='subreddit'>
        <SubredditLoader subreddit={name} />
      </Page>
    )
  }

}
