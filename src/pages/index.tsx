import * as React from 'react'
import Page from '#/components/Page'
import BrowseSubreddits from '#/components/BrowseSubreddit'

export default class HomePage extends React.Component {
  render () {
    return (
      <Page type='home'>
        <BrowseSubreddits/>
      </Page>
    )
  }
}
