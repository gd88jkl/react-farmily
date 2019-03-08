import reducer from '../redux/reducers/index'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import rootSaga from '../redux/sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware(rootSaga)
const middleware = [sagaMiddleware]

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

sagaMiddleware.run(rootSaga)

export default store
