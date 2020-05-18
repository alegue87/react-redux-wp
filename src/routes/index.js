import * as action from '../actions'
import {HOME, SINGLE, TAG, CATEGORY} from '../actions';

export const routesMap = {
  [HOME]: { path: '/', thunk: action.init()},
  [SINGLE]: {path: '/:slug', thunk: action.init()},
  [TAG]: {path: '/tag/:slug/', thunk: action.init()},
  [CATEGORY]: {path: '/category/:slug', thunk: action.init()},
}