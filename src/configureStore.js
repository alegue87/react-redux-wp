import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { connectRoutes } from 'redux-first-router'
import thunk from 'redux-thunk'
import page from './pageReducer'
import posts from './reducers/posts-reducer';
import menu from './reducers/menu-reducer';
import tags from './reducers/tag-reducer';
import cat from './reducers/cat-reducer';
import comments from './reducers/comments-reducer';
import { routesMap } from './routes'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const options = {
}
export default function configureStore(preloadedState) {
  const { reducer, middleware, enhancer } = connectRoutes(routesMap, options)
  
  const rootReducer = combineReducers({ 
    page,   // state.page
    posts,  // state.posts ..
    menu,
    tags,
    cat,
    comments,
    location: reducer 
  })
  const middlewares = applyMiddleware(middleware, thunk)
  const enhancers = composeEnhancers(enhancer, middlewares)

  const store = createStore(rootReducer, preloadedState, enhancers)

  return { store }
}
