import * as React from 'react'
import { getThreadIsLoading, getThread, loadThread } from '#/actions/thread'
import createLoader from '#/components/Loader'
import Page from '#/components/Page'
import Thread from '#/components/Thread'
import ThreadModel from '#/models/Thread'

interface LoaderProps {
  subreddit: string
  id: string
}

const ThreadLoader = createLoader<LoaderProps, ThreadModel>({
  loadAction: ({ subreddit, id }) => loadThread(subreddit, id),
  getData: (state, { id }) => getThread(state, id),
  getIsLoading: (state, { id }) => getThreadIsLoading(state, id),
  renderData: (t) => <Thread thread={t} />
})

interface PageProps {
  id: string
  subreddit: string
}

export default class ThreadPage extends React.Component<PageProps> {

  static getInitialProps = ({ query, store }): PageProps => {
    const { subreddit, id } = query
    store.dispatch(loadThread(subreddit, id))
    return { subreddit, id }
  }

  render () {
    const { subreddit, id } = this.props

    return (
      <Page type='thread'>
        <ThreadLoader
          subreddit={subreddit}
          id={id}
        />
      </Page>
    )
  }

}
