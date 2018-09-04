import * as React from 'react'
import { BarLoader } from 'react-spinners'
const styles = require('./styles.scss')

export default () => (
  <div className={styles.loading}>
    <div className={styles.spinner}>
      <BarLoader width={200} />
    </div>
  </div>
)
