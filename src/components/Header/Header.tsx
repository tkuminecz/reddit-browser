import * as React from 'react'
import { Link } from '#/router'
import Logo from '#/components/Logo'
const styles = require('./styles.scss')

export default () => (
  <div className={styles.header}>
    <header>
      <div className='container'>
        <Link href='/'>
          <a><Logo/></a>
        </Link>
      </div>
    </header>
  </div>
)
