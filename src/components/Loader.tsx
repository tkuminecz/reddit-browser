import * as React from 'react'
import { connect } from 'react-redux'
import LoadingSpinner from '#/components/LoadingSpinner'

interface Props<A> {
  data: A
  isLoading: boolean
  loadAction: Function
  renderData: (a: A) => JSX.Element
}

class Loader<A> extends React.Component<Props<A>> {

  componentWillMount () {
    this.props.loadAction()
  }

  render () {
    const { data, isLoading, renderData } = this.props

    return (isLoading)
      ? <LoadingSpinner/>
      : renderData(data)
  }

}

export default function createLoader (loadAction, getData, getIsLoading, renderData) {
  return connect(
    (state, props) => {
      const data = getData(state, props)
      const isLoading = getIsLoading(state, props)
      return { data, isLoading }
    },
    { loadAction }
  )(({ data, isLoading, loadAction, ...props }: any) => (
    <Loader
      data={data}
      isLoading={isLoading}
      loadAction={() => loadAction(props)}
      renderData={item => renderData(item, props)}
    />
  ))
}
