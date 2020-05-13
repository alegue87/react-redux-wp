import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { connectRoutes } from 'redux-first-router'
import thunk from 'redux-thunk'
import page from './reducers/page-reducer';
import posts from './reducers/posts-reducer';
import menu from './reducers/menu-reducer';
import tag from './reducers/tag-reducer';
import cat from './reducers/cat-reducer';
import comments from './reducers/comments-reducer';
//import { persistStore, persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import { routesMap } from './routes'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*const options = {
}
const persistConfig = {
  key:'all_reducers',
  storage:storage,
}*/
export default function configureStore(preloadedState) {
  const { reducer, middleware, enhancer } = connectRoutes(routesMap/*, options*/)

  const rootReducer = combineReducers({
    page,   // state.page
    posts,  // state.posts ..
    menu,
    tag,
    cat,
    comments,
    location: reducer
  })
  //const pRootReducer = persistReducer(persistConfig, rootReducer)
  const middlewares = applyMiddleware(middleware, thunk)
  const enhancers = composeEnhancers(enhancer, middlewares)

  const store = createStore(rootReducer, preloadedState, enhancers)
  //const persistor = persistStore(store)

  return { store }
}
