import * as React from 'react'
const styles = require('./styles.scss')

type HTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

interface Props {
  children?: any
  tag?: HTag
}

function getTag (tag: HTag, children) {
  switch (tag) {
    case 'h1':
      return <h1>{children}</h1>

    case 'h2':
      return <h2>{children}</h2>

    case 'h3':
      return <h3>{children}</h3>

    case 'h4':
      return <h4>{children}</h4>

    case 'h5':
      return <h5>{children}</h5>
  }
}

export default ({ children, tag = 'h1' }: Props) => {
  return (
    <div className={styles.heading}>
      {getTag(tag, children)}
    </div>
  )
}
