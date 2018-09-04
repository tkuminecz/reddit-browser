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
    this.load()
  }

  neverReload = () => false

  componentWillReceiveProps () {
    if (this.props.shouldReload()) {
      this.load()
    }
  }

  load = () => this.props.loadAction()

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
  shouldReload?: (p: OuterProps) => boolean
}

export default function createLoader<OuterProps> (args: LoaderArgs<OuterProps>) {
  return connect(
    (state, props) => {
      const data = args.getData(state, props)
      const isLoading = args.getIsLoading(state, props)
      return { data, isLoading }
    },
    { loadAction: args.loadAction }
  )(({ data, isLoading, loadAction, ...props }: any) => {
    console.log(props)
    const shouldReload = args.shouldReload || (() => false)
    return (
      <Loader
        data={data}
        isLoading={isLoading}
        loadAction={() => loadAction(props)}
        renderData={item => args.renderData(item, props)}
        shouldReload={() => shouldReload(props)}
      />
    )
  })
}
