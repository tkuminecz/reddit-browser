import * as React from 'react'
import { Link } from '#/router'
const styles = require('./styles.scss')

interface Props {
  route: string
  showPrev: boolean
  showNext: boolean,
  getPrevParams: () => {}
  getNextParams: () => {}
}

export default ({ route, getPrevParams, getNextParams, showPrev, showNext }: Props) => {
  return (
    <div className={styles.pagination}>
      {showPrev &&
        <div className={styles.prev}>
          <Link
            route={route}
            params={getPrevParams()}
          >
            <a>&laquo; Prev Page</a>
          </Link>
        </div>}
      {showNext &&
        <div className={styles.next}>
          <Link
            route={route}
            params={getNextParams()}
          >
            <a>Next Page &raquo;</a>
          </Link>
        </div>}
    </div>
  )
}
