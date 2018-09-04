import * as React from 'react'
import { getThreadIsLoading, getThread, loadThread } from '#/actions/reddit'
import createLoader from '#/components/Loader'
import Page from '#/components/Page'
import Thread from '#/components/Thread'
import ThreadModel from '#/models/Thread'

const ThreadLoader = createLoader(
  (props) => loadThread(props.subreddit, props.id),
  (state, props) => getThread(state, props.id),
  (state, props) => getThreadIsLoading(state, props.id),
  (t: ThreadModel) => <Thread thread={t} />
)

interface Props {
  id: string
  subreddit: string
}

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
