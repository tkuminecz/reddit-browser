import * as React from 'react'
import { connect } from 'react-redux'
import LoadingSpinner from '#/components/LoadingSpinner'

interface LoaderProps<ItemType, OuterProps> {
  data?: ItemType
  isLoading?: boolean
  loadAction?: Function
  renderData: (a: ItemType, p: OuterProps) => JSX.Element
}

class Loader<ItemType, OuterProps> extends React.Component<LoaderProps<ItemType, OuterProps>> {

  componentWillMount () {
    this.load(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isLoading) {
      this.load(nextProps)
    }
  }

  load = (args) => this.props.loadAction(args)

  render () {
    const { data, isLoading, loadAction, renderData, children, ...props } = this.props

    return (isLoading)
      ? <LoadingSpinner/>
      : renderData(data, props as OuterProps)
  }

}

interface LoaderArgs<OuterProps, Data> {
  loadAction: (p: OuterProps) => any
  getData: (...args: any[]) => Data | void
  getIsLoading: (...args: any[]) => boolean
  renderData: (d: Data, p: OuterProps) => JSX.Element
}

export default function createLoader<OuterProps, Data> (loader: LoaderArgs<OuterProps, Data>): React.ComponentType<OuterProps> {
  return connect(
    (state, props) => {
      const data = loader.getData(state, props)
      const isLoading = loader.getIsLoading(state, props)
      return {
        data,
        isLoading
      }
    },
    { loadAction: loader.loadAction }
  )(({ ...props }) => (
    <Loader
      renderData={loader.renderData}
      {...props}
    />
  )) as any
}
