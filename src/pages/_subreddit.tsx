import * as React from 'react'
import { getSubreddit, getSubredditIsLoading, loadSubreddit } from '#/actions/reddit'
import createLoader from '#/components/Loader'
import Page from '#/components/Page'
import Subreddit from '#/components/Subreddit'
import SubredditModel from '#/models/Subreddit'

interface Props {
  name: string,
  after?: string
}

const SubredditLoader = createLoader<Props>({
  loadAction: ({ name, after }) => loadSubreddit(name, after),
  getData: (state, { name, after }) => getSubreddit(state, name, after),
  getIsLoading: (state, { name, after }) => getSubredditIsLoading(state, name, after),
  renderData: (s: SubredditModel) => <Subreddit data={s} />,
  shouldReload: () => false
})

export default class SubredditPage extends React.Component<Props> {

  static getInitialProps = async ({ query }) => ({
    name: query.name,
    after: query.after
  })

  render () {
    const { name, after } = this.props

    return (
      <Page type='subreddit'>
        <SubredditLoader name={name} after={after} />
      </Page>
    )
  }

}
