import * as React from 'react'
import { getSubreddit, getSubredditIsLoading, loadSubreddit } from '#/actions/subreddit'
import createLoader from '#/components/Loader'
import Page from '#/components/Page'
import Subreddit from '#/components/Subreddit'
import SubredditModel from '#/models/Subreddit'

interface LoaderProps {
  name: string
  after?: string
  before?: string
}

const SubredditLoader = createLoader<LoaderProps, SubredditModel>({
  loadAction: ({ name, before, after }) => loadSubreddit(name, before, after),
  getData: (state, { name, before, after }) => getSubreddit(state, name, before, after),
  getIsLoading: (state, { name, before, after }) => getSubredditIsLoading(state, name, before, after),
  renderData: (s) => <Subreddit data={s} />
})

interface PageProps {
  name: string,
  before?: string
  after?: string
}

export default class SubredditPage extends React.Component<PageProps> {

  static getInitialProps = ({ query, store }): PageProps => {
    const { name, before, after } = query
    store.dispatch(loadSubreddit(name, before, after))
    return { name, before, after }
  }

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
