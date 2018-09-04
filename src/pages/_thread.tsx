import * as React from 'react'
import { getThreadIsLoading, getThread, loadThread } from '#/actions/reddit'
import createLoader from '#/components/Loader'
import Page from '#/components/Page'
import Thread from '#/components/Thread'
import ThreadModel from '#/models/Thread'

interface Props {
  id: string
  subreddit: string
}

const ThreadLoader = createLoader<Props>({
  loadAction: ({ subreddit, id }) => loadThread(subreddit, id),
  getData: (state, { id }) => getThread(state, id),
  getIsLoading: (state, { id }) => getThreadIsLoading(state, id),
  renderData: (t: ThreadModel) => <Thread thread={t} />
})

export default class ThreadPage extends React.Component<Props> {

  static getInitialProps = async ({ query }) => ({
    subreddit: query.subreddit,
    id: query.id
  })

  render () {
    const { subreddit, id } = this.props

    return (
      <Page type='thread'>
        <ThreadLoader subreddit={subreddit} id={id} />
      </Page>
    )
  }

}
