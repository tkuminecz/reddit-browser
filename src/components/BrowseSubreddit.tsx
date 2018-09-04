import * as React from 'react'
import BrowseSubredditLoader from '#/components/BrowseSubredditLoader'
import Heading from '#/components/Heading'

export default () => {
  return (
    <>
      <Heading>Browse Subreddits</Heading>
      <BrowseSubredditLoader/>
    </>
  )
}
