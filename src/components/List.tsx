import * as React from 'react'

interface Props<A> {
  items: A[]
  renderItem: (a: A) => JSX.Element
}

export default function <A>(props: Props<A>) {
  return (props.items)
    ? (
      <ul>
        {props.items.map((item, i) =>
          <li key={i}>{props.renderItem(item)}</li>
        )}
      </ul>
    )
    : null
}
