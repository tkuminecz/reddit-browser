import { applyMiddleware, createStore } from 'redux'
import nextReduxSaga from 'next-redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
import withReduxWrapper from 'next-redux-wrapper'

const sagaMiddleware = createSagaMiddleware()

export function configureStore (initialState: any) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  store.runSagaTask()

  return store
}

export function withReduxSaga (BaseComponent) {
  return withReduxWrapper(configureStore)(nextReduxSaga(BaseComponent))
}
