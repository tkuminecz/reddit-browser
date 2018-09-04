import * as React from 'react'
import Footer from '#/components/Footer'
import Header from '#/components/Header'
const styles = require('./styles.scss')

export default (props) => (
  <div className={`page ${props.type || 'generic'}-page`}>
    <Header/>
    <div className={`container ${styles.main}`}>
      {props.children}
    </div>
    <Footer/>
  </div>
)
