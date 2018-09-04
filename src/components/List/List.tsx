import * as React from 'react'
const styles = require('./styles.scss')

interface Props<A> {
  items: A[]
  renderItem: (a: A) => JSX.Element
}

const List = function <A>(props: Props<A>) {
  return (props.items)
    ? (
      <div className={styles.list}>
        <ul>
          {props.items.map((item, i) =>
            <li key={i}>{props.renderItem(item)}</li>
          )}
        </ul>
      </div>
    )
    : null
}

export default List

export function createList<A> (render) {
  return (props: { items: A[] }) => {
    return (
      <List
        items={props.items}
        renderItem={render}
      />
    )
  }
}
