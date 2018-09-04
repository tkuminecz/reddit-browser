import * as React from 'react'
import { getSubreddit, getSubredditIsLoading, loadSubreddit } from '#/actions/reddit'
import createLoader from '#/components/Loader'
import Page from '#/components/Page'
import Subreddit from '#/components/Subreddit'
import SubredditModel from '#/models/Subreddit'

interface Props {
  name: string,
  before?: string
  after?: string
}

const SubredditLoader = createLoader<Props>({
  loadAction: ({ name, before, after }) => loadSubreddit(name, after),
  getData: (state, { name, before, after }) => getSubreddit(state, name, after),
  getIsLoading: (state, { name, before, after }) => getSubredditIsLoading(state, name, after),
  renderData: (s: SubredditModel) => <Subreddit data={s} />,
  shouldReload: (newProps, oldProps) => {
    return newProps.after !== oldProps.after
  }
})

export default class SubredditPage extends React.Component<Props> {

  static getInitialProps = async ({ query }) => ({
    name: query.name,
    after: query.after
  })

  render () {
    const { name, before, after } = this.props

    return (
      <Page type='subreddit'>
        <SubredditLoader
          name={name}
          before={before}
          after={after}
        />
      </Page>
    )
  }

}
