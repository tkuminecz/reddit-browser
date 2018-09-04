import * as React from 'react'
import { Link } from '#/router'

interface Props {
  image: string
  url: string
}

export default class Preview extends React.Component<Props> {
  wrapInLink = (a) => (
    <Link href={this.props.url}>
      {a}
    </Link>
  )
  render () {
    const { image, url } = this.props
    const inner = <a><img src={image} /></a>

    return (image)
      ? (
        <div className='image-wrap'>
          {url != null
            ? this.wrapInLink(inner)
            : inner}
        </div>
      )
      : null
  }
}
