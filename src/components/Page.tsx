import * as React from 'react'
import Footer from '#/components/Footer'
import Header from '#/components/Header'

export default (props) => (
  <div className={`page ${props.type || 'generic'}-page`}>
    <Header/>
    <div className='page-body'>
      {props.children}
    </div>
    <Footer/>
  </div>
)
