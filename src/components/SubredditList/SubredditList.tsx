import * as React from 'react'
import Heading from '#/components/Heading'
import List from '#/components/List'
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

export default SubredditList
