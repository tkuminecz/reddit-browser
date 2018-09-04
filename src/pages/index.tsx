import * as React from 'react'
import { loadSubredditList, getSubredditList, getSubredditListIsLoading } from '#/actions/reddit'
import createLoader from '#/components/Loader'
import Heading from '#/components/Heading'
import Page from '#/components/Page'
import SubredditList from '#/components/SubredditList'
import SubredditListModel from '#/models/SubredditList'

const BrowseSubredditLoader = createLoader(
  loadSubredditList,
  (state) => getSubredditList(state),
  (state) => getSubredditListIsLoading(state),
  (list: SubredditListModel) => <SubredditList items={list.subreddits} />
)

export default class BrowseSubredditPage extends React.Component {
  render () {
    return (
      <Page type='home'>
        <Heading>Browse Subreddits</Heading>
        <BrowseSubredditLoader/>
      </Page>
    )
  }
}
