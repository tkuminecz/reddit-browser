import * as React from 'react'
import { connect } from 'react-redux'
import { chooseSubreddit, getChosenSubreddit } from '#/actions/subreddit'

interface Props {
  chosenSubreddit: string
  chooseSubreddit: (name: string) => void
}

interface State {
  subreddit: string
}

class SubredditLoader extends React.Component<Props, State> {

  componentWillMount () {
    this.setSubreddit(this.props.chosenSubreddit)
  }

  setSubreddit = (subreddit) => {
    this.setState({ subreddit })
  }

  onInputChange = (ev) => {
    this.setSubreddit(ev.target.value)
  }

  go = () => {
    this.props.chooseSubreddit(this.state.subreddit)
  }

  render () {
    const { subreddit } = this.state

    return (
      <>
        <input
          onChange={this.onInputChange}
          value={subreddit}
        />
        <button onClick={this.go}>go</button>
      </>
    )
  }

}

export default connect(
  state => ({
    chosenSubreddit: getChosenSubreddit(state)
  }),
  { chooseSubreddit }
)(SubredditLoader)
