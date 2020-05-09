import * as action from '../actions'
import {BLOG, BLOG_PAGE} from '../pages';

export const routesMap = {
  [BLOG]: { path: '/blog', thunk: action.fetchPosts() },
  [BLOG_PAGE]: { path: '/blog/:pageNum', thunk: action.fetchPosts() },
    // Nota: utilizzando /page/:pageNum non va /page/1
}