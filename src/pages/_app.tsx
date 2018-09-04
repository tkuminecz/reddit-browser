import * as React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import { withReduxSaga } from '#/redux/store'
import '#/static/styles/global.scss'

interface Props {
  store: any
}

class MyApp extends App<Props> {

  static async getInitialProps ({ Component, ctx }) {
    const pageProps = (Component.getInitialProps)
      ? await Promise.resolve(Component.getInitialProps(ctx))
      : {}
    return { pageProps }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }

}

export default withReduxSaga(MyApp)
