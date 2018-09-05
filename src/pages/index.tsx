import * as React from 'react'
import { loadSubredditList, getSubredditList, getSubredditListIsLoading } from '#/actions/reddit'
import createLoader from '#/components/Loader'
import Page from '#/components/Page'
import SubredditList from '#/components/SubredditList'
import SubredditListModel from '#/models/SubredditList'

interface LoaderProps {
  after?: string
  before?: string
}

const SubredditListLoader = createLoader<LoaderProps, SubredditListModel>({
  loadAction: ({ before, after }) => loadSubredditList(before, after),
  getData: (state, { before, after }) => getSubredditList(state, before, after),
  getIsLoading: (state, { before, after }) => getSubredditListIsLoading(state, before, after),
  renderData: (list) => <SubredditList list={list} />
})

interface PageProps {
  after?: string
  before?: string
}

export default class BrowseSubredditPage extends React.Component<PageProps> {

  static getInitialProps = async ({ query , store }) => {
    const { before, after } = query
    store.dispatch(loadSubredditList(before, after))
    return { after, before }
  }

  render () {
    const { before, after } = this.props

    return (
      <Page type='home'>
        <SubredditListLoader
          after={after}
          before={before}
        />
      </Page>
    )
  }

}
