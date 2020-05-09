import * as action from '../actions'
import {BLOG} from '../pages';

export const routesMap = {

  [BLOG]: { path: '/blog', thunk: action.fetchPosts() },

}