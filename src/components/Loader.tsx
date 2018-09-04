import * as React from 'react'
import { connect } from 'react-redux'
import LoadingSpinner from '#/components/LoadingSpinner'

interface Props<ItemType> {
  data: ItemType
  isLoading: boolean
  loadAction: Function
  renderData: (a: ItemType) => JSX.Element
  shouldReload?: () => boolean
}

class Loader<ItemType> extends React.Component<Props<ItemType>> {

  componentWillMount () {
    this.load(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isLoading) { // this.props.shouldReload()) {
      this.load(nextProps)
    } else {
      console.log('not reloading!')
    }
  }

  load = (props) => this.props.loadAction(props)

  render () {
    const { data, isLoading, renderData } = this.props

    return (isLoading)
      ? <LoadingSpinner/>
      : renderData(data)
  }

}

interface LoaderArgs<OuterProps> {
  loadAction: Function
  getData: Function
  getIsLoading: (...args: any[]) => boolean
  renderData: Function
  shouldReload?: (newProps: OuterProps, oldProps: OuterProps) => boolean
}

export default function createLoader<OuterProps> (args: LoaderArgs<OuterProps>) {
  return connect(
    (state, props) => {
      const data = args.getData(state, props)
      const isLoading = args.getIsLoading(state, props)
      return { data, isLoading }
    },
    { loadAction: args.loadAction }
  )(class extends React.Component<any> {

    state = {
      oldProps: null
    }

    componentWillReceiveProps () {
      this.setState({
        oldProps: this.props
      })
    }

    render () {
      const { data, isLoading, loadAction, ...props } = this.props
      const { oldProps } = this.state

      const needsReload = (args.shouldReload && oldProps != null)
        ? args.shouldReload(props as any, oldProps)
        : false

      return (
        <Loader
          data={data}
          isLoading={isLoading}
          loadAction={loadAction}
          renderData={item => args.renderData(item, props)}
          shouldReload={() => needsReload}
          {...props}
        />
      )
    }

  })
}
