import * as React from 'react'
import createLoader from '#/components/Loader'
import { loadSubredditList, getSubredditList, getSubredditListIsLoading } from '#/actions/reddit'
import SubredditList from '#/components/SubredditList'
import SubredditListModel from '#/models/SubredditList'

export default createLoader(
  () => loadSubredditList(),
  (state) => getSubredditList(state),
  (state) => getSubredditListIsLoading(state),
  (list: SubredditListModel) => <SubredditList items={list.subreddits} />
)
