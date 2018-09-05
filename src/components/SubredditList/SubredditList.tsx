import * as React from 'react'
import { loadSubredditList, getSubredditList, getSubredditListIsLoading } from '#/actions/reddit'
import Heading from '#/components/Heading'
import List from '#/components/List'
import createLoader from '#/components/Loader'
import Pagination from '#/components/Pagination'
import SubredditItem from './Subreddit'
import SubredditListModel from '#/models/SubredditList'

interface Props {
  list: SubredditListModel
}

const SubredditList = ({ list }: Props) => {
  const { subreddits, after, before } = list

  return (
    <>
      <Heading>Browse Subreddits</Heading>
      <List
        items={subreddits}
        renderItem={item => <SubredditItem item={item} />}
      />
      <Pagination
        route='home'
        showPrev={true}
        showNext={true}
        prevParams={{ before }}
        nextParams={{ after }}
      />
    </>
  )
}

interface LoaderProps {
  after?: string
  before?: string
}

export default createLoader<LoaderProps, SubredditListModel>({
  loadAction: ({ before, after }) => loadSubredditList(before, after),
  getData: (state, { before, after }) => getSubredditList(state, before, after),
  getIsLoading: (state, { before, after }) => getSubredditListIsLoading(state, before, after),
  renderData: (list) => <SubredditList list={list} />
})
