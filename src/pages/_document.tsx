import * as React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='stylesheet' href='/_next/static/style.css' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:300|Roboto' />
        </Head>
        <body>
          <div className='container'>
            <Main/>
          </div>
          <NextScript/>
        </body>
      </html>
    )
  }
}
