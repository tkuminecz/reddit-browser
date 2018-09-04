import * as React from 'react'
import ReactMarkdown from 'react-markdown'

export default (props) => (
  <ReactMarkdown
    source={props.children}
  />
)
