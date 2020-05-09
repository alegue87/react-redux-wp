import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { connectRoutes } from 'redux-first-router'
import thunk from 'redux-thunk'
import page from './pageReducer'
import posts from './postReducer'
import { routesMap } from './routes'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  const { reducer, middleware, enhancer } = connectRoutes(routesMap)

  const rootReducer = combineReducers({ page, posts, location: reducer })
  const middlewares = applyMiddleware(middleware, thunk)
  const enhancers = composeEnhancers(enhancer, middlewares)

  const store = createStore(rootReducer, preloadedState, enhancers)

  return { store }
}
